"use client";

import { useState } from "react";

type WaitlistFormProps = {
  source: "home-waitlist" | "charter";
  center?: boolean;
};

export default function WaitlistForm({ source, center = false }: WaitlistFormProps) {
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
      <p
        className={`max-w-[480px] border border-hairline bg-accent-soft px-5 py-4 text-[14px] leading-[1.6] text-accent ${
          center ? "mx-auto text-center" : ""
        }`}
        role="status"
      >
        You&apos;re on the list. We&apos;ll be in touch as we approach launch.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className={`flex max-w-[480px] flex-col gap-2.5 sm:flex-row sm:flex-wrap ${center ? "mx-auto" : ""}`}
    >
      <label className="sr-only" htmlFor={`email-${source}`}>
        Email address
      </label>
      <input
        id={`email-${source}`}
        name="email"
        type="email"
        required
        placeholder="your@email.com"
        autoComplete="email"
        className="flex-1 border border-hairline bg-paper px-5 py-3.5 text-[14px] text-ink transition-colors placeholder:text-muted focus:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-accent"
      />
      <button type="submit" disabled={status === "loading"} className="btn-primary">
        {status === "loading" ? "Submitting…" : "Request charter access"}
      </button>
      {error ? (
        <p className="basis-full text-[13px] text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
