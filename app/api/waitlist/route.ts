import { NextResponse } from "next/server";
import { notifySignup } from "@/lib/email";
import { readStore, siteEmail, storageConfigured, writeStore } from "@/lib/storage";
import { applyWaitlistSignup } from "@/lib/waitlist";

const allowedSources = new Set(["home-waitlist", "charter"]);

function cleanField(value: unknown, max: number) {
  return String(value || "").trim().slice(0, max) || undefined;
}

export async function POST(request: Request) {
  try {
    let payload: {
      email?: string;
      source?: string;
      note?: string;
      firstName?: string;
      state?: string;
    };
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
    const note = cleanField(payload.note, 2000);
    const firstName = cleanField(payload.firstName, 100);
    const state = cleanField(payload.state, 60);

    const store = await readStore();
    const result = applyWaitlistSignup(store.records, store.emails, payload.email, siteEmail, {
      source,
      note,
      firstName,
      state,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    await writeStore(store);
    await notifySignup({
      email: String(payload.email).trim().toLowerCase(),
      source,
      detail: [
        firstName ? `First name: ${firstName}` : null,
        state ? `State: ${state}` : null,
        note ? `Note: ${note}` : null,
      ]
        .filter((line) => line !== null)
        .join("\n") || undefined,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
