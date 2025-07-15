import Header from "@/components/header";
import Strategy from "@/components/strategy";
import Comparison from "@/components/comparison";
import Process from "@/components/process";
import Footer from "@/components/footer";
import VideoBackground from "@/components/video-background";

export default function Inversiones() {
  return (
    <div className="min-h-screen text-white relative">
      <VideoBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-32">
        <Strategy />
        <Process />
        <Comparison />
      </main>
      <Footer />
      </div>
    </div>
  );
}