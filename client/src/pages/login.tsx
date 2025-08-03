import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { User, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import logoImg from "@/assets/Logo-removeBG_1752488347081.png";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function Login() {
  useScrollToTop();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login, isLoading } = useAuth();
  
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor complete todos los campos.",
        variant: "destructive"
      });
      return;
    }

    const result = await login(loginForm.email, loginForm.password);
    
    if (result.success) {
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
      });
      setLocation("/dashboard");
    } else {
      toast({
        title: "Credenciales incorrectas",
        description: result.error || "Email o contraseña incorrectos",
        variant: "destructive",
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
            <img src={logoImg} alt="Logo" className="w-12 h-12" />
            <div>
              <h1 className="font-cormorant text-2xl font-bold text-white">Nakama&Partners</h1>
              <p className="text-green text-sm">Portal de Asesores</p>
            </div>
          </div>
          <p className="text-silver-100">Accede a tu dashboard profesional</p>
        </div>

        {/* Login Form */}
        <Card className="bg-[#040505] border-silver-500/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Iniciar Sesión</CardTitle>
            <CardDescription className="text-silver-100">Ingresa tus credenciales para acceder</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-silver-100" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="pl-10 bg-black/70 border-silver-500/20 text-white placeholder-silver-100"
                    required
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
                    placeholder="Tu contraseña"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="pl-10 pr-10 bg-black/70 border-silver-500/20 text-white placeholder-silver-100"
                    required
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
                disabled={isLoading}
              >
                {isLoading ? "Ingresando..." : "Iniciar Sesión"}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-black/70 rounded-lg border border-silver-500/10">
              <p className="text-xs text-silver-100 text-center">
                <strong>Cuentas demo:</strong><br />
                <code className="text-green">cliente@nakama.com</code> | <code className="text-green">partner@nakama.com</code><br />
                Contraseña: <code className="text-green">demo2025</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}