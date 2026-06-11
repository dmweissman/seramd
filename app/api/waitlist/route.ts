import { NextResponse } from "next/server";
import { notifySignup } from "@/lib/email";
import { readStore, siteEmail, storageConfigured, writeStore } from "@/lib/storage";
import { applyWaitlistSignup } from "@/lib/waitlist";

const allowedSources = new Set(["home-waitlist", "charter"]);

export async function POST(request: Request) {
  try {
    let payload: { email?: string; source?: string; note?: string };
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    if (!storageConfigured()) {
      return NextResponse.json(
        { error: "Signups are temporarily unavailable. Please try again soon." },
        { status: 503 },
      );
    }

    const source = allowedSources.has(payload.source || "")
      ? (payload.source as string)
      : "home-waitlist";
    const note = String(payload.note || "").trim().slice(0, 2000) || undefined;

    const store = await readStore();
    const result = applyWaitlistSignup(store.records, store.emails, payload.email, siteEmail, {
      source,
      note,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    await writeStore(store);
    await notifySignup({
      email: String(payload.email).trim().toLowerCase(),
      source,
      detail: note,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
