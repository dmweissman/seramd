import Reveal from "@/components/Reveal";

const capabilities = [
  {
    num: "01",
    title: "Laser Toning & Pigmentation",
    copy: "Q-switched, picosecond, and fractional laser platforms planned to refine tone, pigmentation, and texture.",
  },
  {
    num: "02",
    title: "Non-Surgical Lifting",
    copy: "Focused-ultrasound (HIFU) lifting designed to support collagen and definition with minimal downtime.",
  },
  {
    num: "03",
    title: "Radiofrequency Microneedling",
    copy: "Microneedling paired with radiofrequency energy for texture, pores, and skin firmness.",
  },
  {
    num: "04",
    title: "Injectable Regeneration",
    copy: "Skin boosters and polynucleotide (PN/PDRN) regenerative science, introduced through appropriate regulatory pathways.",
  },
  {
    num: "05",
    title: "Neuromodulators",
    copy: "Botulinum toxin for dynamic lines and refined facial contouring, administered by a physician.",
  },
  {
    num: "06",
    title: "Dermal Fillers & Contouring",
    copy: "Hyaluronic-acid fillers for restoring volume and subtle, natural contouring.",
  },
  {
    num: "07",
    title: "Regenerative Therapies",
    copy: "Exosome, polynucleotide, and related regenerative approaches under clinical and regulatory evaluation.",
  },
  {
    num: "08",
    title: "Skin Barrier & Health",
    copy: "Hydration, barrier repair, and considered protocols for sensitive and reactive skin.",
  },
  {
    num: "09",
    title: "Body, Neck & Décolletage",
    copy: "Tightening and texture programs that extend care beyond the face.",
  },
  {
    num: "10",
    title: "Multi-Modal Protocols",
    copy: "Integrated protocols combining device, injectable, and topical care for cohesive results.",
  },
];

export default function Capabilities() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="label">Under Medical Supervision</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4.4vw, 58px)", marginTop: 0 }}>
              A considered range of planned <em>modalities.</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="body-copy" style={{ marginTop: 24 }}>
              The institute is being designed around integrated,
              physician-supervised care—drawing the most refined aesthetic and
              regenerative modalities into coordinated protocols.
            </p>
          </Reveal>
        </div>

        <ol className="capability-list">
          {capabilities.map((item, index) => (
            <Reveal key={item.num} delay={(index % 2) * 80}>
              <li className="capability">
                <span className="label capability-num">{item.num}</span>
                <div>
                  <h3 className="capability-title">{item.title}</h3>
                  <p className="capability-copy">{item.copy}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="capability-note">
            Modalities shown are planned and remain subject to clinical, legal,
            licensing, and regulatory review. All care will be provided under
            physician supervision. Certain technologies referenced are not yet
            available in the United States and would be introduced only through
            appropriate regulatory pathways.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
