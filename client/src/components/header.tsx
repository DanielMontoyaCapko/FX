import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const showContactForm = () => {
    scrollToSection("contacto");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 gradient-dark-subtle border-b border-silver-500/20">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xl">FX</span>
          </div>
          <span className="font-playfair text-xl font-semibold text-white">FundedXam Capital</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection("inicio")} 
            className="text-silver-100 hover:text-gold transition-colors"
          >
            Inicio
          </button>
          <button 
            onClick={() => scrollToSection("producto")} 
            className="text-silver-100 hover:text-gold transition-colors"
          >
            Producto
          </button>
          <button 
            onClick={() => scrollToSection("seguridad")} 
            className="text-silver-100 hover:text-gold transition-colors"
          >
            Seguridad
          </button>
          <button 
            onClick={() => scrollToSection("asesores")} 
            className="text-silver-100 hover:text-gold transition-colors"
          >
            Asesores
          </button>
          <button 
            onClick={() => scrollToSection("nosotros")} 
            className="text-silver-100 hover:text-gold transition-colors"
          >
            Nosotros
          </button>
          <button 
            onClick={() => scrollToSection("contacto")} 
            className="text-silver-100 hover:text-gold transition-colors"
          >
            Contacto
          </button>
        </div>
        
        <Button 
          onClick={showContactForm}
          className="hidden md:block gradient-navy px-6 py-3 text-white font-semibold hover:opacity-90"
        >
          Quiero más información
        </Button>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black border-silver-500/20">
            <div className="flex flex-col space-y-6 mt-8">
              <button 
                onClick={() => scrollToSection("inicio")} 
                className="text-left text-silver-100 hover:text-gold transition-colors"
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection("producto")} 
                className="text-left text-silver-100 hover:text-gold transition-colors"
              >
                Producto
              </button>
              <button 
                onClick={() => scrollToSection("seguridad")} 
                className="text-left text-silver-100 hover:text-gold transition-colors"
              >
                Seguridad
              </button>
              <button 
                onClick={() => scrollToSection("asesores")} 
                className="text-left text-silver-100 hover:text-gold transition-colors"
              >
                Asesores
              </button>
              <button 
                onClick={() => scrollToSection("nosotros")} 
                className="text-left text-silver-100 hover:text-gold transition-colors"
              >
                Nosotros
              </button>
              <button 
                onClick={() => scrollToSection("contacto")} 
                className="text-left text-silver-100 hover:text-gold transition-colors"
              >
                Contacto
              </button>
              <Button 
                onClick={showContactForm}
                className="gradient-navy text-white font-semibold hover:opacity-90"
              >
                Quiero más información
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
