"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#institute", label: "The Institute" },
  { href: "#disciplines", label: "Disciplines" },
  { href: "#location", label: "Location" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="wordmark">
            Sera<span className="dot">·</span>MD
          </Link>
          <nav className="header-nav" aria-label="Primary">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="header-link">
                {link.label}
              </a>
            ))}
            <a href="#join" className="btn header-cta">
              Join the List
            </a>
          </nav>
          <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        <span className="label">Sera MD · Middletown, NJ</span>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#join" onClick={() => setOpen(false)}>
          Join the List
        </a>
      </div>
    </>
  );
}
