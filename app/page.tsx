import BrandStatement from "@/components/BrandStatement";
import Capabilities from "@/components/Capabilities";
import Disciplines from "@/components/Disciplines";
import Footer from "@/components/Footer";
import FoundingAccessForm from "@/components/FoundingAccessForm";
import GlobalStandard from "@/components/GlobalStandard";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InstituteIntroduction from "@/components/InstituteIntroduction";
import Location from "@/components/Location";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <InstituteIntroduction />
        <Disciplines />
        <Capabilities />
        <GlobalStandard />
        <BrandStatement />
        <Location />
        <FoundingAccessForm />
      </main>
      <Footer />
    </>
  );
}
