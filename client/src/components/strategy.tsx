import { Building, TrendingUp, Coins, Link, Brain } from "lucide-react";
import GrowthChart from "./growth-chart";
import { StrategyCard } from "./animated-card";

export default function Strategy() {
  const strategies = [
    {
      icon: Building,
      title: "Real Estate Institucional en Dubái",
      description: "Alineado con el Plan Urbanístico 2040 (+30% crecimiento proyectado). Precio medio por m² aún 60-70% por debajo de Londres o Nueva York.",
      backContent: {
        details: [
          "Proyecto Vision 2040: 30% crecimiento proyectado",
          "Torre Khalifa, Dubai Mall, expo centers",
          "Precios 60-70% menores vs Londres/NY",
          "Mercado regulado y estable",
          "Liquidez internacional garantizada"
        ],
        callToAction: "Exposición: 25% del portfolio"
      }
    },
    {
      icon: TrendingUp,
      title: "ETFs y Acciones de Asia Emergente",
      description: "Mercados sólidos con crecimiento estructural y baja correlación con Occidente.",
      backContent: {
        details: [
          "India: crecimiento PIB 6-7% anual",
          "Vietnam: hub manufacturero asiático",
          "Indonesia: mercado consumo interno",
          "Baja correlación con mercados occidentales",
          "ETFs diversificados y líquidos"
        ],
        callToAction: "Exposición: 20% del portfolio"
      }
    },
    {
      icon: Coins,
      title: "Materias Primas: Oro, Plata y Petróleo",
      description: "Valor refugio, cobertura frente a inflación y activos geopolíticos.",
      backContent: {
        details: [
          "Oro: cobertura inflación y devaluación",
          "Plata: demanda industrial y tecnológica",
          "Petróleo: commodity estratégico global",
          "Diversificación geopolítica",
          "Instrumentos ETF y físicos"
        ],
        callToAction: "Exposición: 15% del portfolio"
      }
    },
    {
      icon: Link,
      title: "Activos Digitales Regulados",
      description: "RWA, Tokenización, DeFi. Participamos solo en infraestructuras legales y auditadas del sector blockchain.",
      backContent: {
        details: [
          "RWA: Real World Assets tokenizados",
          "DeFi protocolos auditados",
          "Stablecoins reguladas (USDC, USDT)",
          "Exchanges institucionales (Coinbase)",
          "Custody profesional y seguros"
        ],
        callToAction: "Exposición: 10% del portfolio"
      }
    },
    {
      icon: Brain,
      title: "Trading Algorítmico Propio, Auditado",
      description: "Optimización de carteras con inteligencia artificial, basada en parámetros matemáticos y control de drawdown.",
      colSpan: true,
      backContent: {
        details: [
          "Algoritmos propietarios con 5+ años backtesting",
          "Control estricto drawdown máximo 3%",
          "Auditoría externa trimestral independiente",
          "Machine Learning para optimización de entrada/salida",
          "Diversificación multi-asset y multi-temporal",
          "Rebalanceo automático según volatilidad"
        ],
        callToAction: "Exposición: 30% del portfolio - Motor principal de rentabilidad"
      }
    }
  ];

  return (
    <section id="producto" className="py-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Cómo Conseguimos el <span className="text-gold">9% Fijo Anual</span>
          </h2>
          <p className="text-xl text-silver-100 max-w-3xl mx-auto">
            Una cartera permanente, sin improvisaciones. Nuestra rentabilidad no depende de predicciones, 
            sino de diversificación estructural:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {strategies.map((strategy, index) => (
            <StrategyCard
              key={index}
              icon={strategy.icon}
              title={strategy.title}
              description={strategy.description}
              backContent={strategy.backContent}
              colSpan={strategy.colSpan}
            />
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
