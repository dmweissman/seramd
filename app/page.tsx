import Difference from "@/components/Difference";
import Footer from "@/components/Footer";
import FoundingAccessForm from "@/components/FoundingAccessForm";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Model from "@/components/Model";
import Technology from "@/components/Technology";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Difference />
        <Technology />
        <Model />
        <FoundingAccessForm />
      </main>
      <Footer />
    </>
  );
}
