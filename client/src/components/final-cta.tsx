import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function FinalCTA() {
  const scheduleCalendly = () => {
    // In a real implementation, this would open Calendly widget
    console.log("Opening Calendly for scheduling");
  };

  return (
    <section id="contacto" className="py-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-georgia text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="block md:hidden">
              <span className="block max-w-[300px] mx-auto">¿Por qué constituir el</span>
              <span className="block max-w-[220px] mx-auto">depósito bancario en</span>
              <span className="block max-w-[120px] mx-auto"><span className="text-green">Dubai</span>?</span>
            </span>
            <span className="hidden md:block">
              ¿Por qué constituir el depósito bancario en <span className="text-green">Dubai</span>?
            </span>
          </h2>
        </div>
        
        {/* 9 tarjetas de beneficios de Dubai - Grid 3x3 */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tarjeta 1 - Plan Estratégico 2024 */}
            <div className="bg-black/70 p-6 rounded-xl border border-silver-500/20 hover:border-[#344e41] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#344e41]/20 cursor-pointer relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15"
                style={{ backgroundImage: `url(/attached_assets/planestrategico.webp)` }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#344e41]/30 mx-auto">
                  <span className="text-2xl font-bold text-green">1</span>
                </div>
                <h3 className="font-georgia text-xl font-semibold text-white mb-3 transition-colors duration-300 text-center">Plan Estratégico 2024</h3>
                <p className="text-silver-100 transition-colors duration-300 text-center text-sm">Existe planificación estratégica</p>
              </div>
            </div>

            {/* Tarjeta 2 - 10.000 Millonarios al Año */}
            <div className="bg-black/70 p-6 rounded-xl border border-silver-500/20 hover:border-[#344e41] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#344e41]/20 cursor-pointer relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15"
                style={{ backgroundImage: `url(/attached_assets/millonarios.jpg)` }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#344e41]/30 mx-auto">
                  <span className="text-2xl font-bold text-green">2</span>
                </div>
                <h3 className="font-georgia text-xl font-semibold text-white mb-3 transition-colors duration-300 text-center">10.000 Millonarios al Año</h3>
                <p className="text-silver-100 transition-colors duration-300 text-center text-sm">Protege el capital del inversor</p>
              </div>
            </div>

            {/* Tarjeta 3 - Banca AAA */}
            <div className="bg-black/70 p-6 rounded-xl border border-silver-500/20 hover:border-[#344e41] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#344e41]/20 cursor-pointer relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15"
                style={{ backgroundImage: `url(/attached_assets/AAA.jpeg)` }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#344e41]/30 mx-auto">
                  <span className="text-2xl font-bold text-green">3</span>
                </div>
                <h3 className="font-georgia text-xl font-semibold text-white mb-3 transition-colors duration-300 text-center">Banca AAA</h3>
                <p className="text-silver-100 transition-colors duration-300 text-center text-sm">Con cobertura del estado sobre los depósitos al 100%</p>
              </div>
            </div>

            {/* Tarjeta 4 - Ciudad que Más Crece */}
            <div className="bg-black/70 p-6 rounded-xl border border-silver-500/20 hover:border-[#344e41] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#344e41]/20 cursor-pointer relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15"
                style={{ backgroundImage: `url(/attached_assets/ciudadcrece.jpg)` }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#344e41]/30 mx-auto">
                  <span className="text-2xl font-bold text-green">4</span>
                </div>
                <h3 className="font-georgia text-xl font-semibold text-white mb-3 transition-colors duration-300 text-center">Ciudad que Más Crece</h3>
                <p className="text-silver-100 transition-colors duration-300 text-center text-sm">Es la ciudad que más crece del mundo</p>
              </div>
            </div>

            {/* Tarjeta 5 - Sector Inmobiliario */}
            <div className="bg-black/70 p-6 rounded-xl border border-silver-500/20 hover:border-[#344e41] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#344e41]/20 cursor-pointer relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15"
                style={{ backgroundImage: `url(/attached_assets/sectorinmobiliario.png)` }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#344e41]/30 mx-auto">
                  <span className="text-2xl font-bold text-green">5</span>
                </div>
                <h3 className="font-georgia text-xl font-semibold text-white mb-3 transition-colors duration-300 text-center">Sector Inmobiliario</h3>
                <p className="text-silver-100 transition-colors duration-300 text-center text-sm">El sector inmobiliario es el más rentable del mundo</p>
              </div>
            </div>

            {/* Tarjeta 6 - Criterios de Inversión */}
            <div className="bg-black/70 p-6 rounded-xl border border-silver-500/20 hover:border-[#344e41] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#344e41]/20 cursor-pointer relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15"
                style={{ backgroundImage: `url(/attached_assets/bancaprivada.jpg)` }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#344e41]/30 mx-auto">
                  <span className="text-2xl font-bold text-green">6</span>
                </div>
                <h3 className="font-georgia text-xl font-semibold text-white mb-3 transition-colors duration-300 text-center">Criterios de Inversión</h3>
                <p className="text-silver-100 transition-colors duration-300 text-center text-sm">La banca trabaja con criterios de inversión y no de avales</p>
              </div>
            </div>

            {/* Tarjeta 7 - Tratado de Doble Imposición */}
            <div className="bg-black/70 p-6 rounded-xl border border-silver-500/20 hover:border-[#344e41] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#344e41]/20 cursor-pointer relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15"
                style={{ backgroundImage: `url(/attached_assets/tratado.jpg)` }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#344e41]/30 mx-auto">
                  <span className="text-2xl font-bold text-green">7</span>
                </div>
                <h3 className="font-georgia text-xl font-semibold text-white mb-3 transition-colors duration-300 text-center">Tratado de Doble Imposición</h3>
                <p className="text-silver-100 transition-colors duration-300 text-center text-sm">Tratado de doble imposición</p>
              </div>
            </div>

            {/* Tarjeta 8 - Depósitos FIAT y Cripto */}
            <div className="bg-black/70 p-6 rounded-xl border border-silver-500/20 hover:border-[#344e41] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#344e41]/20 cursor-pointer relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15"
                style={{ backgroundImage: `url(/attached_assets/fiatycripto.jpeg)` }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#344e41]/30 mx-auto">
                  <span className="text-2xl font-bold text-green">8</span>
                </div>
                <h3 className="font-georgia text-xl font-semibold text-white mb-3 transition-colors duration-300 text-center">Depósitos FIAT y Cripto</h3>
                <p className="text-silver-100 transition-colors duration-300 text-center text-sm">Depósitos FIAT y Cripto</p>
              </div>
            </div>

            {/* Tarjeta 9 - Financiación Sin Justificación */}
            <div className="bg-black/70 p-6 rounded-xl border border-silver-500/20 hover:border-[#344e41] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#344e41]/20 cursor-pointer relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15"
                style={{ backgroundImage: `url(/attached_assets/financiacion.jpg)` }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green/20 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#344e41]/30 mx-auto">
                  <span className="text-2xl font-bold text-green">9</span>
                </div>
                <h3 className="font-georgia text-xl font-semibold text-white mb-3 transition-colors duration-300 text-center">Financiación Sin Justificación</h3>
                <p className="text-silver-100 transition-colors duration-300 text-center text-sm">Financiación sin justificación de aplicación de fondos</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-md mx-auto">
          <Button
            onClick={scheduleCalendly}
            className="w-full bg-[#3f8358] text-white py-6 px-8 font-semibold text-lg hover:bg-[#356f4a] transition-colors h-auto flex flex-col items-center space-y-2"
          >
            <Calendar className="text-xl w-6 h-6" />
            <span>Agendar reunión privada</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
