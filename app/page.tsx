import Link from "next/link";
import SpecimenCard from "@/components/SpecimenCard";

export default function HomePage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-[7fr_5fr] md:items-center md:py-28">
      <div>
        <p className="eyebrow fade-up text-accent">
          Phase 1 Scaffold · Full home page arrives in Phase 2
        </p>
        <h1 className="display fade-up fade-up-delay-1 mt-6 text-[56px] md:text-[84px]">
          Peptide medicine, <em>without the guesswork.</em>
        </h1>
        <p className="lede fade-up fade-up-delay-2 mt-8">
          Every batch independently lab-verified. Every protocol overseen by
          US physicians. Every plan calibrated to your bloodwork.
        </p>
        <div className="fade-up fade-up-delay-2 mt-10">
          <Link href="/charter" className="btn-primary">
            Request Charter Access
          </Link>
        </div>
      </div>

      <div className="fade-up fade-up-delay-2">
        <SpecimenCard />
      </div>
    </section>
  );
}
