const waitlistKey = "seramd:waitlist";
const emailsKey = "seramd:emails";
const contactsKey = "seramd:contacts";

export const siteEmail = process.env.SITE_EMAIL || "david@seramd.com";

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

export async function readContacts() {
  const contacts = await redisCommand(["GET", contactsKey]);
  return contacts ? JSON.parse(contacts) : [];
}

export async function writeContacts(contacts) {
  await redisCommand(["SET", contactsKey, JSON.stringify(contacts)]);
}

export async function writeStore({ records, emails }) {
  await Promise.all([
    redisCommand(["SET", waitlistKey, JSON.stringify(records)]),
    redisCommand(["SET", emailsKey, JSON.stringify(emails)]),
  ]);
}
