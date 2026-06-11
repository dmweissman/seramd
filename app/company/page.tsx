import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Why SeraMD exists, who is building it, and the roles we are recruiting — including our founding Medical Director.",
};

const leadership = [
  {
    tag: "Founder",
    name: "David Weissman",
    line: "Two decades building and operating e-commerce businesses. Came to peptide medicine as a patient first — and is building the version he wanted as a customer.",
  },
  {
    tag: "Recruiting",
    name: "Medical Director",
    line: "A board-certified physician to lead clinical governance, protocol standards, and the prescribing network from day one. Founding-team equity.",
  },
  {
    tag: "Forming",
    name: "Founding team",
    line: "Clinical operations, pharmacy relations, and engineering. Roles open as the company comes online.",
  },
];

const contactTypes = [
  { value: "general", label: "General" },
  { value: "careers", label: "Careers" },
  { value: "investor", label: "Investor relations" },
  { value: "press", label: "Press" },
];

export default function CompanyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal reveal--d1">
            <span className="eyebrow-mark" />
            Company
          </p>
          <h1 className="h-display reveal reveal--d2" style={{ marginTop: 24 }}>
            On <em>building.</em>
          </h1>
          <p className="section-lede reveal reveal--d3">
            Peptide medicine has outgrown the market that sells it. SeraMD is
            building the clinical infrastructure it deserves: verified
            sourcing, physician judgment, and protocols accountable to
            bloodwork. We would rather build slowly and correctly than fast
            and loose.
          </p>
        </div>
      </section>

      {/* Founder note */}
      <section className="block how-wrap">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              Founder note
            </p>
          </header>
          <div style={{ maxWidth: 640 }}>
            <p className="intro-text" style={{ maxWidth: "none" }}>
              I&apos;ve spent twenty years building and operating e-commerce
              businesses. I came to peptides the way most people do — as a
              user, navigating a market that asks you to trust products no one
              verifies and dosing no one personalizes.{" "}
              <span className="highlight">
                SeraMD is the version I wanted as a customer:
              </span>{" "}
              verified, physician-led, and calibrated to the individual.
            </p>
            <p className="form-fine" style={{ marginTop: 24 }}>
              — David Weissman · Founder
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="block">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              Leadership
            </p>
            <h2 className="section-title">
              A small team, <em>assembled deliberately.</em>
            </h2>
          </header>
          <div className="proof-grid">
            {leadership.map((person) => (
              <article key={person.name} className="proof-block">
                <span className="proof-tag">{person.tag}</span>
                <h3 className="proof-title">{person.name}</h3>
                <p className="proof-body">{person.line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="block how-wrap" id="careers">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              Careers
            </p>
            <h2 className="section-title">
              Founding roles, <em>open now.</em>
            </h2>
            <p className="section-lede">
              SeraMD is recruiting its founding clinical and operational team
              — starting with our Medical Director. If the standard we&apos;re
              setting reads like the place you want to practice or build, use
              the form below and choose &quot;Careers.&quot;
            </p>
          </header>
        </div>
      </section>

      {/* Contact */}
      <section className="block" id="contact">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              Contact
            </p>
            <h2 className="section-title">
              Reach <em>us.</em>
            </h2>
            <p className="section-lede">
              General questions, career inquiries, investor relations, and
              press — one form, routed by inquiry type, read by the founder.
            </p>
          </header>
          <ContactForm types={contactTypes} />
        </div>
      </section>
    </>
  );
}
