"use client";

import { useState } from "react";

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

export default function CharterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "charter",
          email: String(data.get("email") || ""),
          firstName: String(data.get("firstName") || ""),
          state: String(data.get("state") || ""),
          note: String(data.get("note") || ""),
        }),
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
      <div className="form-confirm" role="status">
        You&apos;re on the list. We&apos;ll be in touch as we approach launch in
        your state.
      </div>
    );
  }

  return (
    <form className="panel-form" onSubmit={handleSubmit}>
      <div className="field">
        <label className="field-label" htmlFor="charter-first-name">
          First name
        </label>
        <input
          id="charter-first-name"
          name="firstName"
          className="input input--block"
          autoComplete="given-name"
          required
          maxLength={100}
        />
      </div>
      <div className="field">
        <label className="field-label" htmlFor="charter-email">
          Email
        </label>
        <input
          id="charter-email"
          name="email"
          type="email"
          className="input input--block"
          autoComplete="email"
          required
          maxLength={200}
        />
      </div>
      <div className="field">
        <label className="field-label" htmlFor="charter-state">
          State of residence
        </label>
        <select id="charter-state" name="state" className="input input--block" required defaultValue="">
          <option value="" disabled>
            Select your state
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label className="field-label" htmlFor="charter-note">
          What brings you to SeraMD? (optional)
        </label>
        <textarea id="charter-note" name="note" className="input input--block" maxLength={2000} />
      </div>
      <label className="check-row">
        <input type="checkbox" name="acknowledgment" required />
        <span>
          I understand SeraMD is pre-launch and services are not yet available
          in my state.
        </span>
      </label>
      <div>
        <button className="btn btn--lg" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
