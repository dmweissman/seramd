import Image from "next/image";
import Reveal from "@/components/Reveal";

const disciplines = [
  {
    num: "01",
    title: "Advanced Aesthetics",
    copy: "Next-generation lifting, laser, regenerative, and skin-renewal technologies sourced from leading international markets.",
    image: "/sera-aesthetics.webp",
    alt: "Soft directional light across a stone surface",
  },
  {
    num: "02",
    title: "Surgical",
    copy: "A private surgical environment designed for select cosmetic procedures with complete pre- and post-operative continuity.",
    image: "/sera-surgical-suite.webp",
    alt: "Low light across a dark clinical interior",
  },
  {
    num: "03",
    title: "Longevity Medicine",
    copy: "Advanced diagnostics, hormone optimization, metabolic care, and personalized programs designed to improve how patients feel as well as how they look.",
    image: "/sera-longevity-diagnostics.webp",
    alt: "Warm light falling across a neutral surface",
  },
];

export default function Disciplines() {
  return (
    <section className="section section--white" id="disciplines">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="label">Disciplines</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4.4vw, 58px)", marginTop: 0 }}>
              Three disciplines. One <em>institute.</em>
            </h2>
          </Reveal>
        </div>

        <div className="disciplines-grid">
          {disciplines.map((discipline, index) => (
            <Reveal key={discipline.num} delay={index * 100}>
              <article className="discipline">
                <div className="discipline-media">
                  <Image
                    src={discipline.image}
                    alt={discipline.alt}
                    fill
                    sizes="(min-width: 860px) 33vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className="label discipline-num">
                  {discipline.num} — {discipline.title}
                </span>
                <h3 className="discipline-title">{discipline.title}</h3>
                <p className="discipline-copy">{discipline.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
