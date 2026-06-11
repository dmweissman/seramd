import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

import {
  applyAdminMessage,
  applyInboxEmail,
  applyWaitlistSignup,
} from "./lib/waitlist.js";

const root = fileURLToPath(new URL(".", import.meta.url));
const distRoot = join(root, "dist");
const dataDir = join(root, "data");
const waitlistFile = join(dataDir, "waitlist.json");
const emailsFile = join(dataDir, "emails.json");
const siteEmail = process.env.SITE_EMAIL || "hello@seramd.com";
const adminToken = process.env.ADMIN_TOKEN || "";
const inboxEmailToken = process.env.INBOX_EMAIL_TOKEN || "";
const port = Number(process.env.PORT || 4173);

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".avif", "image/avif"],
  [".svg", "image/svg+xml"],
  [".ico", "image/x-icon"],
]);

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100_000) {
        request.destroy();
        reject(new Error("Request body is too large."));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function readJsonBody(request) {
  const body = await readBody(request);
  try {
    return { payload: JSON.parse(body || "{}") };
  } catch {
    return { error: "Invalid JSON body." };
  }
}

async function readJsonFile(filePath, fallback) {
  try {
    const file = await readFile(filePath, "utf8");
    return JSON.parse(file);
  } catch (error) {
    if (error?.code === "ENOENT") {
      return fallback;
    }
    throw error;
  }
}

async function readStore() {
  const [records, emails] = await Promise.all([
    readJsonFile(waitlistFile, []),
    readJsonFile(emailsFile, []),
  ]);
  return { records, emails };
}

async function writeStore({ records, emails }) {
  await mkdir(dataDir, { recursive: true });
  await Promise.all([
    writeFile(waitlistFile, `${JSON.stringify(records, null, 2)}\n`, "utf8"),
    writeFile(emailsFile, `${JSON.stringify(emails, null, 2)}\n`, "utf8"),
  ]);
}

function requireBearerToken(request, response, token, missingMessage) {
  if (!token) {
    sendJson(response, 503, { error: missingMessage });
    return false;
  }

  const header = request.headers.authorization || "";
  if (header === `Bearer ${token}`) {
    return true;
  }

  sendJson(response, 401, { error: "Unauthorized" });
  return false;
}

function requireAdmin(request, response) {
  return requireBearerToken(
    request,
    response,
    adminToken,
    "Admin API is disabled: set the ADMIN_TOKEN environment variable to enable it.",
  );
}

function requireInboxToken(request, response) {
  return requireBearerToken(
    request,
    response,
    inboxEmailToken,
    "Inbox API is disabled: set the INBOX_EMAIL_TOKEN environment variable to enable it.",
  );
}

async function handleApi(request, response, url) {
  if (request.method === "GET" && url.pathname === "/api/config") {
    sendJson(response, 200, { siteEmail });
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/waitlist") {
    const { payload, error } = await readJsonBody(request);
    if (error) {
      sendJson(response, 400, { error });
      return true;
    }

    const store = await readStore();
    const result = applyWaitlistSignup(store.records, store.emails, payload.email, siteEmail);

    if (result.error) {
      sendJson(response, 400, { error: result.error });
      return true;
    }

    await writeStore(store);
    sendJson(response, 201, { ok: true, autoMessageQueued: result.autoMessageQueued });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/admin/waitlist") {
    if (!requireAdmin(request, response)) {
      return true;
    }

    const { records } = await readStore();
    sendJson(response, 200, { records, siteEmail });
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/admin/messages") {
    if (!requireAdmin(request, response)) {
      return true;
    }

    const { payload, error } = await readJsonBody(request);
    if (error) {
      sendJson(response, 400, { error });
      return true;
    }

    const store = await readStore();
    const result = applyAdminMessage(store.records, store.emails, payload, siteEmail);

    if (result.error) {
      sendJson(response, 400, { error: result.error });
      return true;
    }

    await writeStore(store);
    sendJson(response, 201, { ok: true, record: result.record, message: result.message });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/admin/emails") {
    if (!requireAdmin(request, response)) {
      return true;
    }

    const { records, emails } = await readStore();
    sendJson(response, 200, { records, emails, siteEmail });
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/inbox") {
    if (!requireInboxToken(request, response)) {
      return true;
    }

    const { payload, error } = await readJsonBody(request);
    if (error) {
      sendJson(response, 400, { error });
      return true;
    }

    const store = await readStore();
    const result = applyInboxEmail(store.records, store.emails, payload, siteEmail);

    if (result.error) {
      sendJson(response, 400, { error: result.error });
      return true;
    }

    await writeStore(store);
    sendJson(response, 201, { ok: true, record: result.record, email: result.email });
    return true;
  }

  return false;
}

async function serveStatic(request, response, url) {
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") {
    pathname = "/index.html";
  }
  if (pathname === "/admin") {
    pathname = "/admin.html";
  }

  const rootPath = normalize(join(root, pathname));
  const distPath = normalize(join(distRoot, pathname));
  const candidatePaths =
    pathname === "/admin.html"
      ? [rootPath]
      : [distPath, rootPath];

  for (const filePath of candidatePaths) {
    const base = filePath.startsWith(distRoot) ? distRoot : root;
    if (!filePath.startsWith(base)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const type = contentTypes.get(extname(filePath)) || "application/octet-stream";
    try {
      const file = await readFile(filePath);
      response.writeHead(200, { "content-type": type });
      response.end(file);
      return;
    } catch {
      // Try the next static root.
    }
  }

  try {
    const fallbackPath = normalize(join(distRoot, "/index.html"));
    const file = await readFile(fallbackPath);
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(file);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) {
      if (await handleApi(request, response, url)) {
        return;
      }
      sendJson(response, 404, { error: "Not found" });
      return;
    }
    await serveStatic(request, response, url);
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "Server error" });
  }
});

server.listen(port, () => {
  console.log(`Seramd site running at http://localhost:${port}`);
  console.log(`Admin dashboard: http://localhost:${port}/admin`);
});
