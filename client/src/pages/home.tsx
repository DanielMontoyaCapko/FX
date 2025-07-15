import Header from "@/components/header";
import Hero from "@/components/hero";
import Security from "@/components/security";
import Downloads from "@/components/downloads";
import FinalCTA from "@/components/final-cta";
import Footer from "@/components/footer";
import VideoBackground from "@/components/video-background";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function Home() {
  useScrollToTop();
  return (
    <div className="min-h-screen text-white relative">
      <VideoBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Security />
        <Downloads />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
