import Reveal from "@/components/Reveal";

const platforms = [
  {
    name: "Picosecond Systems",
    desc: "Pigment, melasma, acne scars, and tattoo clearance — with collagen stimulation. The foundation of tone and toning protocols.",
  },
  {
    name: "Fractional Thulium",
    desc: "Low-downtime resurfacing and prejuvenation that opens micro-channels for regenerative delivery — the glass-skin glow.",
  },
  {
    name: "Monopolar Radiofrequency",
    desc: "Deep dermal heating under cooling to contract and rebuild collagen — non-surgical lifting and jawline definition with no downtime.",
  },
  {
    name: "RF Microneedling",
    desc: "Insulated-needle radiofrequency at precise depths, paired with regenerative delivery to refine texture, pores, and firmness.",
  },
  {
    name: "Triple-Wavelength Diode",
    desc: "Three wavelengths fired together for fast, comfortable laser hair removal that is safe and effective across all skin tones.",
  },
  {
    name: "Physician Labs + AI Diagnostics",
    desc: "Comprehensive biomarker and hormone panels with AI-assisted physicals — measuring biological age, then optimizing it.",
  },
];

export default function Technology() {
  return (
    <section className="section" id="technology">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Day-One Technology</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="h2" style={{ marginTop: 22, maxWidth: "18ch" }}>
            The platforms patients travel for — <span style={{ color: "var(--accent)" }}>delivered locally.</span>
          </h2>
        </Reveal>
        <div className="tech-list">
          {platforms.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 70}>
              <div className="tech-item">
                <div className="tech-name">{p.name}</div>
                <p className="tech-desc">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="muted" style={{ fontSize: 13, marginTop: 28, maxWidth: "70ch" }}>
            Platforms shown are planned and representative of the technology
            categories SERA MD is being built around. Specific devices,
            treatments, and availability remain subject to clinical, legal,
            licensing, and regulatory review.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
