import Reveal from "@/components/Reveal";

const pillars = [
  {
    num: "01",
    title: "Advanced Aesthetics",
    body: "Picosecond, thulium, and radiofrequency technology for non-surgical lifting, pigment correction, and glass-skin glow.",
  },
  {
    num: "02",
    title: "Regenerative Science",
    body: "Next-generation regenerative protocols — polynucleotide (PDRN/PN) and exosome science — introduced through appropriate regulatory pathways.",
  },
  {
    num: "03",
    title: "Longevity & Hormone Care",
    body: "AI-assisted physicals, comprehensive lab diagnostics, and hormone optimization aimed at your biological age — not just your appearance.",
  },
];

export default function Difference() {
  return (
    <section className="section" id="difference">
      <div className="container">
        <Reveal>
          <span className="eyebrow">The Difference</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="h2" style={{ marginTop: 22, maxWidth: "16ch" }}>
            One institute. Three <span style={{ color: "var(--accent)" }}>disciplines.</span>
          </h2>
        </Reveal>
        <div className="grid-3">
          {pillars.map((p, i) => (
            <Reveal key={p.num} delay={i * 90}>
              <article className="card">
                <span className="card-num">{p.num}</span>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-body">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
