import type { Metadata } from "next";
import WaitlistForm from "@/components/forms/WaitlistForm";

export const metadata: Metadata = { title: "Join the list" };

export default function CharterPage() {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow-mark" />
          Waitlist
        </p>
        <h1 className="h-display" style={{ marginTop: 24 }}>
          Be the first <em>to know.</em>
        </h1>
        <p className="section-lede">
          Join the waitlist to be notified when SeraMD is ready. The full
          intake form arrives in Phase 3.
        </p>
        <div style={{ marginTop: 32 }}>
          <WaitlistForm source="charter" />
        </div>
      </div>
    </section>
  );
}
