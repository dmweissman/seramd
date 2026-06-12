import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "SeraMD partners with 503A compounding pharmacies, licensed physicians, research organizations, and strategic capital. Start the conversation.",
};

const partnershipTypes = [
  {
    value: "pharmacy",
    tag: "Pharmacy",
    title: "503A compounding partners",
    body: "We are building a redundant network of licensed 503A compounding pharmacies. We look for: licensure in five or more states, PCAB accreditation, sterile compounding capability, and cold-chain shipping infrastructure.",
  },
  {
    value: "physician",
    tag: "Clinical",
    title: "Physician network & Medical Director",
    body: "For licensed physicians interested in the prescribing network — or in the founding Medical Director role, shaping clinical governance, protocol standards, and the formulary from day one.",
  },
  {
    value: "research",
    tag: "Research",
    title: "Research & clinical trials",
    body: "For CROs and research organizations interested in collaborating on outcome studies of personalized peptide protocols. Evidence generation is part of the model, not an afterthought.",
  },
  {
    value: "capital",
    tag: "Capital",
    title: "Capital partners",
    body: "For institutional investors and family offices. SeraMD is raising its seed round; request the deck through the form below and we will follow up directly.",
  },
];

const contactTypes = [
  { value: "pharmacy", label: "Pharmacy partnership" },
  { value: "physician", label: "Physician network / Medical Director" },
  { value: "research", label: "Research & clinical trials" },
  { value: "capital", label: "Capital / deck request" },
  { value: "general", label: "General inquiry" },
];

export default function PartnershipsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal reveal--d1">
            <span className="eyebrow-mark" />
            Partnerships
          </p>
          <h1 className="h-display reveal reveal--d2" style={{ marginTop: 24 }}>
            Built <em>with partners.</em>
          </h1>
          <p className="section-lede reveal reveal--d3">
            SeraMD runs on a network: licensed pharmacies, physicians,
            diagnostic labs, research organizations, and aligned capital. If
            you operate in one of these lanes, we want to talk.
          </p>
        </div>
      </section>

      {/* Partnership types */}
      <section className="block how-wrap" style={{ paddingTop: "clamp(40px, 5vw, 64px)" }}>
        <div className="container">
          <div className="pillars-grid pillars-grid--2">
            {partnershipTypes.map((type) => (
              <article key={type.value} className="pillar-card">
                <p className="pillar-tag">{type.tag}</p>
                <h3 className="pillar-title">{type.title}</h3>
                <p className="pillar-body">{type.body}</p>
                <p style={{ margin: "18px 0 0" }}>
                  <a href="#contact" className="eyebrow" style={{ textDecoration: "none" }}>
                    Start the conversation →
                  </a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="block" id="contact">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">
              <span className="eyebrow-mark" />
              Get in touch
            </p>
            <h2 className="section-title">
              One form, <em>read by the founder.</em>
            </h2>
            <p className="section-lede">
              Choose your partnership type and tell us briefly who you are and
              what you operate. Every inquiry is read.
            </p>
          </header>
          <ContactForm
            types={contactTypes}
            messageLabel="Who you are, what you operate, and the states you cover"
          />
        </div>
      </section>
    </>
  );
}
