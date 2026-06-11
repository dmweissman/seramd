import type { Metadata } from "next";

export const metadata: Metadata = { title: "Partnerships" };

export default function PartnershipsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="eyebrow text-accent">Partnerships</p>
      <h1 className="display mt-6 max-w-[12em] text-[44px] md:text-[64px]">
        Built with partners.
      </h1>
      <p className="lede mt-8">
        Pharmacy, physician, research, and capital partnerships. This page is
        built in Phase 3.
      </p>
    </section>
  );
}
