import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, File, Book, Download } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Downloads() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: ""
  });

  const submitLeadMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: async (data) => {
      if (data.success) {
        toast({
          title: "Registro exitoso",
          description: "La documentación se ha enviado a su email."
        });
        
        // Send documents
        await apiRequest("POST", "/api/send-documents", {
          leadId: data.leadId,
          email: formData.email
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          type: "",
          message: ""
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo procesar su solicitud. Inténtelo de nuevo.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.type) {
      toast({
        title: "Campos requeridos",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    submitLeadMutation.mutate({
      ...formData,
      source: "download"
    });
  };

  const documents = [
    {
      icon: FileText,
      title: "Dossier Institucional",
      description: "Información completa de la empresa y estructura"
    },
    {
      icon: File,
      title: "Contrato Real Pignorado",
      description: "Ejemplo de contrato utilizado (datos anonimizados)"
    },
    {
      icon: Book,
      title: "Manual del Producto",
      description: "Guía completa del funcionamiento y garantías"
    }
  ];

  return (
    <section className="py-20 gradient-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Información Completa <span className="text-gold">a Tu Alcance</span>
          </h2>
          <p className="text-xl text-silver-100 max-w-3xl mx-auto">
            Accede a la documentación clave para entender la solidez y transparencia de FundedXam Capital.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-black/50 rounded-2xl border border-silver-500/20 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {documents.map((doc, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-24 bg-gold/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <doc.icon className="text-3xl text-gold w-8 h-8" />
                </div>
                <h3 className="font-semibold text-white mb-2">{doc.title}</h3>
                <p className="text-sm text-silver-100">{doc.description}</p>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Nombre Completo"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-charcoal text-white border-silver-500/30 focus:border-gold"
                required
              />
              <Input
                type="email"
                placeholder="Email Profesional"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-charcoal text-white border-silver-500/30 focus:border-gold"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="tel"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-charcoal text-white border-silver-500/30 focus:border-gold"
              />
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                required
              >
                <SelectTrigger className="bg-charcoal text-white border-silver-500/30 focus:border-gold">
                  <SelectValue placeholder="Soy..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asesor Financiero">Asesor Financiero</SelectItem>
                  <SelectItem value="Inversor Particular">Inversor Particular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Textarea
              placeholder="Mensaje (opcional)"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
              className="w-full bg-charcoal text-white border-silver-500/30 focus:border-gold resize-none"
            />
            
            <Button 
              type="submit"
              disabled={submitLeadMutation.isPending}
              className="w-full bg-gold text-black py-4 font-semibold hover:bg-gold/90 h-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              {submitLeadMutation.isPending ? "Procesando..." : "Descargar Documentación Completa"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
