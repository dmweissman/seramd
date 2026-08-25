import Reveal from "@/components/Reveal";

const stats = [
  {
    label: "Status",
    value: "Opening soon",
    sub: "Monmouth County, New Jersey",
  },
  {
    label: "Model",
    value: "Membership-first",
    sub: "Concierge memberships plus à la carte procedures",
  },
  {
    label: "Standard",
    value: "Physician-led",
    sub: "Global technology, American clinical accountability",
  },
];

const tiers = [
  {
    name: "Essential",
    desc: "Quarterly glass-skin boosters, skincare credit, and member pricing across every treatment.",
  },
  {
    name: "Prime",
    desc: "Hormone optimization, quarterly labs, a monthly treatment credit, and priority booking.",
  },
  {
    name: "Total",
    desc: "The full longevity program — annual AI physical, advanced diagnostics, and everything in Prime.",
  },
];

export default function Model() {
  return (
    <section className="section" id="model">
      <div className="container">
        <Reveal>
          <span className="eyebrow">The Model</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="h2" style={{ marginTop: 22, maxWidth: "18ch" }}>
            Built as a <span style={{ color: "var(--accent)" }}>destination</span>, not a med spa.
          </h2>
        </Reveal>

        <div className="stat-row">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <div className="stat">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">
                  {s.value}
                  <span>{s.sub}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="muted" style={{ marginTop: 40, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Membership tiers
          </p>
        </Reveal>
        <div className="tiers">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div className="tier">
                <div className="tier-name">Sera {t.name}</div>
                <p className="tier-desc">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="muted" style={{ marginTop: 36, fontSize: 14 }}>
            Investing or exploring a strategic partnership?{" "}
            <a
              href="mailto:david@seramd.com?subject=SERA%20MD%20%E2%80%94%20Investment%20%2F%20Partnership%20inquiry"
              className="arrow-link"
              style={{ display: "inline-flex" }}
            >
              Request a private conversation →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
