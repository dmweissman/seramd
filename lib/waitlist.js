import { randomUUID } from "node:crypto";

export function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function autoLaunchMessage(email, siteEmail) {
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

export function applyWaitlistSignup(records, emails, rawEmail, siteEmail) {
  const email = cleanEmail(rawEmail);
  if (!isValidEmail(email)) {
    return { error: "Enter a valid email address." };
  }

  const existing = records.find((record) => record.email === email);
  const now = new Date().toISOString();

  if (existing) {
    existing.lastSubmittedAt = now;
    existing.submissions = (existing.submissions || 1) + 1;
    return { autoMessageQueued: false };
  }

  const autoMessage = autoLaunchMessage(email, siteEmail);
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
  return { autoMessageQueued: true };
}

export function applyAdminMessage(records, emails, payload, siteEmail) {
  const email = cleanEmail(payload.email);
  const subject = String(payload.subject || "").trim();
  const body = String(payload.body || "").trim();

  if (!isValidEmail(email) || !subject || !body) {
    return { error: "Email, subject, and body are required." };
  }

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
  return { record, message };
}

export function applyInboxEmail(records, emails, payload, siteEmail) {
  const from = cleanEmail(payload.from || payload.sender || payload.email);
  const subject = String(payload.subject || "").trim();
  const body = String(payload.body || payload.text || payload.html || "").trim();
  const to = cleanEmail(payload.to) || siteEmail;

  if (!isValidEmail(from) || !subject || !body) {
    return { error: "From, subject, and body are required." };
  }

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
  return { record, email: inboxEmail };
}
