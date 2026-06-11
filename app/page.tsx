import Link from "next/link";
import ProcessSteps from "@/components/ProcessSteps";
import PullQuote from "@/components/PullQuote";
import SpecimenCard from "@/components/SpecimenCard";
import TrustStrip from "@/components/TrustStrip";
import WaitlistForm from "@/components/forms/WaitlistForm";

const steps = [
  {
    num: "01",
    tag: "Bloodwork",
    title: "Biomarker panel",
    body: "Comprehensive bloodwork drawn at home or at a national lab to understand your biology.",
  },
  {
    num: "02",
    tag: "Review",
    title: "Physician review",
    body: "A US-licensed physician reviews your biomarkers, intake, and clinical history.",
  },
  {
    num: "03",
    tag: "Protocol",
    title: "Calibrated protocol",
    body: "If appropriate, a protocol is calibrated to your biology and prescribed by your physician.",
  },
  {
    num: "04",
    tag: "Delivered",
    title: "Compounded and shipped",
    body: "Your prescription is filled by an audited 503A pharmacy and re-evaluated on a 90-day cycle.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-hairline">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-28">
          <div>
            <p className="eyebrow fade-up text-accent">
              Personalized peptide medicine
            </p>
            <h1 className="display fade-up fade-up-delay-1 mt-7 max-w-[12ch] text-[50px] md:text-[84px] lg:text-[96px]">
              Medicine, calibrated <em>to you.</em>
            </h1>
            <p className="lede fade-up fade-up-delay-2 mt-7">
              Verified peptide medicine, personalized to your biomarkers and
              guided by US-licensed physicians.
            </p>
            <div className="fade-up fade-up-delay-2 mt-10">
              <Link href="/charter" className="btn-primary">
                Request charter access
              </Link>
            </div>
            <p className="fade-up fade-up-delay-2 mt-5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
              Founding cohort forming · Limited early access
            </p>
          </div>
          <div className="fade-up fade-up-delay-2">
            <SpecimenCard />
          </div>
        </div>
      </section>

      {/* Thesis */}
      <section className="border-b border-hairline bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <PullQuote>
            The future of medicine isn&apos;t generalized for the average
            patient — it&apos;s <em className="text-accent">calibrated to the
            individual.</em>
          </PullQuote>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <header className="max-w-[700px]">
            <p className="eyebrow text-accent">How it works</p>
            <h2 className="display mt-5 text-[36px] md:text-[52px]">
              From biomarkers <em>to protocol.</em>
            </h2>
            <p className="mt-5 max-w-[44em] text-[16px] leading-[1.6] text-muted">
              A supervised path from biomarker review to a clinically decided
              protocol.
            </p>
          </header>
          <div className="mt-14">
            <ProcessSteps steps={steps} />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <TrustStrip />
        </div>
      </section>

      {/* For partners */}
      <section className="border-b border-hairline bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-x-16 gap-y-8 px-6 py-16 md:py-20">
          <div className="max-w-[44em]">
            <p className="eyebrow text-accent">For partners</p>
            <h2 className="display mt-5 text-[32px] md:text-[44px]">
              Building the network <em>behind better care.</em>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.6] text-muted">
              We&apos;re assembling a trusted network of clinicians, 503A
              compounding pharmacies, diagnostic labs, and strategic investors
              to help shape a better standard for personalized medicine.
            </p>
          </div>
          <Link
            href="/partnerships"
            className="eyebrow text-ink transition-colors hover:text-accent"
          >
            Partner with SeraMD →
          </Link>
        </div>
      </section>

      {/* Charter CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
          <p className="eyebrow text-accent">Charter list</p>
          <h2 className="display mx-auto mt-6 max-w-[14ch] text-[44px] md:text-[64px]">
            Request <em>charter access.</em>
          </h2>
          <p className="lede mx-auto mt-6">
            Limited charter access · SeraMD launches by invitation. Join the
            founding list to be considered for early access as SeraMD comes
            online.
          </p>
          <div className="mt-10">
            <WaitlistForm source="home-waitlist" center />
          </div>
          <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
            Founding cohort forming
          </p>
        </div>
      </section>
    </>
  );
}
