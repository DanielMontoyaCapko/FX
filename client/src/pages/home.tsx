import Header from "@/components/header";
import Hero from "@/components/hero";
import Security from "@/components/security";
import Strategy from "@/components/strategy";
import Calculator from "@/components/calculator";
import Comparison from "@/components/comparison";
import Process from "@/components/process";
import Downloads from "@/components/downloads";
import Advisors from "@/components/advisors";
import Story from "@/components/story";
import FinalCTA from "@/components/final-cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <Security />
      <Strategy />
      <Calculator />
      <Comparison />
      <Process />
      <Downloads />
      <Advisors />
      <Story />
      <FinalCTA />
      <Footer />
    </div>
  );
}
