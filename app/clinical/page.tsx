import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clinical",
  description:
    "How SeraMD works clinically: biomarker-personalized protocols, US physician oversight, 503A compounding, and AI clinical decision support with the physician as prescriber of record.",
};

const philosophy = [
  {
    tag: "01 — Personalized to bloodwork",
    title: "Every protocol starts with a panel.",
    body: "Comprehensive bloodwork informs every clinical decision. The baseline panel spans hormonal, metabolic, inflammatory, and longevity biomarkers — repeated on a 90-day re-evaluation cycle so protocols answer to data, not habit.",
  },
  {
    tag: "02 — Prescribed by physicians",
    title: "A physician decides. Always.",
    body: "Every protocol is reviewed and prescribed by a US-licensed physician. AI is clinical decision support; the physician is the prescriber of record and retains full authority over every clinical decision.",
  },
  {
    tag: "03 — Compounded by 503A pharmacies",
    title: "Individualized, documented, traceable.",
    body: "Individualized prescriptions are filled by licensed 503A compounding pharmacies, with chain-of-custody and quality documentation — including independent certificates of analysis.",
  },
];

const protocolCategories = [
  {
    tag: "Category 01",
    title: "Longevity",
    body: "Protocols organized around healthy-aging goals, informed by longevity biomarkers and re-evaluated quarterly.",
  },
  {
    tag: "Category 02",
    title: "Performance",
    body: "Protocols for recovery and physical performance goals, calibrated to training load, history, and bloodwork.",
  },
  {
    tag: "Category 03",
    title: "Metabolic",
    body: "Protocols organized around metabolic health goals, guided by metabolic and inflammatory biomarker panels.",
  },
  {
    tag: "Category 04",
    title: "Hormonal optimization",
    body: "Protocols informed by comprehensive hormonal panels, prescribed only where clinically appropriate.",
  },
];

const aiRows = [
  { label: "Surfaces relevant clinical context", status: "Informational" },
  { label: "Flags biomarker abnormalities", status: "For review" },
  { label: "Proposes protocol candidates", status: "Physician decides" },
  { label: "Every output audit-logged", status: "Recorded" },
  { label: "Model version documented", status: "Versioned" },
  { label: "Physician overrides documented", status: "Tracked" },
];

export default function ClinicalPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal reveal--d1">
            <span className="eyebrow-mark" />
            Clinical
          </p>
          <h1 className="h-display reveal reveal--d2" style={{ marginTop: 24 }}>
            A clinical model built around <em>the individual.</em>
          </h1>
          <p className="section-lede reveal reveal--d3">
            Physician-led, AI-supported, and informed by bloodwork. SeraMD
            protocols are decided by licensed physicians against each
            patient&apos;s own biomarkers — never dispensed from a menu.
          </p>
        </div>
      </section>

      {/* Clinical philosophy */}
      <section className="block how-wrap">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              The clinical philosophy
            </p>
            <h2 className="section-title">
              Three commitments, <em>no exceptions.</em>
            </h2>
          </header>
          <div className="pillars-grid">
            {philosophy.map((item) => (
              <article key={item.tag} className="pillar-card">
                <p className="pillar-tag">{item.tag}</p>
                <h3 className="pillar-title">{item.title}</h3>
                <p className="pillar-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol library */}
      <section className="block">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              The protocol library
            </p>
            <h2 className="section-title">
              Categories, <em>not catalogs.</em>
            </h2>
            <p className="section-lede">
              SeraMD organizes its formulary by clinical goal. Specific
              therapies are discussed within the clinical relationship, after
              bloodwork and physician review — not marketed on a website.
            </p>
          </header>
          <div className="proof-grid proof-grid--4">
            {protocolCategories.map((category) => (
              <article key={category.tag} className="proof-block">
                <span className="proof-tag">{category.tag}</span>
                <h3 className="proof-title">{category.title}</h3>
                <p className="proof-body">{category.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AI clinical decision support */}
      <section className="block how-wrap">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              AI clinical decision support
            </p>
            <h2 className="section-title">
              The physician holds <em>the pen.</em>
            </h2>
            <p className="section-lede">
              SeraMD&apos;s platform organizes each patient&apos;s biomarkers,
              history, and intake into clinical context a physician can act
              on. The AI is informational only — it never prescribes, and it
              never acts autonomously.
            </p>
          </header>

          <div className="protocol" style={{ maxWidth: 560, transform: "none" }}>
            <div className="protocol-head">
              <span className="protocol-head-l">Decision support · Governance</span>
              <span className="protocol-head-r">CDS / 01</span>
            </div>
            <ul className="protocol-list">
              {aiRows.map((row) => (
                <li key={row.label}>
                  <span className="protocol-list-l">{row.label}</span>
                  <span className="protocol-list-r">{row.status}</span>
                </li>
              ))}
            </ul>
            <div className="protocol-footer">
              <span className="protocol-status-label">Prescribing authority</span>
              <span className="protocol-status-val">PHYSICIAN</span>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Director invitation */}
      <section className="block">
        <div className="container">
          <div className="invite-block">
            <p className="invite-title">
              We are recruiting our founding Medical Director.
            </p>
            <Link href="/company#careers" className="btn">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final" style={{ paddingTop: 0 }}>
        <div className="container">
          <p className="eyebrow">
            <span className="eyebrow-mark" />
            Waitlist
          </p>
          <h2>
            Medicine that answers <em>to your labs.</em>
          </h2>
          <p className="final-lede">
            Join the waitlist to be notified when SeraMD is ready.
          </p>
          <div style={{ marginTop: 28 }}>
            <Link href="/charter" className="btn btn--lg">
              Join the waitlist
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
