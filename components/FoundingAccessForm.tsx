"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const interests = [
  "Advanced Aesthetics",
  "Cosmetic Surgery",
  "Longevity Medicine",
  "Founding Membership",
  "Physician or Clinical Partnership",
  "Investment or Strategic Partnership",
];

export default function FoundingAccessForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/founding", {
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

  return (
    <section className="section founding on-dark" id="join">
      <div className="container founding-inner">
        <Reveal>
          <span className="label">Founding Access</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display founding-headline" style={{ marginTop: 26 }}>
            Be among the <em>first.</em>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="body-copy founding-copy" style={{ maxWidth: "34em" }}>
            Join the founding list for opening updates, private previews, early
            consultation access, and founding membership announcements.
          </p>
        </Reveal>

        <Reveal delay={240}>
          {status === "done" ? (
            <div className="form-success" style={{ marginTop: 56 }} role="status">
              <p className="display">
                Welcome to the founding <em>list.</em>
              </p>
              <p>
                You&apos;re on the list. We&apos;ll be in touch with opening
                updates, private previews, and founding membership
                announcements.
              </p>
            </div>
          ) : (
            <form className="founding-form" onSubmit={handleSubmit}>
              <div className="form-row form-row--2">
                <div className="field">
                  <label className="field-label" htmlFor="fa-first">
                    First name
                  </label>
                  <input id="fa-first" name="firstName" className="input" autoComplete="given-name" required maxLength={100} />
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="fa-last">
                    Last name
                  </label>
                  <input id="fa-last" name="lastName" className="input" autoComplete="family-name" required maxLength={100} />
                </div>
              </div>
              <div className="form-row form-row--2">
                <div className="field">
                  <label className="field-label" htmlFor="fa-email">
                    Email
                  </label>
                  <input id="fa-email" name="email" type="email" className="input" autoComplete="email" required maxLength={200} />
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="fa-phone">
                    Mobile number
                  </label>
                  <input
                    id="fa-phone"
                    name="phone"
                    type="tel"
                    className="input"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    maxLength={30}
                  />
                </div>
              </div>
              <div className="field">
                <label className="field-label" htmlFor="fa-interest">
                  Primary interest
                </label>
                <select id="fa-interest" name="interest" className="input" required defaultValue="">
                  <option value="" disabled>
                    Select your primary interest
                  </option>
                  {interests.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
              </div>
              {/* Honeypot — humans never see or fill this field */}
              <div className="honey" aria-hidden="true">
                <label htmlFor="fa-company">Company</label>
                <input id="fa-company" name="company" tabIndex={-1} autoComplete="off" />
              </div>
              <label className="consent">
                <input type="checkbox" name="consent" required />
                <span>
                  I agree to receive email and text messages from SERA MD about
                  opening updates and founding access. Message frequency
                  varies; message and data rates may apply. Reply STOP to opt
                  out. Consent is not a condition of any purchase.
                </span>
              </label>
              <div>
                <button type="submit" className="btn" disabled={status === "loading"}>
                  {status === "loading" ? "Submitting…" : "Request Founding Access"}
                </button>
              </div>
              {error ? (
                <p className="form-feedback form-feedback--error" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
