import Header from "@/components/header";
import Downloads from "@/components/downloads";
import Advisors from "@/components/advisors";
import FinalCTA from "@/components/final-cta";
import Footer from "@/components/footer";

import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function Contacto() {
  useScrollToTop();
  return (
    <div className={[
      "min-h-screen text-white relative",
      "bg-gradient-to-br from-black via-[#0A1713] to-[#0E2A1F]",
      "before:pointer-events-none before:absolute before:inset-0",
      "before:bg-[radial-gradient(80%_60%_at_110%_-10%,rgba(16,185,129,0.18),transparent),radial-gradient(60%_40%_at_-20%_110%,rgba(16,185,129,0.12),transparent)]",
    ].join(" ")}>
      <div className="relative z-10">
        <Header />
        <main className="pt-32">
        <section className="py-6 bg-transparent">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h1 className="font-georgia text-5xl md:text-6xl font-bold text-white mb-6">
                <span className="text-green">Contacto</span>
              </h1>
              <p className="text-xl text-silver-100 max-w-3xl mx-auto">
                Estamos aquí para resolver sus dudas y ayudarle a proteger su patrimonio.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-10 bg-transparent">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="contact-info-card bg-black/70 p-8 rounded-xl border border-silver-500/20 transition-all duration-500 hover:border-green/40 cursor-pointer">
                  <h2 className="font-georgia text-3xl font-bold text-white mb-6">Información de Contacto</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-white mb-2">Email Principal</h3>
                      <p className="text-silver-100">info@nakamapartners.com</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-white mb-2">Teléfono</h3>
                      <p className="text-silver-100">+34 XXX XXX XXX</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-white mb-2">Consultas Legales</h3>
                      <p className="text-silver-100">legal@nakamapartners.com</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-white mb-2">Horario de Atención</h3>
                      <p className="text-silver-100">Lunes a Viernes: 9:00 - 18:00 CET</p>
                    </div>
                  </div>
                </div>
                
                <div className="contact-offices-card bg-black/70 p-8 rounded-xl border border-silver-500/20 transition-all duration-500 hover:border-green/40 cursor-pointer">
                  <h2 className="font-georgia text-3xl font-bold text-white mb-6">Oficinas</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-white mb-2">Oficina Principal</h3>
                      <p className="text-silver-100">
                        Paseo de la Castellana, 123<br />
                        28046 Madrid, España
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-white mb-2">Oficina Internacional</h3>
                      <p className="text-silver-100">
                        Dubai International Financial Centre<br />
                        Dubai, Emiratos Árabes Unidos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Downloads />
        <Advisors />
        <FinalCTA />
      </main>
      <Footer />
      </div>
    </div>
  );
}