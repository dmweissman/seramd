import Link from "next/link";

const links = [
  { href: "/clinical", label: "Clinical" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/company", label: "Company" },
  { href: "/charter", label: "Join the list" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-l">
          <span className="footer-wordmark">SeraMD</span>
          <nav aria-label="Footer" className="footer-links">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
            <a href="mailto:david@seramd.com" className="footer-link">
              Contact
            </a>
          </nav>
          <p className="footer-disclaimer">
            SeraMD is a forthcoming telehealth service. Availability will vary
            by state and is subject to regulatory clearance. The content of
            this site is for informational purposes only and does not
            constitute medical advice. Statements have not been evaluated by
            the FDA. SeraMD is not intended to diagnose, treat, cure, or
            prevent any disease. SeraMD is currently in pre-launch and is not
            offering medical services or products for sale.
          </p>
        </div>
        <span className="footer-meta">
          © {new Date().getFullYear()} SeraMD
        </span>
      </div>
    </footer>
  );
}
