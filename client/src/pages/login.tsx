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
const DEFAULT_VARIANT: 1 | 2 | 3 = 3;

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

  // ---------- Header compartido (logo centrado) ----------
  const BrandHeader = () => (
    <div className="flex flex-col items-center text-center">
      <img
        src={logoImg}
        alt="Logo"
        className="w-20 h-20 md:w-24 md:h-24 mb-4 drop-shadow-[0_0_18px_rgba(16,185,129,0.35)]"
      />
      <div className="space-y-1">
        <h1 className="font-cormorant text-4xl md:text-5xl font-bold text-emerald-50 leading-tight">
          Nakama Partner
        </h1>
        <p className="text-emerald-300 text-lg md:text-2xl tracking-wide">Portal de Asesores</p>
      </div>
    </div>
  );

  // ---------- Cabecera compacta para la opción 2 (sobre el formulario) ----------
  const BrandInline = () => (
    <div className="flex items-center gap-3 md:gap-4 mb-6">
      <img
        src={logoImg}
        alt="Logo"
        className="w-9 h-9 md:w-12 md:h-12 drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]"
      />
      <div>
        <h2 className="font-cormorant text-2xl md:text-3xl font-bold text-emerald-50 leading-tight">
          Nakama Partner
        </h2>
        <p className="text-emerald-400 text-sm md:text-base">Portal de Asesores</p>
      </div>
    </div>
  );

  // ---------- Formulario base (v1) ----------
  const LoginFormCard = () => (
    <Card
      className={[
        "rounded-3xl bg-black/40 backdrop-blur-sm",
        "border border-emerald-500/15",
        "shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_24px_70px_-20px_rgba(16,185,129,0.28)]",
      ].join(" ")}
    >
      <CardHeader className="text-center space-y-3 md:space-y-5">
        <CardTitle className="text-3xl md:text-4xl text-emerald-50">Iniciar Sesión</CardTitle>
        <CardDescription className="text-emerald-200/80 text-base md:text-lg">
          Ingresa tus credenciales para continuar
        </CardDescription>
      </CardHeader>

      <CardContent className="p-7 md:p-10">
        <form onSubmit={handleLogin} className="space-y-6 md:space-y-7">
          {/* Email */}
          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-emerald-100 text-base md:text-lg">
              Email
            </Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-emerald-300/80" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className={[
                  "h-12 md:h-14 pl-12 pr-4 text-base md:text-lg",
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
            <Label htmlFor="password" className="text-emerald-100 text-base md:text-lg">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-emerald-300/80" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Tu contraseña"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className={[
                  "h-12 md:h-14 pl-12 pr-12 text-base md:text-lg",
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
                {showPassword ? <EyeOff className="h-5 w-5 md:h-6 md:w-6" /> : <Eye className="h-5 w-5 md:h-6 md:w-6" />}
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
              "text-base md:text-lg font-semibold",
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

  // ---------- Formulario mejorado para la opción 2 ----------
  const LoginFormCardV2 = () => (
    <div className="relative group">
      {/* Borde degradado sutil */}
      <div className="pointer-events-none absolute -inset-[1.2px] rounded-[24px] bg-gradient-to-r from-emerald-500/30 via-emerald-400/20 to-emerald-500/30 opacity-70 group-hover:opacity-100 blur-[2px] transition-opacity" />
      <Card
        className={[
          "relative rounded-[24px] bg-black/50 backdrop-blur-md",
          "border border-emerald-500/15",
          "shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_24px_70px_-20px_rgba(16,185,129,0.35)]",
        ].join(" ")}
      >
        <CardHeader className="space-y-1 text-left pb-3 md:pb-4">
          <CardTitle className="text-[22px] md:text-[26px] leading-tight text-emerald-50">
            Accede a tu cuenta
          </CardTitle>
          <CardDescription className="text-emerald-200/80 text-[15px]">
            Usa tu correo corporativo para iniciar sesión
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 pb-6 md:pb-8">
          <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-emerald-100 text-sm md:text-base">
                Email
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] md:h-5 md:w-5 text-emerald-300/80" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className={[
                    "h-12 md:h-14 pl-11 md:pl-12 pr-4 text-[15px] md:text-base leading-none",
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
              <Label htmlFor="password" className="text-emerald-100 text-sm md:text-base">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] md:h-5 md:w-5 text-emerald-300/80" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Tu contraseña"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className={[
                    "h-12 md:h-14 pl-11 md:pl-12 pr-11 md:pr-12 text-[15px] md:text-base leading-none",
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
                    <EyeOff className="h-[18px] w-[18px] md:h-5 md:w-5" />
                  ) : (
                    <Eye className="h-[18px] w-[18px] md:h-5 md:w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className={[
                "w-full rounded-xl h-12 md:h-14",
                "bg-gradient-to-r from-emerald-600 to-emerald-500",
                "hover:from-emerald-500 hover:to-emerald-400",
                "text-base font-semibold",
                "shadow-[0_12px_34px_-10px_rgba(16,185,129,0.55)]",
              ].join(" ")}
              disabled={isLoading}
            >
              {isLoading ? "Ingresando..." : "Iniciar Sesión"}
            </Button>

            {/* Nota legal breve */}
            <p className="text-[12px] text-emerald-200/70 text-center">
              Al continuar aceptas los Términos y la Política de Privacidad.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  // ---------- Formulario centrado para la opción 3 (labels a la izquierda + header un poco más abajo) ----------
  const LoginFormCardV3Centered = () => (
    <Card
      className={[
        "rounded-3xl bg-black/45 backdrop-blur-md",
        "border border-emerald-500/15",
        "shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_24px_70px_-20px_rgba(16,185,129,0.30)]",
      ].join(" ")}
    >
      {/* Header separado del borde superior (como en la imagen 2) */}
      <CardHeader className="text-center pt-6 md:pt-8 space-y-2 md:space-y-4">
        <CardTitle className="text-3xl md:text-4xl text-emerald-50">Iniciar Sesión</CardTitle>
        <CardDescription className="text-emerald-200/80 text-base md:text-lg">
          Ingresa tus credenciales para continuar
        </CardDescription>
      </CardHeader>

      <CardContent className="p-7 md:p-10">
        <form onSubmit={handleLogin} className="space-y-6 md:space-y-7 max-w-md mx-auto">
          {/* Email (label a la izquierda, encima del campo) */}
          <div className="space-y-2.5">
            <Label htmlFor="email" className="block text-left text-emerald-100 text-base md:text-lg">
              Email
            </Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-emerald-300/80" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className={[
                  "h-12 md:h-14 pl-12 pr-4 text-base md:text-lg", // <- sin text-center
                  "bg-emerald-950/40 text-emerald-50 placeholder:text-emerald-200/50",
                  "border border-emerald-500/20",
                  "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0",
                ].join(" ")}
                required
              />
            </div>
          </div>

          {/* Password (label a la izquierda, encima del campo) */}
          <div className="space-y-2.5">
            <Label htmlFor="password" className="block text-left text-emerald-100 text-base md:text-lg">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-emerald-300/80" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Tu contraseña"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className={[
                  "h-12 md:h-14 pl-12 pr-12 text-base md:text-lg", // <- sin text-center
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
                {showPassword ? <EyeOff className="h-5 w-5 md:h-6 md:w-6" /> : <Eye className="h-5 w-5 md:h-6 md:w-6" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className={[
              "w-full rounded-2xl h-12 md:h-14",
              "bg-gradient-to-r from-emerald-600 to-emerald-500",
              "hover:from-emerald-500 hover:to-emerald-400",
              "text-base md:text-lg font-semibold",
              "shadow-[0_12px_34px_-10px_rgba(16,185,129,0.55)]",
            ].join(" ")}
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Iniciar Sesión"}
          </Button>

          <p className="text-center text-[12px] text-emerald-200/70">
            Al continuar aceptas los Términos y la Política de Privacidad.
          </p>
        </form>
      </CardContent>
    </Card>
  );

  // ---------- Extras reutilizables ----------
  const BackButton = () => (
    <div className="absolute top-8 left-8">
      <Button
        onClick={() => setLocation("/")}
        variant="ghost"
        className="text-emerald-100 hover:bg-emerald-900/20 hover:text-emerald-50 gap-2 text-base md:text-lg"
        aria-label="Volver al inicio"
      >
        <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
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
        <p className="text-emerald-50 font-medium">{title}</p>
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
          <CardTitle className="text-emerald-50 text-xl">¿Necesitas ayuda?</CardTitle>
        </div>
        <CardDescription className="text-emerald-200/80">
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

  // ---------- Shells ----------
  const ShellVariant1 = () => (
    // PROPUESTA 1: Minimal & centered
    <div
      className={[
        "relative min-h-[100svh] overflow-hidden",
        "bg-gradient-to-br from-black via-[#0A1713] to-[#0E2A1F]",
        "before:pointer-events-none before:absolute before:inset-0",
        "before:bg-[radial-gradient(80%_60%_at_110%_-10%,rgba(16,185,129,0.18),transparent),radial-gradient(60%_40%_at_-20%_110%,rgba(16,185,129,0.12),transparent)]",
        "flex items-center justify-center px-6 md:px-8",
      ].join(" ")}
    >
      <BackButton />
      <div className="w-full max-w-lg md:max-w-xl space-y-10 md:space-y-12">
        <BrandHeader />
        <LoginFormCard />
      </div>
    </div>
  );

  const ShellVariant2 = () => (
    // PROPUESTA 2: Split layout centrado vertical + cabecera sobre la caja + caja V2 mejorada
    <div
      className={[
        "relative min-h-[100svh] overflow-hidden",
        "bg-gradient-to-br from-black via-[#091611] to-[#0E2A1F]",
        "px-6 md:px-10",
        "flex items-center justify-center",
      ].join(" ")}
    >
      <BackButton />

      <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto py-12 md:py-0 w-full">
        {/* Columna izquierda: Marca + contexto + beneficios */}
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-5 mb-6">
            <img
              src={logoImg}
              alt="Logo"
              className="w-16 h-16 md:w-24 md:h-24 drop-shadow-[0_0_14px_rgba(16,185,129,0.35)]"
            />
            <div>
              <h1 className="font-cormorant text-4xl lg:text-5xl font-bold text-emerald-50 leading-tight">
                Nakama Partner
              </h1>
              <p className="text-emerald-300 text-lg">Portal de Asesores</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-emerald-500/10 border border-emerald-400/20 text-emerald-200">
              <Sparkles className="h-4 w-4" />
              Acceso exclusivo para asesores & clientes
            </div>
          </div>
          
          <p className="text-emerald-100/90 text-base lg:text-lg mb-8 max-w-prose">
            Gestiona tus comisiones, monitoriza referidos en tiempo real y recibe soporte prioritario desde un único lugar.
            Todo con seguridad de nivel empresarial.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            <ValueItem icon={ShieldCheck} title="Seguridad reforzada" desc="Cifrado y acceso por rol." />
            <ValueItem icon={Clock} title="Eficiencia" desc="Actualizaciones en tiempo real." />
            <ValueItem icon={Sparkles} title="Experiencia cuidada" desc="Interfaz clara y sin fricciones." />
            <ValueItem icon={User} title="Soporte cercano" desc="Equipo de ayuda especializado." />
          </div>
        </div>

        {/* Columna derecha: Cabecera compacta + Caja mejorada */}
        <div className="order-1 md:order-2 w-full max-w-md md:max-w-lg md:ml-auto">
          <LoginFormCardV2 />
        </div>
      </div>
    </div>
  );

  const ShellVariant3 = () => (
    // PROPUESTA 3: Verticalmente centrado + labels a la izquierda + logo más grande + sin 2FA
    <div
      className={[
        "relative min-h-[100svh] overflow-hidden",
        "bg-gradient-to-br from-black via-[#07140F] to-[#0E2A1F]",
        "px-6 md:px-10",
        "flex items-center justify-center",
      ].join(" ")}
    >
      <BackButton />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_minmax(0,540px)_380px] gap-10 items-center">
          {/* Columna izquierda: marca compacta + copy breve */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <img
                src={logoImg}
                alt="Logo"
                className="w-16 h-16 md:w-28 md:h-28 drop-shadow-[0_0_14px_rgba(16,185,129,0.35)]"
              />
              <div>
                <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-emerald-50 leading-tight">
                  Nakama Partner
                </h2>
                <p className="text-emerald-300 text-lg">Para asesores</p>
              </div>
            </div>

            <p className="text-emerald-100/90 max-w-sm">
              Accede a tu panel en segundos. Interfaz clara y soporte inmediato si lo necesitas.
            </p>

            <div className="flex items-center gap-3 text-sm text-emerald-200/75">
              <ShieldCheck className="h-4 w-4" />
              Cumplimiento de buenas prácticas y privacidad.
            </div>

            {/* +3 items adicionales debajo (2FA reemplazado por otro tema) */}
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

          {/* Columna central: Formulario principal (labels a la izquierda, header un poco más abajo) */}
          <div className="w-full max-w-md md:max-w-lg mx-auto">
            <LoginFormCardV3Centered />

            {/* Enlaces bajo el formulario (COMENTADOS) */}
            {/*
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
              <button
                className="text-emerald-200/80 hover:text-emerald-100 underline decoration-emerald-400/40 underline-offset-4"
                onClick={() => setLocation("/recuperar")}
              >
                ¿Olvidaste tu contraseña?
              </button>
              <button
                className="text-emerald-200/80 hover:text-emerald-100 underline decoration-emerald-400/40 underline-offset-4"
                onClick={() => setLocation("/soporte")}
              >
                Centro de ayuda
              </button>
            </div>
            */}
          </div>

          {/* Columna derecha: Accesos rápidos + ayuda */}
          <div className="space-y-6">
            {/* ACCESO RÁPIDO (COMENTADO para que no aparezca) */}
            {/*
            <Card className="rounded-2xl bg-white/5 backdrop-blur-sm border border-emerald-500/15">
              <CardHeader className="pb-3">
                <CardTitle className="text-emerald-50 text-xl">Acceso rápido</CardTitle>
                <CardDescription className="text-emerald-200/80">
                  Usa un proveedor para iniciar sesión (si está habilitado).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SSOButtons />
                <p className="text-xs text-emerald-200/60">
                  Al continuar aceptas nuestras políticas de privacidad y uso.
                </p>
              </CardContent>
            </Card>
            */}
            <HelpCard />
          </div>
        </div>
      </div>
    </div>
  );

  // ---------- Render ----------
  if (variant === 2) return <ShellVariant2 />;
  if (variant === 3) return <ShellVariant3 />;
  return <ShellVariant1 />;
}
