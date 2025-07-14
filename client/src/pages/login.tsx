import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoImg from "@/assets/Logo_1752484666419.jpg";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor complete todos los campos.",
        variant: "destructive"
      });
      return;
    }

    // Demo login validation
    if (formData.username === "asesor" && formData.password === "test2025") {
      toast({
        title: "Acceso exitoso",
        description: "Bienvenido al portal de asesores."
      });
      setLocation("/dashboard");
    } else {
      toast({
        title: "Credenciales incorrectas",
        description: "Usuario o contraseña incorrectos.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-600 flex items-center justify-center px-4">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6">
        <Button 
          onClick={() => setLocation("/")}
          variant="ghost" 
          className="text-white hover:bg-black/50 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al Inicio
        </Button>
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={logoImg} alt="Logo" className="w-12 h-12 rounded" />
            <div>
              <h1 className="font-playfair text-2xl font-bold text-white">FundedXam Capital</h1>
              <p className="text-gold text-sm">Portal de Asesores</p>
            </div>
          </div>
          <p className="text-silver-100">Accede a tu dashboard profesional</p>
        </div>

        {/* Login Form */}
        <Card className="bg-[#040505] border-silver-500/20">
          <CardHeader>
            <CardTitle className="text-white text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-silver-100 text-center">
              Ingresa tus credenciales para acceder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-silver-100" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Ingresa tu usuario"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="pl-10 bg-black/30 border-silver-500/20 text-white placeholder-silver-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-silver-100" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 bg-black/30 border-silver-500/20 text-white placeholder-silver-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-silver-100 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#344e41] hover:bg-[#2d4235] text-white"
              >
                Iniciar Sesión
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-black/30 rounded-lg border border-silver-500/10">
              <p className="text-xs text-silver-100 text-center">
                <strong>Para demo:</strong><br />
                Usuario: <code className="text-gold">asesor</code> | 
                Contraseña: <code className="text-gold">test2025</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}