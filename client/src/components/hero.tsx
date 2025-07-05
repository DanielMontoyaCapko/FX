import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="min-h-screen gradient-dark flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 text-shadow">
          <span className="text-gold">9% Fijo Anual.</span><br />
          Capital Protegido por<br />
          Contrato Bancario Pignorado.
        </h1>
        
        <p className="text-xl md:text-2xl text-silver-100 mb-8 max-w-4xl mx-auto leading-relaxed">
          Producto exclusivo para perfiles conservadores, sin exposición al mercado. 
          Gestionado con estructuras bancarias, firmado digitalmente y auditado legalmente.
        </p>
        
        <Button 
          onClick={scrollToContact}
          className="bg-gold text-black px-12 py-4 text-xl font-bold hover:bg-gold/90 transition-colors shadow-xl h-auto"
        >
          Quiero más información
        </Button>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">9%</div>
            <div className="text-silver-100">Rentabilidad Fija Anual</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">100%</div>
            <div className="text-silver-100">Capital Protegido</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">0%</div>
            <div className="text-silver-100">Exposición al Mercado</div>
          </div>
        </div>
      </div>
    </section>
  );
}
