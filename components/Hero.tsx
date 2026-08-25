import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        <Image
          src="/sera-hero-clinic.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 38%" }}
        />
      </div>
      <div className="hero-inner">
        <span className="eyebrow rise">Monmouth County, NJ · Opening Soon</span>
        <h1 className="display rise rise--1">
          The future of aesthetics &amp; <span className="accent">longevity</span> medicine.
        </h1>
        <p className="hero-sub rise rise--2">
          Sourced from Seoul, Paris, and Monaco. Built for Monmouth County.
        </p>
        <p className="hero-tagline rise rise--3">
          Look younger<span className="sep">/</span>Feel younger
          <span className="sep">/</span>Measure younger
        </p>
        <div className="hero-actions rise rise--4">
          <a href="#join" className="btn">
            Join Founding List
          </a>
          <a href="#difference" className="btn btn--ghost">
            Explore the Vision
          </a>
        </div>
      </div>
    </section>
  );
}
