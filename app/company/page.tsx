import type { Metadata } from "next";

export const metadata: Metadata = { title: "Company" };

export default function CompanyPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="eyebrow text-accent">Company</p>
      <h1 className="display mt-6 max-w-[12em] text-[44px] md:text-[64px]">
        Why SeraMD exists.
      </h1>
      <p className="lede mt-8">
        The team, the thesis, and the operating standards. This page is built
        in Phase 3.
      </p>
    </section>
  );
}
