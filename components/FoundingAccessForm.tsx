"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const interests = [
  "Advanced Aesthetics",
  "Regenerative Science",
  "Longevity & Hormone Care",
  "Founding Membership",
  "Investment or Partnership",
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
    <section className="section" id="join">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Concierge Access</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="h2" style={{ marginTop: 22, maxWidth: "16ch" }}>
            Be among the <span style={{ color: "var(--accent)" }}>first.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="lede" style={{ marginTop: 18 }}>
            Join the founding list for opening updates, private previews, and
            early consultation access.
          </p>
        </Reveal>

        <div className="form-wrap">
          <Reveal delay={200}>
            {status === "done" ? (
              <div className="form-success" role="status">
                <h3 className="h2">You&apos;re on the list.</h3>
                <p>
                  We&apos;ll be in touch with opening updates, private previews,
                  and founding announcements.
                </p>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
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
                    <input id="fa-phone" name="phone" type="tel" className="input" autoComplete="tel" inputMode="tel" required maxLength={30} />
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
                    {interests.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="honey" aria-hidden="true">
                  <label htmlFor="fa-company">Company</label>
                  <input id="fa-company" name="company" tabIndex={-1} autoComplete="off" />
                </div>
                <label className="consent">
                  <input type="checkbox" name="consent" required />
                  <span>
                    I agree to receive email and text messages from SERA MD about
                    opening updates and founding access. Message frequency varies;
                    message and data rates may apply. Reply STOP to opt out.
                    Consent is not a condition of any purchase.
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
      </div>
    </section>
  );
}
