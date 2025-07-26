import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";
import { useCalculator } from "@/hooks/use-calculator";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import logoImg from "@/assets/Logo-removeBG_1752488347081.png";

export default function Calculator() {
  const { state, updateAmount, updateYears, updateCompoundInterest, calculateResults } = useCalculator();
  const { toast } = useToast();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const results = calculateResults();

  const generatePDF = () => {
    setIsGeneratingPDF(true);
    
    try {
      const doc = new jsPDF();
      
      // Configure fonts and colors
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(0, 31, 63); // Navy blue
      
      // Header
      doc.text("NAKAMA&PARTNERS", 20, 30);
      doc.setFontSize(16);
      doc.setTextColor(218, 165, 32); // Gold
      doc.text("Simulación de Inversión", 20, 45);
      
      // Separator line
      doc.setDrawColor(0, 31, 63);
      doc.setLineWidth(0.5);
      doc.line(20, 50, 190, 50);
      
      // Investment details
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      const currentDate = new Date().toLocaleDateString('es-ES');
      doc.text(`Fecha de simulación: ${currentDate}`, 20, 65);
      
      // Investment parameters
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("PARÁMETROS DE INVERSIÓN", 20, 85);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`• Capital inicial: €${state.amount.toLocaleString()}`, 25, 100);
      doc.text(`• Plazo de inversión: ${state.years} ${state.years === 1 ? 'año' : 'años'}`, 25, 112);
      doc.text(`• Tasa de interés: 9% anual fijo`, 25, 124);
      doc.text(`• Tipo de interés: ${state.compoundInterest ? 'Compuesto' : 'Simple'}`, 25, 136);
      
      // Results section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("RESULTADOS DE LA SIMULACIÓN", 20, 150);
      
      // Results box
      doc.setFillColor(240, 248, 255); // Light blue background
      doc.rect(20, 155, 170, 45, 'F');
      doc.setDrawColor(0, 31, 63);
      doc.rect(20, 155, 170, 45, 'S');
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`Capital inicial:`, 25, 168);
      doc.text(`€${results.initialAmount.toLocaleString()}`, 140, 168);
      
      doc.text(`Intereses generados:`, 25, 182);
      doc.setTextColor(0, 128, 0); // Green for earnings
      doc.text(`+€${results.interestGenerated.toLocaleString()}`, 140, 182);
      
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text(`Capital final:`, 25, 196);
      doc.setTextColor(0, 31, 63);
      doc.setFontSize(12);
      doc.text(`€${results.finalAmount.toLocaleString()}`, 140, 196);
      
      // Product information
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("CARACTERÍSTICAS DEL PRODUCTO", 20, 215);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("• Depósito bancario con rentabilidad fija del 9% anual", 25, 230);
      doc.text("• Capital protegido mediante contrato bancario", 25, 242);
      doc.text("• Renovación automática al vencimiento", 25, 254);
      doc.text("• Sin comisiones de apertura ni mantenimiento", 25, 266);
      
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text("Esta simulación es orientativa. Rentabilidades pasadas no garantizan rentabilidades futuras.", 20, 290);
      doc.text("Nakama&Partners - Soluciones de inversión profesionales", 20, 300);
      
      // Generate filename with timestamp
      const filename = `simulacion-inversion-${Date.now()}.pdf`;
      
      // Save the PDF
      doc.save(filename);
      
      toast({
        title: "PDF descargado",
        description: "Su simulación personalizada se ha descargado correctamente."
      });
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "No se pudo generar el PDF. Inténtelo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadPDF = () => {
    generatePDF();
  };

  return (
    <section className="py-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Simula Tu Crecimiento: <span className="text-green">¿Qué Ocurre Si Inviertes 50.000€?</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto bg-black/70 rounded-2xl border border-silver-500/20 p-8">
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
                  <span className="text-green font-semibold">€{results.interestGenerated.toLocaleString()}</span>
                </div>
                <div className="border-t border-silver-500/30 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Capital Final:</span>
                    <span className="text-green font-bold text-xl">€{results.finalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="w-full mt-6 gradient-navy text-white hover:opacity-90"
              >
                <Download className="mr-2 h-4 w-4" />
                {isGeneratingPDF ? "Generando..." : "Descargar simulación en PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}