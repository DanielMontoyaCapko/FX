import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Clock,
  HelpCircle,
  Mail,
  Github,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import logoImg from "@/assets/Logo-removeBG_1752488347081.png";
import { useScrollToTop } from "@/hooks/useScrollToTop";

// Variante por defecto
const DEFAULT_VARIANT: 1 | 2 | 3 = 1;

export default function Login() {
  useScrollToTop();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login, isLoading } = useAuth();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [variant, setVariant] = useState<1 | 2 | 3>(DEFAULT_VARIANT);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const v = Number(sp.get("v") || sp.get("variant"));
      if (v === 1 || v === 2 || v === 3) setVariant(v as 1 | 2 | 3);
      else setVariant(DEFAULT_VARIANT);
    }
  }, []);

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

  // ---------- Bloques UI ----------
  const BrandHeader = () => (
    <div className="flex flex-col items-center text-center">
      <img
        src={logoImg}
        alt="Logo"
        className="w-16 h-16 md:w-40 md:h-40 mb-3 drop-shadow-[0_0_18px_rgba(16,185,129,0.35)]"
      />
      <div className="space-y-0.5">
        <h1 className="font-cormorant text-3xl md:text-4xl font-bold text-emerald-50 leading-tight">
          Nakama Partner
        </h1>
        <p className="text-emerald-300 text-base md:text-lg tracking-wide">Portal de Asesores</p>
      </div>
    </div>
  );

  const BrandInline = () => (
    <div className="flex items-center gap-3 md:gap-4 mb-5">
      <img
        src={logoImg}
        alt="Logo"
        className="w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]"
      />
      <div>
        <h2 className="font-cormorant text-xl md:text-2xl font-bold text-emerald-50 leading-tight">
          Nakama Partne
        </h2>
        <p className="text-emerald-400 text-xs md:text-sm">Portal de Asesores</p>
      </div>
    </div>
  );

  // ---- FORM CARDS (compactados) ----
  const LoginFormCard = () => (
    <Card
      className={[
        "rounded-3xl bg-black/40 backdrop-blur-sm",
        "border border-emerald-500/15",
        "shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_24px_70px_-20px_rgba(16,185,129,0.28)]",
      ].join(" ")}
    >
      <CardHeader className="text-center space-y-2 md:space-y-3">
        <CardTitle className="text-2xl md:text-3xl text-emerald-50">Iniciar Sesión</CardTitle>
        <CardDescription className="text-emerald-200/80 text-sm md:text-base">
          Ingresa tus credenciales para continuar
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-emerald-100 text-sm md:text-base">
              Email
            </Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-300/80" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className={[
                  "h-11 md:h-12 pl-12 pr-4 text-[15px] md:text-base",
                  "bg-emerald-950/40 text-emerald-50 placeholder:text-emerald-200/50",
                  "border border-emerald-500/20",
                  "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0",
                ].join(" ")}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-emerald-100 text-sm md:text-base">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-300/80" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Tu contraseña"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, password: e.target.value }))
                }
                className={[
                  "h-11 md:h-12 pl-12 pr-12 text-[15px] md:text-base",
                  "bg-emerald-950/40 text-emerald-50 placeholder:text-emerald-200/50",
                  "border border-emerald-500/20",
                  "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0",
                ].join(" ")}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300/80 hover:text-emerald-200"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className={[
              "w-full rounded-2xl h-11 md:h-12",
              "bg-gradient-to-r from-emerald-600 to-emerald-500",
              "hover:from-emerald-500 hover:to-emerald-400",
              "text-[15px] md:text-base font-semibold",
              "shadow-[0_12px_34px_-10px_rgba(16,185,129,0.55)]",
            ].join(" ")}
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const LoginFormCardV2 = () => (
    <div className="relative group">
      {/* Borde degradado sutil */}
      <div className="pointer-events-none absolute -inset-[1.2px] rounded-[20px] bg-gradient-to-r from-emerald-500/30 via-emerald-400/20 to-emerald-500/30 opacity-70 group-hover:opacity-100 blur-[2px] transition-opacity" />
      <Card
        className={[
          "relative rounded-[20px] bg-black/50 backdrop-blur-md",
          "border border-emerald-500/15",
          "shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_24px_70px_-20px_rgba(16,185,129,0.35)]",
        ].join(" ")}
      >
        <CardHeader className="space-y-1 text-left pb-3 md:pb-4">
          <CardTitle className="text-[20px] md:text-[22px] leading-tight text-emerald-50">
            Accede a tu cuenta
          </CardTitle>
          <CardDescription className="text-emerald-200/80 text-[14px]">
            Usa tu correo corporativo para iniciar sesión
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 pb-6 md:pb-7">
          <form onSubmit={handleLogin} className="space-y-4.5 md:space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-emerald-100 text-sm md:text-[15px]">
                Email
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-emerald-300/80" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@email.com"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={[
                    "h-11 md:h-12 pl-11 md:pl-12 pr-4 text-[14.5px] md:text-[15px] leading-none",
                    "bg-emerald-950/40 text-emerald-50 placeholder:text-emerald-200/50",
                    "border border-emerald-500/20",
                    "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0",
                  ].join(" ")}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-emerald-100 text-sm md:text-[15px]">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-emerald-300/80" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Tu contraseña"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                  className={[
                    "h-11 md:h-12 pl-11 md:pl-12 pr-11 md:pr-12 text-[14.5px] md:text-[15px] leading-none",
                    "bg-emerald-950/40 text-emerald-50 placeholder:text-emerald-200/50",
                    "border border-emerald-500/20",
                    "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0",
                  ].join(" ")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300/80 hover:text-emerald-200"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="h-[18px] w-[18px]" />
                  ) : (
                    <Eye className="h-[18px] w-[18px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className={[
                "w-full rounded-xl h-11 md:h-12",
                "bg-gradient-to-r from-emerald-600 to-emerald-500",
                "hover:from-emerald-500 hover:to-emerald-400",
                "text-[15px] font-semibold",
                "shadow-[0_12px_34px_-10px_rgba(16,185,129,0.55)]",
              ].join(" ")}
              disabled={isLoading}
            >
              {isLoading ? "Ingresando..." : "Iniciar Sesión"}
            </Button>

            <p className="text-[11.5px] text-emerald-200/70 text-center">
              Al continuar aceptas los Términos y la Política de Privacidad.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  const LoginFormCardV3Centered = () => (
    <Card
      className={[
        "rounded-3xl bg-black/45 backdrop-blur-md",
        "border border-emerald-500/15",
        "shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_24px_70px_-20px_rgba(16,185,129,0.30)]",
      ].join(" ")}
    >
      <CardHeader className="text-center pt-6 md:pt-7 space-y-2 md:space-y-3">
        <CardTitle className="text-2xl md:text-3xl text-emerald-50">Iniciar Sesión</CardTitle>
        <CardDescription className="text-emerald-200/80 text-sm md:text-base">
          Ingresa tus credenciales para continuar
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleLogin} className="space-y-5 md:space-y-6 max-w-sm mx-auto">
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-left text-emerald-100 text-sm md:text-base">
              Email
            </Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-300/80" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className={[
                  "h-11 md:h-12 pl-12 pr-4 text-[15px] md:text-base",
                  "bg-emerald-950/40 text-emerald-50 placeholder:text-emerald-200/50",
                  "border border-emerald-500/20",
                  "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0",
                ].join(" ")}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="block text-left text-emerald-100 text-sm md:text-base">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-300/80" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Tu contraseña"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, password: e.target.value }))
                }
                className={[
                  "h-11 md:h-12 pl-12 pr-12 text-[15px] md:text-base",
                  "bg-emerald-950/40 text-emerald-50 placeholder:text-emerald-200/50",
                  "border border-emerald-500/20",
                  "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0",
                ].join(" ")}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300/80 hover:text-emerald-200"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className={[
              "w-full rounded-2xl h-11 md:h-12",
              "bg-gradient-to-r from-emerald-600 to-emerald-500",
              "hover:from-emerald-500 hover:to-emerald-400",
              "text-[15px] md:text-base font-semibold",
              "shadow-[0_12px_34px_-10px_rgba(16,185,129,0.55)]",
            ].join(" ")}
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Iniciar Sesión"}
          </Button>

          <p className="text-center text-[11.5px] text-emerald-200/70">
            Al continuar aceptas los Términos y la Política de Privacidad.
          </p>
        </form>
      </CardContent>
    </Card>
  );

  const BackButton = () => (
    <div className="absolute top-6 left-6">
      <Button
        onClick={() => setLocation("/")}
        variant="ghost"
        className="text-emerald-100 hover:bg-emerald-900/20 hover:text-emerald-50 gap-2 text-sm md:text-base"
        aria-label="Volver al inicio"
      >
        <ArrowLeft className="h-5 w-5" />
        Volver al Inicio
      </Button>
    </div>
  );

  const ValueItem = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">
        <Icon className="h-5 w-5 text-emerald-400" />
      </div>
      <div>
        <p className="text-emerald-50 font-medium text-[15px]">{title}</p>
        <p className="text-emerald-200/80 text-sm">{desc}</p>
      </div>
    </div>
  );

  const SSOButtons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Button
        variant="outline"
        className="w-full bg-white/5 border-emerald-500/20 text-emerald-50 hover:bg-white/10"
        aria-label="Continuar con Google"
      >
        <Sparkles className="mr-2 h-4 w-4" /> Google
      </Button>
      <Button
        variant="outline"
        className="w-full bg-white/5 border-emerald-500/20 text-emerald-50 hover:bg-white/10"
        aria-label="Continuar con GitHub"
      >
        <Github className="mr-2 h-4 w-4" /> GitHub
      </Button>
    </div>
  );

  const HelpCard = () => (
    <Card className="rounded-2xl bg-white/5 backdrop-blur-sm border border-emerald-500/15">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-emerald-300" />
          <CardTitle className="text-emerald-50 text-lg">¿Necesitas ayuda?</CardTitle>
        </div>
        <CardDescription className="text-emerald-200/80 text-sm">
          Estamos disponibles para resolver incidencias de acceso.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <Button variant="ghost" className="w-full justify-start text-emerald-100 hover:bg-white/10">
          <Mail className="mr-2 h-4 w-4" /> soporte@nakama.partner
        </Button>
        <p className="text-xs text-emerald-200/60 flex items-center gap-2">
          <Clock className="h-4 w-4" /> Lunes a Viernes, 9:00–18:00
        </p>
      </CardContent>
    </Card>
  );

  // ---------- Shells (compactados) ----------
  const ShellVariant1 = () => (
    <div
      className={[
        "relative min-h-[100svh] overflow-hidden",
        "bg-gradient-to-br from-black via-[#0A1713] to-[#0E2A1F]",
        "before:pointer-events-none before:absolute before:inset-0",
        "before:bg-[radial-gradient(80%_60%_at_110%_-10%,rgba(16,185,129,0.18),transparent),radial-gradient(60%_40%_at_-20%_110%,rgba(16,185,129,0.12),transparent)]",
        "flex items-center justify-center px-5 md:px-8",
      ].join(" ")}
    >
      {BackButton()}
      <div className="w-full max-w-md md:max-w-lg space-y-8 md:space-y-10">
        {BrandHeader()}
        {LoginFormCard()}
      </div>
    </div>
  );

  const ShellVariant2 = () => (
    <div
      className={[
        "relative min-h-[100svh] overflow-hidden",
        "bg-gradient-to-br from-black via-[#091611] to-[#0E2A1F]",
        "px-5 md:px-10",
        "flex items-center justify-center",
      ].join(" ")}
    >
      {BackButton()}

      <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center max-w-5xl mx-auto py-10 md:py-0 w-full">
        {/* Columna izquierda */}
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-4 mb-5">
            <img
              src={logoImg}
              alt="Logo"
              className="w-14 h-14 md:w-20 md:h-20 drop-shadow-[0_0_14px_rgba(16,185,129,0.35)]"
            />
            <div>
              <h1 className="font-cormorant text-3xl lg:text-4xl font-bold text-emerald-50 leading-tight">
                Nakama Partner
              </h1>
              <p className="text-emerald-300 text-base">Portal de Asesores</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-emerald-500/10 border border-emerald-400/20 text-emerald-200">
              <Sparkles className="h-4 w-4" />
              Acceso exclusivo para asesores & clientes
            </div>
          </div>

          <p className="text-emerald-100/90 text-sm md:text-base mb-7 max-w-prose">
            Gestiona tus comisiones, monitoriza referidos en tiempo real y recibe soporte prioritario desde un único lugar.
            Todo con seguridad de nivel empresarial.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {ValueItem({ icon: ShieldCheck, title: "Seguridad reforzada", desc: "Cifrado y acceso por rol." })}
            {ValueItem({ icon: Clock, title: "Eficiencia", desc: "Actualizaciones en tiempo real." })}
            {ValueItem({ icon: Sparkles, title: "Experiencia cuidada", desc: "Interfaz clara y sin fricciones." })}
            {ValueItem({ icon: User, title: "Soporte cercano", desc: "Equipo de ayuda especializado." })}
          </div>
        </div>

        {/* Columna derecha */}
        <div className="order-1 md:order-2 w-full max-w-sm md:max-w-md md:ml-auto">
          {/* Cabecera compacta + form */}
          {LoginFormCardV2()}
        </div>
      </div>
    </div>
  );

  const ShellVariant3 = () => (
    <div
      className={[
        "relative min-h-[100svh] overflow-hidden",
        "bg-gradient-to-br from-black via-[#07140F] to-[#0E2A1F]",
        "px-5 md:px-10",
        "flex items-center justify-center",
      ].join(" ")}
    >
      {BackButton()}

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_minmax(0,500px)_340px] gap-8 items-center">
          {/* Izquierda */}
          <div className="hidden lg:flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <img
                src={logoImg}
                alt="Logo"
                className="w-14 h-14 md:w-24 md:h-24 drop-shadow-[0_0_14px_rgba(16,185,129,0.35)]"
              />
              <div>
                <h2 className="font-cormorant text-3xl font-bold text-emerald-50 leading-tight">
                  Nakama Partner
                </h2>
                <p className="text-emerald-300 text-base">Para asesores</p>
              </div>
            </div>

            <p className="text-emerald-100/90 max-w-sm text-sm md:text-base">
              Accede a tu panel en segundos. Interfaz clara y soporte inmediato si lo necesitas.
            </p>

            <div className="flex items-center gap-3 text-sm text-emerald-200/75">
              <ShieldCheck className="h-4 w-4" />
              Cumplimiento de buenas prácticas y privacidad.
            </div>

            <div className="flex items-center gap-3 text-sm text-emerald-200/75">
              <Sparkles className="h-4 w-4" />
              Panel de métricas en tiempo real.
            </div>
            <div className="flex items-center gap-3 text-sm text-emerald-200/75">
              <User className="h-4 w-4" />
              Gestión avanzada de roles y permisos.
            </div>
            <div className="flex items-center gap-3 text-sm text-emerald-200/75">
              <Clock className="h-4 w-4" />
              Auditoría y registro de actividad.
            </div>
          </div>

          {/* Centro */}
          <div className="w-full max-w-sm md:max-w-md mx-auto">
            {LoginFormCardV3Centered()}
          </div>

          {/* Derecha */}
          <div className="space-y-5">
            {HelpCard()}
          </div>
        </div>
      </div>
    </div>
  );

  // ---------- Render ----------
  if (variant === 2) return ShellVariant2();
  if (variant === 3) return ShellVariant3();
  return ShellVariant1();
}
