import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      
      {/* Overview sections for home page */}
      <section className="py-20 gradient-dark-subtle">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-black/50 p-8 rounded-xl border border-silver-500/20 text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gold font-bold text-2xl">9%</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-white mb-3">Rentabilidad Fija</h3>
              <p className="text-silver-100">Sin volatilidad, sin sorpresas. Un 9% anual garantizado por contrato bancario pignorado.</p>
            </div>
            
            <div className="bg-black/50 p-8 rounded-xl border border-silver-500/20 text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gold font-bold text-2xl">0%</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-white mb-3">Riesgo de Mercado</h3>
              <p className="text-silver-100">Capital protegido mediante estructuras bancarias sin exposición a volatilidad de mercado.</p>
            </div>
            
            <div className="bg-black/50 p-8 rounded-xl border border-silver-500/20 text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gold font-bold text-2xl">100%</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-white mb-3">Transparencia</h3>
              <p className="text-silver-100">Contratos auditados, custodia bancaria y firma digital con validez jurídica internacional.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
