export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="footer-wordmark">Sera·MD</p>
            <p className="footer-tagline">
              Aesthetic Medicine · Regeneration · Longevity
            </p>
          </div>
          <address className="footer-address">
            2 Kings Highway East
            <br />
            Middletown, NJ 07748
          </address>
          <nav className="footer-links" aria-label="Footer">
            <a className="footer-link" href="mailto:david@seramd.com">
              Contact
            </a>
            <a className="footer-link" href="/privacy">
              Privacy
            </a>
            <a className="footer-link" href="/terms">
              Terms
            </a>
          </nav>
        </div>

        <div className="footer-legal">
          <p className="footer-disclaimer">
            SERA MD is currently in development and is not yet providing
            medical services. Information presented on this website is for
            general informational purposes only and does not constitute
            medical advice. Services, providers, technologies, and opening
            dates remain subject to clinical, legal, licensing, and regulatory
            review.
          </p>
          <p className="footer-disclaimer" style={{ marginTop: 20 }}>
            Photography: BalikianFacialPlasticSurgery (CC BY 4.0) · Tyler Frew
            MD (CC BY-SA 4.0) · National Eye Institute (CC BY 2.0) · Antony-22
            (CC BY-SA 4.0) · Matt Kieffer (CC BY-SA 2.0), via Wikimedia
            Commons. Images edited (tone/crop).
          </p>
          <p className="footer-copyright">© 2026 SERA MD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
