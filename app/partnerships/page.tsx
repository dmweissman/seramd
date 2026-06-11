import type { Metadata } from "next";

export const metadata: Metadata = { title: "Partnerships" };

export default function PartnershipsPage() {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow-mark" />
          Partnerships
        </p>
        <h1 className="h-display" style={{ marginTop: 24 }}>
          Built <em>with partners.</em>
        </h1>
        <p className="section-lede">
          Pharmacy, physician, research, and capital partnerships. This page is
          built in Phase 3. Until then, reach us at{" "}
          <a href="mailto:david@seramd.com">david@seramd.com</a>.
        </p>
      </div>
    </section>
  );
}
