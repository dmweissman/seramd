import Image from "next/image";
import Reveal from "@/components/Reveal";

const disciplines = [
  {
    num: "01",
    title: "Advanced Aesthetics",
    copy: "Next-generation lifting, laser, regenerative, and skin-renewal technologies sourced from leading international markets.",
    image: "/sera-aesthetics.webp",
    alt: "Close-up of an advanced laser handpiece during facial skin treatment",
  },
  {
    num: "02",
    title: "Regeneration",
    copy: "Laser-assisted regenerative protocols, injectable skin boosters, and microneedling — designed to repair, restore, and rebuild from within, introduced through appropriate regulatory pathways.",
    image: "/sera-hero-clinic.webp",
    alt: "Laser-assisted skin treatment performed at a physician-led clinic",
  },
  {
    num: "03",
    title: "Longevity Medicine",
    copy: "A comprehensive physician exam with advanced diagnostics, hormone optimization, and personalized programs designed to improve how patients feel as well as how they look.",
    image: "/sera-longevity-diagnostics.webp",
    alt: "Blood sample analysis in a clinical diagnostics laboratory",
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
