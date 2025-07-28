import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import VideoBackground from "@/components/video-background";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function AvisoLegal() {
  useScrollToTop();
  const [, setLocation] = useLocation();

  const goBack = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen text-white relative">
      <VideoBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-32 pb-16">
          <section className="py-6 bg-transparent">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <Button 
                    onClick={goBack}
                    variant="outline"
                    className="mb-6 border-green text-green hover:bg-green hover:text-black"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                  </Button>
                  
                  <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
                    <span className="text-green">Aviso Legal</span>
                  </h1>
                </div>

                <div className="legal-content-card bg-black/70 rounded-2xl border border-silver-500/20 p-8 transition-all duration-500">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-xl text-silver-100 mb-8">
                      Este sitio es propiedad de <strong className="text-white">Nakama&Partners</strong>
                    </p>

                    <div className="space-y-6 text-silver-100">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Información de la Empresa</h3>
                        <p><strong>Representante:</strong> Raúl Igual</p>
                        <p><strong>Registration name:</strong> DSP FZCO 44524</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Domicilio</h3>
                        <p>Dubai Integrated Economic Zones Authority</p>
                        <p><strong>Premise No:</strong> DSO-IFZA</p>
                        <p><strong>Building name:</strong> IFZA properties</p>
                        <p><strong>Area name:</strong> Dubai Silicon Oasis</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Contacto</h3>
                        <p><strong>Correo electrónico:</strong> <a href="mailto:dpo@nakamapartners.com" className="text-green hover:text-green/80 transition-colors">dpo@nakamapartners.com</a></p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Objeto Social</h3>
                        <p>El objetivo de la empresa es el desarrollo de su objeto social expresado en los estatutos de su constitución.</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Políticas de la Empresa</h3>
                        <p className="mb-4">Para más información puede consultar las siguientes políticas fijadas por la empresa:</p>
                        <ul className="space-y-2 list-disc list-inside ml-4">
                          <li><a href="#" className="text-green hover:text-green/80 transition-colors">Política de Uso</a></li>
                          <li><a href="#" className="text-green hover:text-green/80 transition-colors">Política de Seguridad</a></li>
                          <li><a href="#" className="text-green hover:text-green/80 transition-colors">Política de Protección de datos (información básica)</a></li>
                          <li><a href="#" className="text-green hover:text-green/80 transition-colors">Política de Protección de datos (más información)</a></li>
                          <li><a href="#" className="text-green hover:text-green/80 transition-colors">Política de Cookies</a></li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Delegado de Protección de Datos</h3>
                        <p>Asimismo, tenemos designado y comunicado ante la AEPD el nombramiento de un delegado de protección de datos con el que podrá comunicarse en cualquier momento en el correo-e que figura más abajo.</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Información Adicional</h3>
                        <p><strong>Fecha de actualización:</strong> 15/10/2024</p>
                        <p>Para más información puede dirigirse a: <a href="mailto:dpo@nakamapartners.com" className="text-green hover:text-green/80 transition-colors">dpo@nakamapartners.com</a></p>
                      </div>

                      <div className="border-t border-silver-500/20 pt-6 mt-8">
                        <p className="text-center text-sm">
                          <strong>Copyright Nakama&Partners</strong> - Todos los derechos reservados.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}