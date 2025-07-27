import { Building, TrendingUp, Coins, Link, Brain } from "lucide-react";
import GrowthChart from "./growth-chart";

export default function Strategy() {
  const strategies = [
    {
      icon: Building,
      title: "Real Estate Institucional en Dubái",
      description: "Alineado con el Plan Urbanístico 2040 (+30% crecimiento proyectado). Precio medio por m² aún 60-70% por debajo de Londres o Nueva York."
    },
    {
      icon: TrendingUp,
      title: "ETFs y Acciones de Asia Emergente",
      description: "Mercados sólidos con crecimiento estructural y baja correlación con Occidente."
    },
    {
      icon: Coins,
      title: "Materias Primas: Oro, Plata y Petróleo",
      description: "Valor refugio, cobertura frente a inflación y activos geopolíticos."
    },
    {
      icon: Link,
      title: "Activos Digitales Regulados",
      description: "RWA, Tokenización, DeFi. Participamos solo en infraestructuras legales y auditadas del sector blockchain."
    },
    {
      icon: Brain,
      title: "Trading Algorítmico Propio, Auditado",
      description: "Optimización de carteras con inteligencia artificial, basada en parámetros matemáticos y control de drawdown.",
      colSpan: true
    }
  ];

  return (
    <section id="producto" className="py-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Cómo Conseguimos el <span className="text-green">9% Fijo Anual</span>
          </h2>
          <p className="text-xl text-silver-100 max-w-3xl mx-auto">
            Una cartera permanente, sin improvisaciones. Nuestra rentabilidad no depende de predicciones, 
            sino de diversificación estructural:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {strategies.map((strategy, index) => (
            <div 
              key={index} 
              className={`bg-black/70 p-8 rounded-xl border border-silver-500/20 ${strategy.colSpan ? 'md:col-span-2' : ''}`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <strategy.icon className="text-green w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-white mb-3">{strategy.title}</h3>
                  <p className="text-silver-100">{strategy.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-silver-100 max-w-3xl mx-auto mb-12">
            Esta combinación permite garantizar el 9% sin comprometer el capital. 
            Todo bajo un modelo profesional, permanente y sin especulación.
          </p>
        </div>

        {/* Growth Chart */}
        <div className="max-w-4xl mx-auto mt-16">
          <GrowthChart 
            initialAmount={100000}
            years={10}
            rate={0.09}
            showTitle={true}
          />
        </div>
      </div>
    </section>
  );
}
