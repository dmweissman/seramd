import Reveal from "@/components/Reveal";

export default function BrandStatement() {
  return (
    <section className="section brand-statement">
      <div className="container">
        <Reveal>
          <p className="brand-line">Look younger.</p>
        </Reveal>
        <Reveal delay={200}>
          <p className="brand-line">Feel younger.</p>
        </Reveal>
        <Reveal delay={400}>
          <p className="brand-line brand-line--accent">Measure younger.</p>
        </Reveal>
      </div>
    </section>
  );
}
