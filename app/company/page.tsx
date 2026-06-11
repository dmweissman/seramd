import type { Metadata } from "next";

export const metadata: Metadata = { title: "Company" };

export default function CompanyPage() {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow-mark" />
          Company
        </p>
        <h1 className="h-display" style={{ marginTop: 24 }}>
          On <em>building.</em>
        </h1>
        <p className="section-lede">
          The team, the thesis, and the operating standards. This page is built
          in Phase 3.
        </p>
      </div>
    </section>
  );
}
