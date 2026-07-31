export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="footer-wordmark">Sera·MD</p>
            <p className="footer-tagline">
              Aesthetic Medicine · Surgery · Longevity
            </p>
          </div>
          <address className="footer-address">
            2 Kings Highway East
            <br />
            Middletown, NJ 07748
          </address>
          <nav className="footer-links" aria-label="Footer">
            <a
              className="footer-link"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
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
          <p className="footer-copyright">© 2026 SERA MD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
