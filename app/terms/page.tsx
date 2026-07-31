import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <main className="legal-page">
        <div className="container">
          <Link href="/" className="text-link" style={{ marginBottom: 48, display: "inline-flex" }}>
            ← Sera·MD
          </Link>
          <h1 className="display" style={{ marginTop: 40 }}>
            Terms of <em>Use.</em>
          </h1>
          <p style={{ marginTop: 32 }}>
            This website is provided for general informational purposes while
            SERA MD is in development. By using it you agree to these terms.
          </p>
          <h2>No medical services or advice</h2>
          <p>
            SERA MD is not yet providing medical services. Nothing on this
            site constitutes medical advice, a treatment offer, or a
            guarantee of outcomes. Services, providers, technologies, and
            opening dates remain subject to clinical, legal, licensing, and
            regulatory review.
          </p>
          <h2>Founding list</h2>
          <p>
            Joining the founding list registers your interest and consent to
            receive communications. It does not reserve services, create a
            physician–patient relationship, or constitute a purchase.
          </p>
          <h2>Intellectual property</h2>
          <p>
            All content on this site belongs to SERA MD and may not be
            reproduced without permission. These terms will be expanded
            before services launch. Questions:{" "}
            <a href="mailto:david@seramd.com">david@seramd.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
