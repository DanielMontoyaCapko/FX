import Header from "@/components/header";
import Footer from "@/components/footer";
import VideoBackground from "@/components/video-background";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function AvisoLegal() {
  useScrollToTop();
  
  return (
    <div className="min-h-screen text-white relative">
      <VideoBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
                  <span className="text-green">Aviso Legal</span>
                </h1>
              </div>
              
              <div className="bg-black/70 rounded-2xl border border-silver-500/20 p-8 md:p-12">
                <div className="prose prose-invert max-w-none">
                  <p className="text-silver-100 mb-6">
                    Este sitio es propiedad de <strong className="text-white">Nakama&Partners</strong>
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-white font-semibold mb-4">Información de la Empresa</h3>
                    <div className="space-y-2 text-silver-100">
                      <p><strong className="text-white">Representante:</strong> Raúl Igual</p>
                      <p><strong className="text-white">Registration name:</strong> DSP FZCO 44524</p>
                      <p><strong className="text-white">Domicilio:</strong> Dubai Integrated economic Zones Authority</p>
                      <p><strong className="text-white">Premise No:</strong> DSO-IFZA</p>
                      <p><strong className="text-white">Building name:</strong> IFZA properties</p>
                      <p><strong className="text-white">Area name:</strong> Dubai Silicon Oasis</p>
                      <p><strong className="text-white">Correo electrónico:</strong> <a href="mailto:dpo@nakamapartners.com" className="text-green hover:text-green/80 transition-colors">dpo@nakamapartners.com</a></p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-silver-100">
                      El objetivo de la empresa es el desarrollo de su objeto social expresado en los estatutos de su constitución.
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-white font-semibold mb-4">Políticas Relacionadas</h3>
                    <p className="text-silver-100 mb-4">Para más información puede consultar las siguientes políticas fijadas por la empresa:</p>
                    <ul className="space-y-2 text-silver-100">
                      <li>• Política de Uso</li>
                      <li>• Política de Seguridad</li>
                      <li>• Política de Protección de datos (información básica)</li>
                      <li>• Política de Protección de datos (más información)</li>
                      <li>• Política de Cookies</li>
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-white font-semibold mb-4">Delegado de Protección de Datos</h3>
                    <p className="text-silver-100">
                      Asimismo, tenemos designado y comunicado ante la AEPD el nombramiento de un delegado de protección de datos con el que podrá comunicarse en cualquier momento en el correo-e que figura más abajo.
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-silver-100">
                      <strong className="text-white">Fecha de actualización:</strong> 15/10/2024
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-silver-100">
                      Para más información puede dirigirse a: <a href="mailto:dpo@nakamapartners.com" className="text-green hover:text-green/80 transition-colors">dpo@nakamapartners.com</a>
                    </p>
                  </div>
                  
                  <div className="border-t border-silver-500/20 pt-6">
                    <p className="text-silver-100 text-center">
                      <strong className="text-white">Copyright Nakama&Partners</strong> - Todos los derechos reservados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}