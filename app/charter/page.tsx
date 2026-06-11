import type { Metadata } from "next";

export const metadata: Metadata = { title: "Charter Access" };

export default function CharterPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="eyebrow text-accent">Charter Access</p>
      <h1 className="display mt-6 max-w-[12em] text-[44px] md:text-[64px]">
        The charter list.
      </h1>
      <p className="lede mt-8">
        SeraMD opens with a limited charter group. The intake form is wired in
        a later phase of the build.
      </p>
    </section>
  );
}
