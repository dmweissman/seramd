import Link from "next/link";

const links = [
  { href: "/clinical", label: "Clinical" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/company", label: "Company" },
];

export default function Nav() {
  return (
    <header className="border-b border-hairline">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-6 py-5"
      >
        <Link href="/" className="font-display text-2xl leading-none">
          SeraMD
        </Link>
        <div className="flex flex-wrap items-baseline gap-x-7 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="eyebrow text-ink transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/charter"
            className="eyebrow text-accent transition-colors hover:text-ink"
          >
            Charter Access
          </Link>
        </div>
      </nav>
    </header>
  );
}
