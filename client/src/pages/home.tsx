import Header from "@/components/header";
import Hero from "@/components/hero";
import Security from "@/components/security";
import Downloads from "@/components/downloads";
import FinalCTA from "@/components/final-cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-600 text-white">
      <Header />
      <Hero />
      <Security />
      <Downloads />
      <FinalCTA />
      <Footer />
    </div>
  );
}
