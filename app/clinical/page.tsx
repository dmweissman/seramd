import type { Metadata } from "next";

export const metadata: Metadata = { title: "Clinical" };

export default function ClinicalPage() {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow-mark" />
          Clinical
        </p>
        <h1 className="h-display" style={{ marginTop: 24 }}>
          A clinical model built around <em>the individual.</em>
        </h1>
        <p className="section-lede">
          Lab verification, physician oversight, and biomarker-calibrated
          protocols. This page is built in Phase 3.
        </p>
      </div>
    </section>
  );
}
