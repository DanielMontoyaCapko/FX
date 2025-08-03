import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CompoundInterestChartProps {
  initialAmount?: number;
  years?: number;
  rate?: number;
  className?: string;
}

export default function CompoundInterestChart({ 
  initialAmount = 100000, 
  years = 12, 
  rate = 0.09,
  className = ""
}: CompoundInterestChartProps) {
  // Generate data points for compound vs simple interest
  const data = [];
  for (let year = 0; year <= years; year++) {
    const compoundAmount = initialAmount * Math.pow(1 + rate, year);
    const simpleAmount = initialAmount * (1 + rate * year);
    
    data.push({
      year: year,
      compound: Math.round(compoundAmount),
      simple: Math.round(simpleAmount),
      difference: Math.round(compoundAmount - simpleAmount)
    });
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const compound = payload[0].value;
      const simple = payload[1].value;
      const difference = compound - simple;
      
      return (
        <div className="bg-black/90 p-4 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <p className="text-white font-semibold mb-2">Año {label}</p>
          <div className="space-y-1">
            <p className="text-green text-sm font-medium">
              Interés Compuesto: €{compound.toLocaleString()}
            </p>
            <p className="text-blue-400 text-sm font-medium">
              Interés Simple: €{simple.toLocaleString()}
            </p>
            <div className="border-t border-gray-600 pt-1 mt-2">
              <p className="text-yellow-400 text-sm font-bold">
                Diferencia: +€{difference.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-black/70 rounded-xl p-6 border border-silver-500/20 ${className}`}>
      <div className="mb-6">
        <h3 className="font-playfair text-2xl font-bold text-white mb-2">
          Interés Compuesto vs Simple
        </h3>
        <p className="text-silver-100 text-sm">
          Comparativa de crecimiento con €{initialAmount.toLocaleString()} inicial a {(rate * 100)}% anual
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis 
              dataKey="year" 
              stroke="#94a3b8"
              fontSize={12}
              tickFormatter={(value) => `Año ${value}`}
            />
            <YAxis 
              stroke="#94a3b8"
              fontSize={12}
              tickFormatter={(value) => `€${(value / 1000)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }}
            />
            <Line 
              type="monotone" 
              dataKey="compound" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="Interés Compuesto"
            />
            <Line 
              type="monotone" 
              dataKey="simple" 
              stroke="#3b82f6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
              name="Interés Simple"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
        <p className="text-green text-sm font-medium">
          <strong>Ventaja del interés compuesto:</strong> Después de {years} años, ganarías 
          <span className="text-white font-bold"> €{(data[years].difference).toLocaleString()}</span> más 
          que con interés simple.
        </p>
      </div>
    </div>
  );
}