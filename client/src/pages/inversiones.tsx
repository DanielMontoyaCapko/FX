import Header from "@/components/header";
import Strategy from "@/components/strategy";
import Comparison from "@/components/comparison";
import Process from "@/components/process";
import Footer from "@/components/footer";

export default function Inversiones() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-600 text-white">
      <Header />
      <main className="pt-20">
        <section className="py-10 bg-transparent">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
                Nuestras <span className="text-gold">Inversiones</span>
              </h1>
              <p className="text-xl text-silver-100 max-w-3xl mx-auto">
                Descubra cómo conseguimos el 9% fijo anual y qué pasa al final del plazo.
              </p>
            </div>
          </div>
        </section>
        <Strategy />
        <Process />
        <Comparison />
      </main>
      <Footer />
    </div>
  );
}