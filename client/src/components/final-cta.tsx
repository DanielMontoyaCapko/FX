import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";

export default function FinalCTA() {
  const scheduleCalendly = () => {
    // In a real implementation, this would open Calendly widget
    console.log("Opening Calendly for scheduling");
  };

  const downloadDossier = () => {
    const element = document.getElementById("downloads");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="contacto" className="py-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Quieres Formar Parte de una <span className="text-gold">Solución</span><br />
            que Realmente Protege?
          </h2>
        </div>
        
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button 
            onClick={scheduleCalendly}
            className="bg-gold text-black py-6 px-8 font-semibold text-lg hover:bg-gold/90 h-auto flex flex-col items-center space-y-2"
          >
            <Calendar className="text-xl w-6 h-6" />
            <span>Agendar reunión privada</span>
          </Button>
          
          <Button 
            onClick={downloadDossier}
            className="gradient-navy text-white py-6 px-8 font-semibold text-lg hover:opacity-90 h-auto flex flex-col items-center space-y-2"
          >
            <Download className="text-xl w-6 h-6" />
            <span>Descargar dossier completo</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
