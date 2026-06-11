import Link from "next/link";

const links = [
  { href: "/clinical", label: "Clinical" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/company", label: "Company" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-4"
      >
        <Link href="/" className="font-display text-2xl leading-none">
          SeraMD
        </Link>
        <div className="order-3 flex w-full flex-wrap items-center gap-x-7 gap-y-2 sm:order-none sm:w-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="eyebrow text-ink transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/charter"
          className="btn-primary px-5 py-2.5 text-[11px]"
        >
          Request access
        </Link>
      </nav>
    </header>
  );
}
