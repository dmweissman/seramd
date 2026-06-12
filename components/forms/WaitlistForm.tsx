"use client";

import { useState } from "react";

type WaitlistFormProps = {
  source: "home-waitlist" | "charter";
  buttonLabel?: string;
  center?: boolean;
};

export default function WaitlistForm({
  source,
  buttonLabel = "Join the waitlist",
  center = false,
}: WaitlistFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Something went wrong. Please try again.");
      }

      setStatus("done");
    } catch (caught) {
      setStatus("idle");
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div
        className="form-confirm"
        style={center ? { margin: "16px auto 0", textAlign: "left" } : undefined}
        role="status"
      >
        You&apos;re on the list. We&apos;ll be in touch as we approach launch.
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`hero-form${center ? " final-form" : ""}`}
      >
        <label className="sr-only" htmlFor={`email-${source}`}>
          Email address
        </label>
        <input
          id={`email-${source}`}
          className="input"
          type="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          required
        />
        <button className="btn btn--lg" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : buttonLabel}
        </button>
      </form>
      {error ? (
        <p className="form-error" style={center ? { margin: "10px auto 0" } : undefined} role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}
