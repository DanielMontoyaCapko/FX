import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";
import { useCalculator } from "@/hooks/use-calculator";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Calculator() {
  const { state, updateAmount, updateYears, updateCompoundInterest, calculateResults } = useCalculator();
  const { toast } = useToast();
  
  const results = calculateResults();

  const generatePDFMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/generate-pdf", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "PDF generado",
          description: "Su simulación personalizada está lista para descargar."
        });
        // In a real implementation, you would trigger the download here
        console.log("PDF generated:", data.pdf);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo generar el PDF. Inténtelo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const handleDownloadPDF = () => {
    generatePDFMutation.mutate({
      amount: state.amount,
      years: state.years,
      compoundInterest: state.compoundInterest,
      finalAmount: results.finalAmount,
      interestGenerated: results.interestGenerated
    });
  };

  return (
    <section className="py-20 gradient-dark-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Simula Tu Crecimiento: <span className="text-gold">¿Qué Ocurre Si Inviertes 50.000€?</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto bg-black/50 rounded-2xl border border-silver-500/20 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Label className="block text-white font-semibold mb-3">Cantidad a Invertir (€)</Label>
              <Input
                type="number"
                min="50000"
                step="1000"
                value={state.amount}
                onChange={(e) => updateAmount(Number(e.target.value))}
                className="w-full bg-charcoal text-white border-silver-500/30 focus:border-gold"
              />
              
              <Label className="block text-white font-semibold mb-3 mt-6">Plazo ({state.years} {state.years === 1 ? 'año' : 'años'})</Label>
              <Slider
                value={[state.years]}
                onValueChange={(value) => updateYears(value[0])}
                min={1}
                max={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-silver-100 mt-2">
                <span>1 año</span>
                <span>5 años</span>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="compound-interest"
                    checked={state.compoundInterest}
                    onCheckedChange={updateCompoundInterest}
                  />
                  <Label htmlFor="compound-interest" className="text-white cursor-pointer">
                    Con Interés Compuesto
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="bg-charcoal rounded-xl p-6">
              <h3 className="font-playfair text-2xl font-bold text-white mb-6">Resultados de la Simulación</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-silver-100">Inversión Inicial:</span>
                  <span className="text-white font-semibold">€{results.initialAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-silver-100">Intereses Generados:</span>
                  <span className="text-gold font-semibold">€{results.interestGenerated.toLocaleString()}</span>
                </div>
                <div className="border-t border-silver-500/30 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Capital Final:</span>
                    <span className="text-gold font-bold text-xl">€{results.finalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleDownloadPDF}
                disabled={generatePDFMutation.isPending}
                className="w-full mt-6 gradient-navy text-white hover:opacity-90"
              >
                <Download className="mr-2 h-4 w-4" />
                {generatePDFMutation.isPending ? "Generando..." : "Descargar simulación en PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
