import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { notifyLead } from "@/lib/email";
import { readLeads, storageConfigured, withinRateLimit, writeLeads } from "@/lib/storage";

const interests = new Set([
  "Advanced Aesthetics",
  "Regenerative Medicine",
  "Longevity Medicine",
  "Founding Membership",
  "Physician or Clinical Partnership",
  "Investment or Strategic Partnership",
]);

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export async function POST(request: Request) {
  try {
    let payload: Record<string, unknown>;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: bots fill every field; humans never see this one.
    if (String(payload.company || "").trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    if (!storageConfigured()) {
      return NextResponse.json(
        { error: "Submissions are temporarily unavailable. Please email david@seramd.com." },
        { status: 503 },
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!(await withinRateLimit(`founding:${ip}`, 6, 600))) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 },
      );
    }

    const firstName = String(payload.firstName || "").trim().slice(0, 100);
    const lastName = String(payload.lastName || "").trim().slice(0, 100);
    const email = String(payload.email || "").trim().toLowerCase().slice(0, 200);
    const phone = String(payload.phone || "").trim().slice(0, 30);
    const interest = String(payload.interest || "").trim();
    const consent = payload.consent === "on" || payload.consent === true;

    if (!firstName || !lastName) {
      return NextResponse.json({ error: "First and last name are required." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: "Enter a valid mobile number." }, { status: 400 });
    }
    if (!interests.has(interest)) {
      return NextResponse.json({ error: "Select a primary interest." }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json(
        { error: "Please confirm the communications consent to join the list." },
        { status: 400 },
      );
    }

    const leads = await readLeads();
    const now = new Date().toISOString();
    const existing = leads.find((lead: { email: string }) => lead.email === email);

    if (existing) {
      Object.assign(existing, {
        firstName,
        lastName,
        phone,
        interest,
        consent: true,
        lastSubmittedAt: now,
        submissions: (existing.submissions || 1) + 1,
      });
    } else {
      leads.unshift({
        id: randomUUID(),
        firstName,
        lastName,
        email,
        phone,
        interest,
        consent: true,
        consentText:
          "Email and SMS communications about opening updates and founding access",
        createdAt: now,
        lastSubmittedAt: now,
        submissions: 1,
      });
    }

    await writeLeads(leads);
    await notifyLead({ firstName, lastName, email, phone, interest });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
