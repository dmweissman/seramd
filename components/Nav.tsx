import Link from "next/link";

const links = [
  { href: "/clinical", label: "Clinical" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/company", label: "Company" },
];

export default function Nav() {
  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="nav-inner">
        <Link href="/" className="wordmark">
          Sera
          <span className="wordmark-mark" />
          MD
        </Link>
        <div className="nav-right">
          <span className="nav-links">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </span>
          <span className="live nav-live">
            <span className="live-dot" />
            Live
          </span>
          <Link href="/charter" className="btn">
            Join the list
          </Link>
        </div>
      </div>
    </nav>
  );
}
