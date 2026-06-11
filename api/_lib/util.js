const waitlistKey = "seramd:waitlist";
const emailsKey = "seramd:emails";

export const siteEmail = process.env.SITE_EMAIL || "david@seramd.com";

export function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.setHeader("cache-control", "no-store");
  response.end(JSON.stringify(payload));
}

export function createHandler(fn) {
  return async (request, response) => {
    try {
      await fn(request, response);
    } catch (error) {
      console.error(error);
      sendJson(response, 500, { error: "Server error" });
    }
  };
}

export function requireMethod(request, response, method) {
  if (request.method === method) {
    return true;
  }

  response.setHeader("allow", method);
  sendJson(response, 405, { error: "Method not allowed" });
  return false;
}

export async function readJsonBody(request) {
  try {
    if (request.body !== undefined) {
      if (request.body === null || request.body === "") {
        return { payload: {} };
      }
      if (typeof request.body === "object") {
        return { payload: request.body };
      }
      return { payload: JSON.parse(String(request.body)) };
    }

    let raw = "";
    for await (const chunk of request) {
      raw += chunk;
      if (raw.length > 100_000) {
        request.destroy();
        return { error: "Request body is too large." };
      }
    }
    return { payload: JSON.parse(raw || "{}") };
  } catch {
    return { error: "Invalid JSON body." };
  }
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

export function requireAdmin(request, response) {
  return requireBearerToken(
    request,
    response,
    process.env.ADMIN_TOKEN || "",
    "Admin API is disabled: set the ADMIN_TOKEN environment variable to enable it.",
  );
}

export function requireInboxToken(request, response) {
  return requireBearerToken(
    request,
    response,
    process.env.INBOX_EMAIL_TOKEN || "",
    "Inbox API is disabled: set the INBOX_EMAIL_TOKEN environment variable to enable it.",
  );
}

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

export function requireStorage(response) {
  if (redisConfig()) {
    return true;
  }

  sendJson(response, 503, {
    error:
      "Signups are temporarily unavailable. (Storage is not configured: connect an Upstash Redis database so UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set.)",
  });
  return false;
}

async function redisCommand(command) {
  const config = redisConfig();
  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    throw new Error(`Storage request failed with status ${response.status}.`);
  }

  const payload = await response.json();
  if (payload.error) {
    throw new Error(`Storage error: ${payload.error}`);
  }
  return payload.result;
}

export async function readStore() {
  const [records, emails] = await Promise.all([
    redisCommand(["GET", waitlistKey]),
    redisCommand(["GET", emailsKey]),
  ]);
  return {
    records: records ? JSON.parse(records) : [],
    emails: emails ? JSON.parse(emails) : [],
  };
}

export async function writeStore({ records, emails }) {
  await Promise.all([
    redisCommand(["SET", waitlistKey, JSON.stringify(records)]),
    redisCommand(["SET", emailsKey, JSON.stringify(emails)]),
  ]);
}
