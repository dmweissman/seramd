import Link from "next/link";
import SpecimenCard from "@/components/SpecimenCard";
import WaitlistForm from "@/components/forms/WaitlistForm";

const badges = [
  {
    label: "US physician guided",
    icon: (
      <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Lab verified batches",
    icon: (
      <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2v7.31" />
        <path d="M14 9.3V1.99" />
        <path d="M8.5 2h7" />
        <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
      </svg>
    ),
  },
  {
    label: "Independent COA available",
    icon: (
      <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Biomarker calibration",
    icon: (
      <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M3 12h2" />
        <path d="M19 12h2" />
        <path d="M12 3v2" />
        <path d="M12 19v2" />
        <path d="m5.6 5.6 1.4 1.4" />
        <path d="m17 17 1.4 1.4" />
        <path d="m5.6 18.4 1.4-1.4" />
        <path d="m17 7 1.4-1.4" />
      </svg>
    ),
  },
];

const pillars = [
  {
    tag: "01 — Analytical safety",
    title: "Every batch, independently tested.",
    body: "Third-party analytical testing, accessible certificates of analysis, and audited sourcing for every approved protocol.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    tag: "02 — Clinical decision support",
    title: "Guided by US physicians.",
    body: "Licensed providers review biomarkers, intake, and medical history before any clinical decision is made.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M16 14a6 6 0 0 0-8 0" />
        <path d="M5 20a8 8 0 0 1 14 0" />
        <path d="m17 11 2 2 4-4" />
      </svg>
    ),
  },
  {
    tag: "03 — Calibrated dosing",
    title: "Calibrated to your biomarkers.",
    body: "Protocols are calibrated to biomarkers, history, and clinical review — never one-size-fits-all tiers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      </svg>
    ),
  },
];

const steps = [
  {
    num: "Step 01",
    title: "Biomarker panel",
    body: "Comprehensive bloodwork drawn at home or at a national lab to understand your biology.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 2v6.5L4 16a4 4 0 0 0 3.5 6h9A4 4 0 0 0 20 16l-5-7.5V2" />
        <line x1="6" y1="2" x2="18" y2="2" />
        <line x1="7" y1="14" x2="17" y2="14" />
      </svg>
    ),
  },
  {
    num: "Step 02",
    title: "Physician review",
    body: "A US-licensed provider reviews your biomarkers, intake, and clinical history.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M5 20a8 8 0 0 1 14 0" />
      </svg>
    ),
  },
  {
    num: "Step 03",
    title: "Calibrated protocol",
    body: "If appropriate, a verified protocol is calibrated to your biology and dispensed by an audited 503A pharmacy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      </svg>
    ),
  },
];

const proofs = [
  {
    tag: "01 · Verified",
    title: "Audited sourcing.",
    body: "Every approved protocol traces back to an audited 503A supply chain and independently tested batches.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    tag: "02 · Reviewed",
    title: "Licensed clinical review.",
    body: "US-licensed physicians review every biomarker profile before any clinical decision is made.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M5 20a8 8 0 0 1 14 0" />
      </svg>
    ),
  },
  {
    tag: "03 · Calibrated",
    title: "Biomarker-driven calibration.",
    body: "Our platform organizes biomarker insights for physician review — calibrating dosing to the individual.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 4 5-6" />
      </svg>
    ),
  },
];

const standardRows = [
  {
    tag: "01",
    label: "Batch Purity Testing",
    sera: "100% Independent COA Available",
    other: "Varies / Undisclosed",
  },
  {
    tag: "02",
    label: "Clinical Onboarding",
    sera: "AI Diagnostic Analysis + US Physician",
    other: "Asynchronous Form Review",
  },
  {
    tag: "03",
    label: "Sourcing Infrastructure",
    sera: "Audited 503A Compounding Only",
    other: "Broker Network Sourcing",
  },
  {
    tag: "04",
    label: "Dosing Calibration",
    sera: "Dynamic Biomarker Personalization",
    other: "One-Size-Fits-All Tiers",
  },
];

