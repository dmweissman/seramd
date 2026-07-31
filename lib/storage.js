const leadsKey = "seramd:founding-leads";

export const notifyEmail = process.env.NOTIFY_EMAIL || "david@seramd.com";

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

export function storageConfigured() {
  return Boolean(redisConfig());
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

export async function readLeads() {
  const leads = await redisCommand(["GET", leadsKey]);
  return leads ? JSON.parse(leads) : [];
}

export async function writeLeads(leads) {
  await redisCommand(["SET", leadsKey, JSON.stringify(leads)]);
}

// Sliding-window-ish rate limit: N requests per key per window.
export async function withinRateLimit(key, limit, windowSeconds) {
  const count = await redisCommand(["INCR", `seramd:rl:${key}`]);
  if (Number(count) === 1) {
    await redisCommand(["EXPIRE", `seramd:rl:${key}`, String(windowSeconds)]);
  }
  return Number(count) <= limit;
}
