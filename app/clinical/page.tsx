import type { Metadata } from "next";

export const metadata: Metadata = { title: "Clinical" };

export default function ClinicalPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="eyebrow text-accent">Clinical</p>
      <h1 className="display mt-6 max-w-[12em] text-[44px] md:text-[64px]">
        The clinical model.
      </h1>
      <p className="lede mt-8">
        Lab verification, physician oversight, and bloodwork-calibrated
        protocols. This page is built in Phase 3.
      </p>
    </section>
  );
}
