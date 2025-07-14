import { Button } from "@/components/ui/button";
import { Handshake, CheckCircle, ShieldQuestion, Star, Users } from "lucide-react";
import { useLocation } from "wouter";

export default function Advisors() {
  const benefits = [
    {
      icon: Handshake,
      title: "Comisiones Justas",
      description: "Sin presión, con transparencia total"
    },
    {
      icon: CheckCircle,
      title: "Proceso Simple",
      description: "100% legal y documentado"
    },
    {
      icon: ShieldQuestion,
      title: "Soporte Personalizado",
      description: "Marca seria detrás del producto"
    },
    {
      icon: Star,
      title: "Consolida Reputación",
      description: "Ayuda a fortalecer tu imagen profesional"
    }
  ];

  const [, setLocation] = useLocation();
  
  const goToContact = () => {
    setLocation("/contacto");
  };

  return (
    <section id="asesores" className="py-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Asesor Financiero: <span className="text-gold">Un Producto Sólido</span>,<br />
            Fácil de Explicar, Imposible de Ignorar
          </h2>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <benefit.icon className="text-2xl text-gold w-8 h-8" />
                </div>
                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-silver-100 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
          
          {/* Testimonial */}
          <div className="bg-black/70 rounded-2xl border border-silver-500/20 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="text-3xl text-gold w-12 h-12" />
              </div>
              <div className="text-center md:text-left">
                <blockquote className="text-lg text-silver-100 mb-4 italic">
                  "Por fin puedo ofrecer algo que protege de verdad el patrimonio de mis clientes. 
                  La tranquilidad que transmite Nakama&Partners es invaluable para consolidar 
                  relaciones a largo plazo."
                </blockquote>
                <cite className="text-white font-semibold">— Luis M., Asesor Patrimonial y Coach Financiero</cite>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={goToContact}
              className="gradient-navy px-8 py-4 text-white font-semibold hover:opacity-90 h-auto"
            >
              Quiero más información
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