const partnerCards = [
  { tag: "Clinical", title: "Clinicians & Medical Director" },
  { tag: "Pharmacy", title: "503A compounding partners" },
  { tag: "Laboratory", title: "Diagnostic & analytical labs" },
  { tag: "Capital", title: "Strategic investors" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow hero-eyebrow reveal reveal--d1">
              <span className="eyebrow-mark" />
              Verified peptide medicine
            </p>
            <h1 className="h-display hero-headline reveal reveal--d2">
              Medicine,
              <br />
              calibrated <em>to you.</em>
            </h1>
            <p className="hero-lede reveal reveal--d3">
              Verified peptide medicine, personalized to your biomarkers and
              guided by US-licensed physicians.
            </p>
            <div className="reveal reveal--d4">
              <WaitlistForm source="home-waitlist" />
              <p className="form-fine">
                Lab-verified · Physician-led · Calibrated to you
              </p>
            </div>
          </div>
          <div className="reveal reveal--d5">
            <SpecimenCard />
          </div>
        </div>

        <div className="container trust-row">
          <div className="badges">
            {badges.map((badge) => (
              <span key={badge.label} className="badge">
                {badge.icon}
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="intro">
        <div className="container">
          <p className="intro-text">
            SeraMD is beginning with peptide-based care and metabolic
            optimization — built on{" "}
            <span className="highlight">
              verified sourcing, physician oversight, and personalized
              biomarker review.
            </span>
          </p>
        </div>
      </section>

      {/* What we stand on */}
      <section className="block">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              What we stand on
            </p>
            <h2 className="section-title">
              A different <em>standard.</em>
            </h2>
          </header>
          <div className="pillars-grid">
            {pillars.map((pillar) => (
              <article key={pillar.tag} className="pillar-card">
                <div className="pillar-icon-wrap">{pillar.icon}</div>
                <p className="pillar-tag">{pillar.tag}</p>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-body">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="block how-wrap">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              How it works
            </p>
            <h2 className="section-title">
              From biomarkers <em>to protocol.</em>
            </h2>
            <p className="section-lede">
              A supervised path from biomarker review to a clinically decided
              protocol.
            </p>
          </header>
          <div className="how-grid">
            {steps.map((step) => (
              <article key={step.num} className="step-card">
                <div className="step-head">
                  <span className="step-num-pill">{step.num}</span>
                  <span className="step-icon">{step.icon}</span>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-body">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Certainty / proof */}
      <section className="block">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              Why it matters
            </p>
            <h2 className="section-title">
              Built for patients who want <em>certainty,</em> not guesswork.
            </h2>
          </header>
          <div className="proof-grid">
            {proofs.map((proof) => (
              <article key={proof.tag} className="proof-block">
                <div className="proof-icon-row">
                  <span className="proof-icon">{proof.icon}</span>
                  <span className="proof-tag">{proof.tag}</span>
                </div>
                <h3 className="proof-title">{proof.title}</h3>
                <p className="proof-body">{proof.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The diagnostic standard */}
      <section className="block standard-section">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              The Diagnostic Standard
            </p>
            <h2 className="section-title">
              A higher <em>baseline.</em>
            </h2>
            <p className="section-lede">
              How verified personalized medicine differs from standard
              telehealth.
            </p>
          </header>

          <div className="standard-table">
            <div className="standard-row standard-row--head">
              <div className="standard-cell standard-cell--label">
                <span className="standard-head-mark">Discipline</span>
              </div>
              <div className="standard-cell standard-cell--head standard-cell--sera-head">
                <span className="standard-head-mark">Sera · MD</span>
                <h3 className="standard-head-name">SeraMD</h3>
              </div>
              <div className="standard-cell standard-cell--head standard-cell--other-head">
                <span className="standard-head-mark">Reference</span>
                <h3 className="standard-head-name">Standard Telehealth</h3>
              </div>
            </div>

            {standardRows.map((row) => (
              <div key={row.tag} className="standard-row">
                <div className="standard-cell standard-cell--label">
                  <span className="standard-label-tag">{row.tag}</span>
                  <p className="standard-label-text">{row.label}</p>
                </div>
                <div className="standard-cell">
                  <span className="standard-marker standard-marker--verified">
                    Verified
                  </span>
                  <p className="standard-value">{row.sera}</p>
                </div>
                <div className="standard-cell">
                  <span className="standard-marker standard-marker--dash">—</span>
                  <p className="standard-value standard-value--muted">
                    {row.other}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners (dark) */}
      <section className="block partners">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              For partners
            </p>
            <h2 className="section-title">
              Building the network <em>behind better care.</em>
            </h2>
            <p className="section-lede">
              We&apos;re assembling a trusted network of clinicians, pharmacy
              partners, diagnostic labs, and strategic investors to help shape
              a better standard for personalized medicine.
            </p>
          </header>

          <div className="partner-grid">
            {partnerCards.map((card) => (
              <Link key={card.tag} href="/partnerships" className="partner-card">
                <span className="partner-tag">{card.tag}</span>
                <h3 className="partner-title">{card.title}</h3>
                <span className="partner-cta">Get in touch →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final" id="waitlist">
        <div className="container">
          <p className="eyebrow">
            <span className="eyebrow-mark" />
            Waitlist
          </p>
          <h2>
            Be the first <em>to know.</em>
          </h2>
          <p className="final-lede">
            Join the waitlist to be notified when SeraMD is ready.
          </p>
          <WaitlistForm source="home-waitlist" center />
          <p className="form-fine" style={{ textAlign: "center", marginTop: 18 }}>
            Launching soon
          </p>
        </div>
      </section>
    </>
  );
}
