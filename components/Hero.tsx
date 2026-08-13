import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        <Image
          src="/sera-hero-clinic.webp"
          alt="Laser skin treatment performed at a physician-led aesthetic clinic"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 38%" }}
        />
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <span className="label rise">Middletown, New Jersey · Opening Soon</span>
        <h1 className="display hero-headline rise rise--d1">
          The future of looking younger—and living <em>younger.</em>
        </h1>
        <p className="hero-lede rise rise--d2">
          Seoul-grade aesthetic technology, advanced longevity medicine, and
          physician-led care in one private institute.
        </p>
        <div className="hero-actions rise rise--d3">
          <a href="#join" className="btn">
            Join the Founding List
          </a>
          <a href="#institute" className="text-link" style={{ color: "var(--stone)" }}>
            Explore the Vision
          </a>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true" />
    </section>
  );
}
