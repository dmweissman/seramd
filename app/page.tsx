import Link from "next/link";
import SpecimenCard from "@/components/SpecimenCard";

export default function HomePage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-[7fr_5fr] md:items-center md:py-28">
      <div>
        <p className="eyebrow fade-up text-accent">
          Personalized peptide medicine
        </p>
        <h1 className="display fade-up fade-up-delay-1 mt-6 text-[56px] md:text-[84px]">
          Medicine, <em>calibrated to you.</em>
        </h1>
        <p className="lede fade-up fade-up-delay-2 mt-8">
          Physician-prescribed peptide protocols, personalized to your
          bloodwork and re-evaluated on a 90-day clinical cycle.
        </p>
        <div className="fade-up fade-up-delay-2 mt-10">
          <Link href="/charter" className="btn-primary">
            Request charter access
          </Link>
        </div>
      </div>

      <div className="fade-up fade-up-delay-2">
        <SpecimenCard />
      </div>
    </section>
  );
}
