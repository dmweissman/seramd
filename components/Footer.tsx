import Link from "next/link";

const links = [
  { href: "/clinical", label: "Clinical" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/company", label: "Company" },
  { href: "/charter", label: "Charter Access" },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-6">
          <p className="font-display text-2xl leading-none">SeraMD</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="eyebrow text-ink transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-hairline pt-8">
          <p className="max-w-[60em] text-[13px] leading-[1.6] text-muted">
            SeraMD is a clinical platform in development. Nothing on this site
            is medical advice, and no statement here is intended to diagnose,
            treat, cure, or prevent any disease. Prescription therapies are
            available only where appropriate, following evaluation by a
            licensed physician. Compounded preparations are not FDA-approved.
          </p>
          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <p className="font-mono text-[11px] tracking-[0.08em] text-muted">
              © {new Date().getFullYear()} SeraMD. All rights reserved.
            </p>
            <a
              href="mailto:david@seramd.com"
              className="font-mono text-[11px] tracking-[0.08em] text-muted transition-colors hover:text-accent"
            >
              david@seramd.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
