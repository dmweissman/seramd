import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Location() {
  return (
    <section className="section section--white" id="location">
      <div className="container location-grid">
        <Reveal className="location-media">
          <Image
            src="/sera-middletown-location.webp"
            alt="Architectural light and shadow on an ivory facade"
            fill
            sizes="(min-width: 1000px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </Reveal>
        <div>
          <Reveal>
            <span className="label">The Location</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display location-headline" style={{ marginTop: 26 }}>
              A private destination in the heart of Monmouth{" "}
              <em>County.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-copy" style={{ marginTop: 28 }}>
              SERA MD is coming to 2 Kings Highway East in Middletown, New
              Jersey—minutes from Rumson, Colts Neck, Holmdel, Fair Haven, Red
              Bank, and the Jersey Shore.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <address className="address">
              2 Kings Highway East
              <br />
              Middletown, New Jersey 07748
              <div>
                <a
                  className="text-link"
                  href="https://maps.google.com/?q=2+Kings+Highway+East,+Middletown,+NJ+07748"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Location
                </a>
              </div>
            </address>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
