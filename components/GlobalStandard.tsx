import Image from "next/image";
import Reveal from "@/components/Reveal";

const route = [
  { city: "Seoul", coord: "37.55°N · 126.99°E" },
  { city: "Monaco", coord: "43.73°N · 7.42°E" },
  { city: "Paris", coord: "48.85°N · 2.35°E" },
  { city: "Middletown", coord: "40.39°N · 74.11°W", here: true },
];

export default function GlobalStandard() {
  return (
    <section className="section section--dark on-dark">
      <div className="container global-grid">
        <Reveal className="global-media">
          <Image
            src="/sera-surgical-suite.webp"
            alt="Directional light across a dark clinical interior"
            fill
            sizes="(min-width: 1000px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </Reveal>
        <div>
          <Reveal>
            <span className="label">The Global Standard</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display global-headline" style={{ marginTop: 26 }}>
              Inspired by Seoul. Built for American medical{" "}
              <em>accountability.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-copy" style={{ marginTop: 30 }}>
              Some of the world&apos;s most advanced aesthetic platforms and
              protocols emerge internationally years before they become widely
              available in the United States. SERA MD is being designed to
              identify, evaluate, and introduce the next generation of
              aesthetic medicine through appropriate clinical and regulatory
              pathways.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="route" aria-label="International reference points">
              {route.map((stop, index) => (
                <span key={stop.city} className="route-stop">
                  <span>
                    <span className={`route-city${stop.here ? " route-city--here" : ""}`}>
                      {stop.city}
                    </span>
                    <span className="route-coord">{stop.coord}</span>
                  </span>
                  {index < route.length - 1 ? (
                    <span className="route-sep" aria-hidden="true">
                      —
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
