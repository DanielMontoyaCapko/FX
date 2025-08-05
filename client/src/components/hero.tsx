import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import fabLogo from "@/assets/First_Abu_Dhabi_Bank_Logo.svg_1754393272813.png";
import adcbLogo from "@/assets/ADCB_1754393272814.png";
import emiratesNbdLogo from "@/assets/EMIRATESNBD_1754393272815.png";

export default function Hero() {
  const [, setLocation] = useLocation();
  
  const goToContact = () => {
    setLocation("/contacto");
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 text-shadow">
          <span className="text-green">9% Fijo Anual.</span><br />
          Capital Protegido por<br />
          Contrato Bancario Pignorado.
        </h1>
        
        <p className="text-xl md:text-2xl text-silver-100 mb-8 max-w-4xl mx-auto leading-relaxed">
          Producto exclusivo para perfiles conservadores, sin exposición al mercado. 
          Gestionado con estructuras bancarias, firmado digitalmente y auditado legalmente.
        </p>
        
        <Button 
          onClick={goToContact}
          className="bg-green text-black px-12 py-4 text-xl font-bold hover:bg-green/90 transition-colors shadow-xl h-auto"
        >
          Quiero más información
        </Button>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-black/30 border border-transparent transition-all duration-300 hover:border-green-500 hover:bg-black/50 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
            <div className="text-3xl font-bold text-green mb-2">9%</div>
            <div className="text-silver-100">Rentabilidad Fija Anual</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-black/30 border border-transparent transition-all duration-300 hover:border-green-500 hover:bg-black/50 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
            <div className="text-3xl font-bold text-green mb-2">100%</div>
            <div className="text-silver-100">Capital Protegido</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-black/30 border border-transparent transition-all duration-300 hover:border-green-500 hover:bg-black/50 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
            <div className="text-3xl font-bold text-green mb-2">0%</div>
            <div className="text-silver-100">Exposición al Mercado</div>
          </div>
        </div>

        {/* Bank Partners Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-white mb-4">Respaldados por</h3>
            <p className="text-silver-100">Instituciones financieras de primera línea garantizan la seguridad de tu inversión</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
            <div className="bg-white/95 rounded-xl p-6 w-full max-w-xs flex items-center justify-center h-24 hover:bg-white transition-colors shadow-lg">
              <img 
                src={fabLogo} 
                alt="First Abu Dhabi Bank" 
                className="max-h-16 w-auto object-contain"
              />
            </div>
            
            <div className="bg-white/95 rounded-xl p-6 w-full max-w-xs flex items-center justify-center h-24 hover:bg-white transition-colors shadow-lg">
              <img 
                src={adcbLogo} 
                alt="Abu Dhabi Commercial Bank" 
                className="max-h-16 w-auto object-contain"
              />
            </div>
            
            <div className="bg-white/95 rounded-xl p-6 w-full max-w-xs flex items-center justify-center h-24 hover:bg-white transition-colors shadow-lg">
              <img 
                src={emiratesNbdLogo} 
                alt="Emirates NBD" 
                className="max-h-16 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
