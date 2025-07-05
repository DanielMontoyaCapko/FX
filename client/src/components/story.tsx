import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function Story() {
  const showFullVision = () => {
    // In a real implementation, this could open a modal or navigate to a detailed page
    console.log("Showing full vision");
  };

  return (
    <section id="nosotros" className="py-20 gradient-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Nuestra Historia, Nuestro <span className="text-gold">Compromiso</span>:<br />
              Proteger Tu Patrimonio
            </h2>
          </div>
          
          <div className="bg-black/50 rounded-2xl border border-silver-500/20 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                  "Esto nació para proteger nuestro propio patrimonio familiar."
                </h3>
                <p className="text-silver-100 mb-6 leading-relaxed">
                  Raúl (CEO) y su hijo Xavi crearon FundedXam Capital tras años de ver 
                  cómo el mercado vendía riesgo disfrazado de oportunidad. Ahora, ofrecen 
                  lo que desearon tener: una estructura blindada que pone la seguridad 
                  del capital por encima de todo.
                </p>
                <Button 
                  onClick={showFullVision}
                  className="gradient-navy px-6 py-3 text-white hover:opacity-90"
                >
                  Ver la visión completa
                </Button>
              </div>
              
              <div className="text-center">
                <div className="w-48 h-48 bg-gold/20 rounded-lg mx-auto flex items-center justify-center">
                  <Users className="text-6xl text-gold w-24 h-24" />
                </div>
                <p className="text-sm text-silver-100 mt-4">Raúl y Xavi - Fundadores de FundedXam Capital</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
