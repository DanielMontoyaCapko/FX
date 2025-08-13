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
    <div
      className={[
        "relative min-h-screen overflow-hidden",
        "bg-gradient-to-br from-black via-[#0A1713] to-[#0E2A1F]",
        // (Sin red de fondo)
        "before:pointer-events-none before:absolute before:inset-0",
        "before:bg-[radial-gradient(80%_60%_at_110%_-10%,rgba(16,185,129,0.18),transparent),radial-gradient(60%_40%_at_-20%_110%,rgba(16,185,129,0.12),transparent)]",
        "flex items-center justify-center px-6 md:px-8",
      ].join(" ")}
    >
      {/* Volver al inicio */}
      <div className="absolute top-8 left-8">
        <Button
          onClick={() => setLocation("/")}
          variant="ghost"
          className="text-emerald-100 hover:bg-emerald-900/20 hover:text-emerald-50 gap-2 text-base md:text-lg"
        >
          <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
          Volver al Inicio
        </Button>
      </div>

      <div className="w-full max-w-lg md:max-w-xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <div className="flex items-center justify-center space-x-5 mb-6">
            <img
              src={logoImg}
              alt="Logo"
              className="w-20 h-20 md:w-24 md:h-24 drop-shadow-[0_0_18px_rgba(16,185,129,0.35)]"
            />
            <div>
              <h1 className="font-cormorant text-4xl md:text-5xl font-bold text-emerald-50">
                Nakama&Partners
              </h1>
              <p className="text-emerald-300 text-lg md:text-2xl">Portal de Asesores</p>
            </div>
          </div>
          <p className="text-emerald-200/80 text-xl md:text-2xl">
            Accede a tu dashboard profesional
          </p>
        </div>

        {/* Login Card */}
        <Card
          className={[
            "rounded-3xl bg-black/40 backdrop-blur-sm",
            "border border-emerald-500/15",
            "shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_24px_70px_-20px_rgba(16,185,129,0.28)]",
          ].join(" ")}
        >
          <CardHeader className="text-center space-y-3 md:space-y-20">
            <CardTitle className="text-4xl md:text-5xl text-emerald-50">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-emerald-200/80 text-lg md:text-xl">
              Ingresa tus credenciales para acceder
            </CardDescription>
          </CardHeader>

          <CardContent className="p-7 md:p-10">
            <form onSubmit={handleLogin} className="space-y-6 md:space-y-7">
              {/* Email */}
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-emerald-100 text-lg md:text-xl">
                  Email
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 md:h-7 md:w-7 text-emerald-300/80" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className={[
                      "h-12 md:h-14 pl-12 pr-4 text-lg md:text-xl",
                      "bg-emerald-950/40 text-emerald-50 placeholder:text-emerald-200/50",
                      "border border-emerald-500/20",
                      "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0",
                    ].join(" ")}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2.5">
                <Label htmlFor="password" className="text-emerald-100 text-lg md:text-xl">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 md:h-7 md:w-7 text-emerald-300/80" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Tu contraseña"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className={[
                      "h-12 md:h-14 pl-12 pr-12 text-lg md:text-xl",
                      "bg-emerald-950/40 text-emerald-50 placeholder:text-emerald-200/50",
                      "border border-emerald-500/20",
                      "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0",
                    ].join(" ")}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300/80 hover:text-emerald-200"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6 md:h-7 md:w-7" />
                    ) : (
                      <Eye className="h-6 w-6 md:h-7 md:w-7" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className={[
                  "w-full rounded-2xl h-12 md:h-14",
                  "bg-gradient-to-r from-emerald-600 to-emerald-500",
                  "hover:from-emerald-500 hover:to-emerald-400",
                  "text-lg md:text-xl font-semibold",
                  "shadow-[0_12px_34px_-10px_rgba(16,185,129,0.55)]",
                ].join(" ")}
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
