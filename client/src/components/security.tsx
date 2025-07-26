import { Shield, Percent, File, University, FileSignature, Search } from "lucide-react";

export default function Security() {
  const features = [
    {
      icon: Percent,
      title: "Rentabilidad Fija del 9%",
      description: "Sin volatilidad, sin sorpresas. Un 9% anual garantizado por contrato."
    },
    {
      icon: Shield,
      title: "Capital Bloqueado como Garantía",
      description: "Sin gestión directa del cliente. Su capital está protegido por estructura bancaria."
    },
    {
      icon: File,
      title: "Contrato Bancario Pignorado",
      description: "Revisado jurídicamente y avalado por estructuras bancarias de primer nivel."
    },
    {
      icon: University,
      title: "Custodia en Bancos de Primer Nivel",
      description: "Emirates NBD, WIO Bank. Instituciones financieras sólidas y reguladas."
    },
    {
      icon: FileSignature,
      title: "Firma Digital Jurídicamente Válida",
      description: "Validez jurídica internacional vía DocuSign® con trazabilidad completa."
    },
    {
      icon: Search,
      title: "Auditoría Externa y Trazabilidad",
      description: "Control total del proceso con auditoría externa y transparencia absoluta."
    }
  ];

  return (
    <section id="seguridad" className="py-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Un Producto Diseñado para <span className="text-gold">Proteger el Capital</span>,<br />
            No Para Arriesgarlo.
          </h2>
          <p className="text-xl text-silver-100 max-w-3xl mx-auto">
            Desde el primer contacto, mostramos que esto no es una promesa, es una estructura.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-black/70 p-8 rounded-xl border border-silver-500/20 hover:border-[#344e41] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#344e41]/20 cursor-pointer">
              <div className="w-16 h-16 bg-gold/20 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#344e41]/30">
                <feature.icon className="text-2xl text-gold w-8 h-8 transition-colors duration-300" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-white mb-4 transition-colors duration-300">{feature.title}</h3>
              <p className={`${index < 3 ? 'text-white' : 'text-silver-100'} transition-colors duration-300`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
