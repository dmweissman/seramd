"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#difference", label: "The Difference" },
  { href: "#technology", label: "Technology" },
  { href: "#model", label: "The Model" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="header" data-scrolled={scrolled}>
        <div className="header-inner">
          <Link href="/" className="wordmark">
            Sera<span className="dot">·</span>MD
          </Link>
          <nav className="nav" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#join" className="btn header-cta">
            Join Founding List
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#join" onClick={() => setOpen(false)}>
          Join Founding List
        </a>
      </div>
    </>
  );
}
