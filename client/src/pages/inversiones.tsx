import Header from "@/components/header";
import Security from "@/components/security";
import Strategy from "@/components/strategy";
import Comparison from "@/components/comparison";
import Process from "@/components/process";
import Footer from "@/components/footer";

export default function Inversiones() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-20">
        <section className="py-20 gradient-dark">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
                Nuestras <span className="text-gold">Inversiones</span>
              </h1>
              <p className="text-xl text-silver-100 max-w-3xl mx-auto">
                Descubra cómo protegemos y hacemos crecer su patrimonio con estrategias sólidas y transparentes.
              </p>
            </div>
          </div>
        </section>
        <Security />
        <Strategy />
        <Comparison />
        <Process />
      </main>
      <Footer />
    </div>
  );
}