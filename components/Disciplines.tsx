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
    title: "Surgical",
    copy: "A private surgical suite, planned and in development, for select cosmetic procedures with complete pre- and post-operative continuity — opening upon licensure.",
    image: "/sera-surgical-suite.webp",
    alt: "Surgical light overhead in a modern operating suite",
  },
  {
    num: "03",
    title: "Longevity Medicine",
    copy: "Advanced diagnostics, hormone optimization, metabolic care, and personalized programs designed to improve how patients feel as well as how they look.",
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

        <Reveal>
          <p className="capability-note">
            The surgical program is in development and will begin only upon
            completion of all required state licensing and accreditation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
