import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

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

async function readWaitlist() {
  return readJsonFile(waitlistFile, []);
}

async function readEmails() {
  return readJsonFile(emailsFile, []);
}

async function writeWaitlist(records) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(waitlistFile, `${JSON.stringify(records, null, 2)}\n`, "utf8");
}

async function writeEmails(records) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(emailsFile, `${JSON.stringify(records, null, 2)}\n`, "utf8");
}

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function requireAdmin(request, response) {
  if (!adminToken) {
    return true;
  }

  const header = request.headers.authorization || "";
  if (header === `Bearer ${adminToken}`) {
    return true;
  }

  sendJson(response, 401, { error: "Unauthorized" });
  return false;
}

function requireInboxToken(request, response) {
  if (!inboxEmailToken) {
    return true;
  }

  const header = request.headers.authorization || "";
  if (header === `Bearer ${inboxEmailToken}`) {
    return true;
  }

  sendJson(response, 401, { error: "Unauthorized" });
  return false;
}

function autoLaunchMessage(email) {
  return {
    id: randomUUID(),
    direction: "outbound",
    kind: "auto",
    status: "queued",
    from: siteEmail,
    to: email,
    subject: "You're on the Seramd private launch list",
    body:
      "Thanks for joining the Seramd private launch list. We will send early access details as the beta opens.",
    createdAt: new Date().toISOString(),
  };
}

async function persistInboxEmail(payload) {
  const from = cleanEmail(payload.from || payload.sender || payload.email);
  const subject = String(payload.subject || "").trim();
  const body = String(payload.body || payload.text || payload.html || "").trim();
  const to = cleanEmail(payload.to) || siteEmail;

  if (!isValidEmail(from) || !subject || !body) {
    return { error: "From, subject, and body are required." };
  }

  const [records, emails] = await Promise.all([readWaitlist(), readEmails()]);
  const now = new Date().toISOString();
  const inboxEmail = {
    id: randomUUID(),
    direction: "inbound",
    kind: "inbox",
    status: "received",
    from,
    to,
    subject,
    body,
    createdAt: now,
  };
  let record = records.find((entry) => entry.email === from);

  if (!record) {
    record = {
      id: randomUUID(),
      email: from,
      source: "domain-inbox",
      status: "received",
      autoMessageEnabled: false,
      messageCount: 0,
      createdAt: now,
      lastSubmittedAt: now,
      submissions: 0,
    };
    records.unshift(record);
  }

  record.messageCount = (record.messageCount || 0) + 1;
  record.status = "received";
  record.lastMessageAt = now;
  record.lastMessage = inboxEmail;
  emails.unshift(inboxEmail);

  await Promise.all([writeWaitlist(records), writeEmails(emails)]);
  return { record, email: inboxEmail };
}

async function handleApi(request, response, url) {
  if (request.method === "GET" && url.pathname === "/api/config") {
    sendJson(response, 200, { siteEmail });
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/waitlist") {
    const body = await readBody(request);
    const payload = JSON.parse(body || "{}");
    const email = cleanEmail(payload.email);

    if (!isValidEmail(email)) {
      sendJson(response, 400, { error: "Enter a valid email address." });
      return true;
    }

    const [records, emails] = await Promise.all([readWaitlist(), readEmails()]);
    const existing = records.find((record) => record.email === email);
    const now = new Date().toISOString();
    let autoMessageQueued = false;

    if (existing) {
      existing.lastSubmittedAt = now;
      existing.submissions = (existing.submissions || 1) + 1;
    } else {
      const autoMessage = autoLaunchMessage(email);
      records.unshift({
        id: randomUUID(),
        email,
        source: "coming-soon-waitlist",
        status: "auto_queued",
        autoMessageEnabled: true,
        messageCount: 1,
        createdAt: now,
        lastSubmittedAt: now,
        lastMessageAt: autoMessage.createdAt,
        submissions: 1,
      });
      emails.unshift(autoMessage);
      autoMessageQueued = true;
    }

    await Promise.all([writeWaitlist(records), writeEmails(emails)]);
    sendJson(response, 201, { ok: true, autoMessageQueued });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/admin/waitlist") {
    if (!requireAdmin(request, response)) {
      return true;
    }

    const records = await readWaitlist();
    sendJson(response, 200, { records, siteEmail });
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/admin/messages") {
    if (!requireAdmin(request, response)) {
      return true;
    }

    const payload = JSON.parse((await readBody(request)) || "{}");
    const email = cleanEmail(payload.email);
    const subject = String(payload.subject || "").trim();
    const body = String(payload.body || "").trim();

    if (!isValidEmail(email) || !subject || !body) {
      sendJson(response, 400, { error: "Email, subject, and body are required." });
      return true;
    }

    const [records, emails] = await Promise.all([readWaitlist(), readEmails()]);
    const now = new Date().toISOString();
    let record = records.find((entry) => entry.email === email);
    const message = {
      id: randomUUID(),
      direction: "outbound",
      kind: "manual",
      status: "queued",
      from: siteEmail,
      to: email,
      subject,
      body,
      createdAt: now,
    };

    if (!record) {
      record = {
        id: randomUUID(),
        email,
        source: "admin-message",
        status: "new",
        messageCount: 0,
        createdAt: now,
        lastSubmittedAt: now,
        submissions: 0,
      };
      records.unshift(record);
    }

    record.messageCount = (record.messageCount || 0) + 1;
    record.status = "queued";
    record.lastMessageAt = now;
    record.lastMessage = message;
    emails.unshift(message);

    await Promise.all([writeWaitlist(records), writeEmails(emails)]);
    sendJson(response, 201, { ok: true, record, message });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/admin/emails") {
    if (!requireAdmin(request, response)) {
      return true;
    }

    const [records, emails] = await Promise.all([readWaitlist(), readEmails()]);
    sendJson(response, 200, { records, emails, siteEmail });
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/inbox") {
    if (!requireInboxToken(request, response)) {
      return true;
    }

    const payload = JSON.parse((await readBody(request)) || "{}");
    const result = await persistInboxEmail(payload);

    if (result.error) {
      sendJson(response, 400, { error: result.error });
      return true;
    }

    sendJson(response, 201, { ok: true, ...result });
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
    if (url.pathname.startsWith("/api/") && (await handleApi(request, response, url))) {
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
