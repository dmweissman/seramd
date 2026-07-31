import Reveal from "@/components/Reveal";

export default function InstituteIntroduction() {
  return (
    <section className="section" id="institute">
      <div className="container intro-grid">
        <div>
          <Reveal>
            <span className="label">The Institute</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display intro-statement" style={{ marginTop: 26 }}>
              Not a med spa. A new standard of aesthetic and longevity{" "}
              <em>medicine.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={160} className="intro-copy">
          <p className="body-copy">
            SERA MD is being created for patients who expect more from modern
            medicine: advanced technology, clinical accountability,
            personalized protocols, and an environment designed around
            transformation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
