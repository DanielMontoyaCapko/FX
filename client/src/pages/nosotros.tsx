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
                Sobre <span className="text-green">Nosotros</span>
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
              
              <div className="mb-8">
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-8 text-center">Nuestros Valores</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Transparencia */}
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="flip-card-letter">T</div>
                      </div>
                      <div className="flip-card-back">
                        <div className="flip-card-title">Transparencia</div>
                        <div className="flip-card-description">
                          Información clara y accesible en cada paso del proceso. 
                          Nuestros clientes conocen exactamente cómo funciona su inversión, 
                          sin letra pequeña ni sorpresas.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seguridad */}
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="flip-card-letter">S</div>
                      </div>
                      <div className="flip-card-back">
                        <div className="flip-card-title">Seguridad</div>
                        <div className="flip-card-description">
                          Protección del capital como prioridad absoluta. 
                          Estructuras bancarias sólidas y contratos pignorados 
                          garantizan la seguridad de cada inversión.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Excelencia */}
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <div className="flip-card-letter">E</div>
                      </div>
                      <div className="flip-card-back">
                        <div className="flip-card-title">Excelencia</div>
                        <div className="flip-card-description">
                          Compromiso con la calidad en cada detalle. 
                          Desde el primer contacto hasta el seguimiento continuo, 
                          buscamos la perfección en cada interacción.
                        </div>
                      </div>
                    </div>
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