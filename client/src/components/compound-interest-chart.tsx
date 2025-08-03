import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CompoundInterestChartProps {
  initialAmount?: number;
  years?: number;
  rate?: number;
  className?: string;
}

export default function CompoundInterestChart({ 
  initialAmount = 50000, 
  years = 10, 
  rate = 0.09,
  className = ""
}: CompoundInterestChartProps) {
  // Generate data points for the chart
  const data = [];
  for (let year = 0; year <= years; year++) {
    // Con interés compuesto
    const compoundAmount = initialAmount * Math.pow(1 + rate, year);
    // Sin interés compuesto (interés simple)
    const simpleAmount = initialAmount + (initialAmount * rate * year);
    
    data.push({
      year: year,
      conInteres: Math.round(compoundAmount),
      sinInteres: Math.round(simpleAmount),
      diferencia: Math.round(compoundAmount - simpleAmount)
    });
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const conInteres = payload[0].value;
      const sinInteres = payload[1].value;
      const diferencia = conInteres - sinInteres;
      
      return (
        <div className="bg-black/95 p-4 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <p className="text-white font-semibold mb-3">Año {label}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-green-400 text-sm">Con interés compuesto:</span>
              <span className="text-green-400 font-bold">€{conInteres.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Sin interés compuesto:</span>
              <span className="text-gray-400 font-bold">€{sinInteres.toLocaleString()}</span>
            </div>
            
            <div className="border-t border-gray-600 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 text-sm">Diferencia:</span>
                <span className="text-yellow-400 font-bold">€{diferencia.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-black/70 rounded-xl p-8 border border-silver-500/20 border-transparent transition-all duration-300 hover:border-green-500 hover:bg-black/80 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer ${className}`}>
      <div className="mb-8 text-center">
        <h3 className="font-playfair text-2xl font-bold text-white mb-2">
          Proyección de Crecimiento
        </h3>
        <p className="text-silver-100 text-sm">
          Comparación: €{initialAmount.toLocaleString()} al {(rate * 100)}% anual • Con vs Sin interés compuesto
        </p>
      </div>
      
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 40, left: 30, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis 
              dataKey="year" 
              stroke="#94a3b8"
              fontSize={14}
              tickFormatter={(value) => `Año ${value}`}
            />
            <YAxis 
              stroke="#94a3b8"
              fontSize={14}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
              formatter={(value, entry) => (
                <span style={{ color: entry.color, fontSize: '14px', fontWeight: 'bold' }}>
                  {value}
                </span>
              )}
            />
            <Line 
              type="monotone" 
              dataKey="conInteres" 
              stroke="#22c55e" 
              strokeWidth={4}
              dot={{ fill: '#22c55e', strokeWidth: 2, r: 5 }}
              name="Con Interés Compuesto"
            />
            <Line 
              type="monotone" 
              dataKey="sinInteres" 
              stroke="#9ca3af" 
              strokeWidth={3}
              strokeDasharray="8 5"
              dot={{ fill: '#9ca3af', strokeWidth: 2, r: 4 }}
              name="Sin Interés Compuesto"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-black/50 p-4 rounded-lg">
          <p className="text-green-400 text-lg font-bold">
            €{data[years].conInteres.toLocaleString()}
          </p>
          <p className="text-silver-100 text-sm">Con interés compuesto ({years} años)</p>
        </div>
        
        <div className="bg-black/50 p-4 rounded-lg">
          <p className="text-gray-400 text-lg font-bold">
            €{data[years].sinInteres.toLocaleString()}
          </p>
          <p className="text-silver-100 text-sm">Sin interés compuesto ({years} años)</p>
        </div>
        
        <div className="bg-black/50 p-4 rounded-lg">
          <p className="text-yellow-400 text-lg font-bold">
            €{data[years].diferencia.toLocaleString()}
          </p>
          <p className="text-silver-100 text-sm">Diferencia adicional</p>
        </div>
      </div>
    </div>
  );
}