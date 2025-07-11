import Header from "@/components/header";
import Calculator from "@/components/calculator";
import Footer from "@/components/footer";

export default function Calculadora() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-600 text-white">
      <Header />
      <main className="pt-20">
        <section className="py-20 gradient-dark">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
                <span className="text-gold">Calculadora</span> de Rentabilidad
              </h1>
              <p className="text-xl text-silver-100 max-w-3xl mx-auto">
                Descubre cuánto podrías ganar con nuestro 9% fijo anual. Calcula tu rentabilidad de manera interactiva.
              </p>
            </div>
          </div>
        </section>
        
        <Calculator />
        
        <section className="py-20 gradient-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl font-bold text-white mb-8 text-center">
                ¿Qué Pasa al Final del Plazo?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black/50 p-6 rounded-xl border border-silver-500/20 text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gold font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-white mb-3">Retirar Capital</h3>
                  <p className="text-silver-100">Retire su capital inicial más los intereses generados.</p>
                </div>
                
                <div className="bg-black/50 p-6 rounded-xl border border-silver-500/20 text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gold font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-white mb-3">Renovar</h3>
                  <p className="text-silver-100">Renueve su inversión con condiciones preferentes.</p>
                </div>
                
                <div className="bg-black/50 p-6 rounded-xl border border-silver-500/20 text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gold font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-white mb-3">Interés Compuesto</h3>
                  <p className="text-silver-100">Aplique interés compuesto para maximizar el crecimiento.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}