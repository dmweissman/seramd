import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { notifyContact } from "@/lib/email";
import { readContacts, storageConfigured, writeContacts } from "@/lib/storage";
import { isValidEmail } from "@/lib/waitlist";

const allowedTypes = new Set([
  "pharmacy",
  "physician",
  "research",
  "capital",
  "careers",
  "investor",
  "press",
  "general",
]);

export async function POST(request: Request) {
  try {
    let payload: {
      name?: string;
      email?: string;
      organization?: string;
      type?: string;
      message?: string;
    };
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    if (!storageConfigured()) {
      return NextResponse.json(
        { error: "Submissions are temporarily unavailable. Please email david@seramd.com." },
        { status: 503 },
      );
    }

    const name = String(payload.name || "").trim().slice(0, 200);
    const email = String(payload.email || "").trim().toLowerCase().slice(0, 200);
    const organization = String(payload.organization || "").trim().slice(0, 200);
    const type = allowedTypes.has(payload.type || "") ? (payload.type as string) : "general";
    const message = String(payload.message || "").trim().slice(0, 5000);

    if (!name || !message || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Name, a valid email, and a message are required." },
        { status: 400 },
      );
    }

    const contacts = await readContacts();
    contacts.unshift({
      id: randomUUID(),
      name,
      email,
      organization: organization || undefined,
      type,
      message,
      createdAt: new Date().toISOString(),
    });
    await writeContacts(contacts);

    await notifyContact({ name, email, type, organization, message });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
