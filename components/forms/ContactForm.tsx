"use client";

import { useState } from "react";

export type ContactType = {
  value: string;
  label: string;
};

type ContactFormProps = {
  types: ContactType[];
  defaultType?: string;
  messageLabel?: string;
};

export default function ContactForm({
  types,
  defaultType,
  messageLabel = "Message",
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
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
        Received. We read every inquiry and will reply if there&apos;s a fit.
      </div>
    );
  }

  return (
    <form className="panel-form" onSubmit={handleSubmit}>
      <div className="field">
        <label className="field-label" htmlFor="contact-name">
          Name
        </label>
        <input id="contact-name" name="name" className="input input--block" required maxLength={200} />
      </div>
      <div className="field">
        <label className="field-label" htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className="input input--block"
          autoComplete="email"
          required
          maxLength={200}
        />
      </div>
      <div className="field">
        <label className="field-label" htmlFor="contact-organization">
          Organization (optional)
        </label>
        <input
          id="contact-organization"
          name="organization"
          className="input input--block"
          maxLength={200}
        />
      </div>
      <div className="field">
        <label className="field-label" htmlFor="contact-type">
          Inquiry type
        </label>
        <select
          id="contact-type"
          name="type"
          className="input input--block"
          defaultValue={defaultType || types[0]?.value}
        >
          {types.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label className="field-label" htmlFor="contact-message">
          {messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="input input--block"
          required
          maxLength={5000}
        />
      </div>
      <div>
        <button className="btn btn--lg" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send inquiry"}
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
