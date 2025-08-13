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

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor complete todos los campos.",
        variant: "destructive",
      });
      return;
    }

    const result = await login(loginForm.email, loginForm.password);

    if (result.success) {
      toast({ title: "¡Bienvenido!", description: "Has iniciado sesión correctamente" });
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-600 flex items-center justify-center px-6 md:px-8">
      {/* Volver al inicio */}
      <div className="absolute top-8 left-8">
        <Button
          onClick={() => setLocation("/")}
          variant="ghost"
          className="text-white hover:bg-black/50 gap-2 text-xl md:text-2xl"
        >
          <ArrowLeft className="h-6 w-6 md:h-7 md:w-7" />
          Volver al Inicio
        </Button>
      </div>

      <div className="w-full max-w-lg md:max-w-xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <div className="flex items-center justify-center space-x-6 mb-8">
            <img
              src={logoImg}
              alt="Logo"
              className="w-32 h-32 md:w-40 md:h-40"
            />
            <div>
              <h1 className="font-cormorant text-5xl md:text-6xl font-bold text-white">
                Nakama&Partners
              </h1>
              <p className="text-green text-2xl md:text-3xl">Portal de Asesores</p>
            </div>
          </div>
          <p className="text-silver-100 text-2xl md:text-3xl">
            Accede a tu dashboard profesional
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-[#040505] border-silver-500/20">
          <CardHeader className="text-center space-y-4 md:space-y-6">
            <CardTitle className="text-5xl md:text-6xl text-white">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-silver-100 text-2xl md:text-3xl">
              Ingresa tus credenciales para acceder
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleLogin} className="space-y-8 md:space-y-10">
              {/* Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-white text-2xl md:text-3xl">
                  Email
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-7 w-7 md:h-8 md:w-8 text-silver-100" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="h-16 md:h-20 pl-14 pr-4 text-2xl md:text-3xl bg-black/70 border-silver-500/20 text-white placeholder-silver-100"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-white text-2xl md:text-3xl">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-7 w-7 md:h-8 md:w-8 text-silver-100" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contraseña"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="h-16 md:h-20 pl-14 pr-14 text-2xl md:text-3xl bg-black/70 border-silver-500/20 text-white placeholder-silver-100"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-silver-100 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-7 w-7 md:h-8 md:w-8" />
                    ) : (
                      <Eye className="h-7 w-7 md:h-8 md:w-8" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-16 md:h-20 bg-[#344e41] hover:bg-[#2d4235] text-white text-2xl md:text-3xl font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Ingresando..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
