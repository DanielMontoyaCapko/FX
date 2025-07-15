import Header from "@/components/header";
import Story from "@/components/story";
import Footer from "@/components/footer";
import VideoBackground from "@/components/video-background";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function Nosotros() {
  useScrollToTop();
  return (
    <div className="min-h-screen text-white relative">
      <VideoBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-32">
        <section className="py-6 bg-transparent">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
                Sobre <span className="text-gold">Nosotros</span>
              </h1>
              <p className="text-xl text-silver-100 max-w-3xl mx-auto">
                Conozca la historia detrás de Nakama&Partners y nuestro compromiso con la protección patrimonial.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-10 bg-transparent">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div className="bg-black/70 p-8 rounded-xl border border-silver-500/20">
                  <h2 className="font-playfair text-3xl font-bold text-white mb-6">Nuestra Misión</h2>
                  <p className="text-silver-100 leading-relaxed">
                    Proteger y hacer crecer el patrimonio de nuestros clientes mediante estructuras 
                    financieras sólidas, transparentes y legalmente blindadas. Ofrecemos tranquilidad 
                    en un mundo financiero lleno de incertidumbre.
                  </p>
                </div>
                
                <div className="bg-black/70 p-8 rounded-xl border border-silver-500/20">
                  <h2 className="font-playfair text-3xl font-bold text-white mb-6">Nuestra Visión</h2>
                  <p className="text-silver-100 leading-relaxed">
                    Ser la referencia en inversiones conservadoras, donde la seguridad del capital 
                    es prioritaria y la rentabilidad es constante y predecible. Construimos relaciones 
                    de confianza duraderas.
                  </p>
                </div>
              </div>
              
              <div className="bg-black/70 p-8 rounded-xl border border-silver-500/20 mb-16">
                <h2 className="font-playfair text-3xl font-bold text-white mb-6 text-center">Nuestros Valores</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gold font-bold text-xl">T</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Transparencia</h3>
                    <p className="text-silver-100 text-sm">Información clara y accesible en cada paso del proceso.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gold font-bold text-xl">S</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Seguridad</h3>
                    <p className="text-silver-100 text-sm">Protección del capital como prioridad absoluta.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gold font-bold text-xl">E</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Excelencia</h3>
                    <p className="text-silver-100 text-sm">Compromiso con la calidad en cada detalle.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Story />
      </main>
      <Footer />
      </div>
    </div>
  );
}