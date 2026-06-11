import type { Metadata } from "next";
import CharterForm from "@/components/forms/CharterForm";

export const metadata: Metadata = {
  title: "Join the list",
  description:
    "Join the SeraMD waitlist: verified peptide medicine, personalized to your biomarkers and guided by US-licensed physicians. Launching by invitation.",
};

export default function CharterPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal reveal--d1">
            <span className="eyebrow-mark" />
            Waitlist
          </p>
          <h1 className="h-display reveal reveal--d2" style={{ marginTop: 24 }}>
            Be the first <em>to know.</em>
          </h1>
          <p className="section-lede reveal reveal--d3">
            SeraMD launches by invitation, state by state. Tell us a little
            about yourself — it helps us prioritize where to open first, and
            it means your first conversation with us doesn&apos;t start from
            zero.
          </p>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="reveal reveal--d4">
            <CharterForm />
          </div>
          <p className="form-fine" style={{ marginTop: 22 }}>
            Launching soon · No spam, ever — only launch updates
          </p>
        </div>
      </section>
    </>
  );
}
