import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  TrendingUp,
  DollarSign,
  Crown,
  Briefcase,
  BarChart3,
  UserPlus,
  Calendar,
  LogOut,
  Star,
  User,
  FileText,
  Download,
  Filter,
  X,
  ExternalLink,
  Globe,
  Trophy,
  Camera,
  Phone,
} from "lucide-react";
import logoImg from "@/assets/Logo-removeBG_1752488347081.png";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import CompoundInterestChart from "@/components/compound-interest-chart";

export default function PartnerDashboard() {
  useScrollToTop();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("resumen");

  // Datos de perfil (incluye Fecha de registro - NO editable)
  const [profileData, setProfileData] = useState({
    name: user?.name || "Partner Usuario",
    email: user?.email || "",
    phone: "+34 666 555 444",
    birthDate: "15/03/1985",
    registerDate: "15/01/2024", // NUEVO: campo no editable
    address: "Calle Mayor 123, 4º B, 28001 Madrid, España",
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // filtros CLIENTES
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    inversionMin: "",
    inversionMax: "",
    gananciasMin: "",
    gananciasMax: "",
    pais: "",
    sexo: "",
    estado: "",
  });
  // orden CLIENTES
  const [sortOrder, setSortOrder] = useState<"" | "asc" | "desc">("");

  // ====== NUEVO: filtros CONTRATOS ======
  const [showContractFilters, setShowContractFilters] = useState(false);
  const [contractSort, setContractSort] = useState<"" | "amountDesc" | "amountAsc" | "endAsc" | "endDesc">("");
  const [contractFilters, setContractFilters] = useState({
    search: "",
    status: "", // "Activo" | "Vigente" | "Vencido"
    type: "", // "Partnership" | "Inversión" | "Renovación"
    tier: "", // "Elite" | "Premium" | "Standard"
    amountMin: "",
    amountMax: "",
    signedFrom: "", // yyyy-mm-dd
    signedTo: "", // yyyy-mm-dd
    vencimiento: "", // "expiring" | "expired" | "vigente"
  });
  // =====================================

  // ====== NUEVO: Google Calendar (herramientas) ======
  const [gcalView, setGcalView] = useState<"month" | "week" | "agenda">("month");
  const [gcalTz, setGcalTz] = useState<string>("Europe/Madrid");
  // Calendario público de ejemplo: Festivos de España (puedes cambiarlo por el tuyo público)
  const gcalPublicSrc = "es.spain%23holiday%40group.v.calendar.google.com";
  const gcalMode = useMemo(
    () => (gcalView === "agenda" ? "AGENDA" : gcalView === "week" ? "WEEK" : "MONTH"),
    [gcalView]
  );
  const gcalEmbedUrl = useMemo(
    () =>
      `https://calendar.google.com/calendar/embed?src=${gcalPublicSrc}&ctz=${encodeURIComponent(
        gcalTz
      )}&mode=${gcalMode}&wkst=1&showTitle=0&showPrint=0&showCalendars=0&showTabs=1&bgcolor=%230A1713`,
    [gcalMode, gcalTz]
  );
  const handleOpenGoogleCalendar = () => {
    window.open("https://calendar.google.com/calendar/u/0/r", "_blank", "noopener,noreferrer");
  };
  // ====================================================

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePhoto(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  // días hasta comisión
  const calculateDaysToCommission = () => {
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const nextPayoutDate =
      currentDay <= 15 ? new Date(currentYear, currentMonth, 15) : new Date(currentYear, currentMonth + 1, 15);
    const daysDiff = Math.ceil((nextPayoutDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return daysDiff;
  };

  const partnerStats = {
    totalClients: 47,
    monthlyCommission: 15650,
    ytdCommission: 186200,
    activeInvestments: 2340000,
    newLeadsThisMonth: 5,
    nextTierProgress: 79,
    daysToCommission: calculateDaysToCommission(),
    tier: "Elite Partner",
  };

  return (
    <div
      className={[
        "relative min-h-screen text-white flex",
        "bg-gradient-to-br from-black via-[#0A1713] to-[#0E2A1F]",
        "before:pointer-events-none before:absolute before:inset-0",
        "before:bg-[radial-gradient(80%_60%_at_110%_-10%,rgba(16,185,129,0.18),transparent),radial-gradient(60%_40%_at_-20%_110%,rgba(16,185,129,0.12),transparent)]",
      ].join(" ")}
    >
      {/* Sidebar */}
      <aside
        className={[
          "w-64 fixed h-full p-6",
          "bg-black/40 backdrop-blur-sm",
          "border-r border-emerald-500/15",
          "shadow-[0_0_0_1px_rgba(16,185,129,0.08),0_20px_60px_-20px_rgba(16,185,129,0.25)]",
        ].join(" ")}
      >
        <div className="flex items-center space-x-3 mb-8">
          <img src={logoImg} alt="Nakama&Partners" className="w-10 h-10 drop-shadow-[0_0_14px_rgba(16,185,129,0.35)]" />
          <div>
            <h1 className="font-cormorant text-xl font-bold text-emerald-50">Nakama&Partners</h1>
            <p className="text-emerald-300 text-xs">Portal de Partner</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { key: "perfil", label: "Perfil", icon: User },
            { key: "resumen", label: "Resumen", icon: BarChart3 },
            { key: "clientes", label: "Clientes", icon: Users },
            { key: "contratos", label: "Contratos", icon: FileText },
            { key: "herramientas", label: "Herramientas", icon: Briefcase },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={[
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                activeTab === key
                  ? "bg-emerald-600/20 border border-emerald-500/30 text-emerald-50 shadow-[0_8px_24px_-12px_rgba(16,185,129,0.45)]"
                  : "text-emerald-200 hover:bg-emerald-900/10",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}

          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-emerald-200 hover:text-emerald-50 hover:bg-emerald-900/10 mt-2"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Cerrar sesión
          </Button>
        </nav>

        {/* Badge estado */}
        <div className="mt-auto pt-8">
          <div className="bg-gradient-to-r from-emerald-600/15 to-emerald-400/10 border border-emerald-500/25 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-50 text-sm font-medium">{partnerStats.tier}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 ml-64">
        {/* ===== PERFIL con bloque a ancho completo (igual que cliente) ===== */}
        {activeTab === "perfil" && (
          <div>
            <h1 className="text-3xl font-bold text-emerald-50 mb-2">Perfil de Partner</h1>
            <p className="text-emerald-200/80 mb-6">Gestiona tu información personal y configuración de cuenta</p>

            {/* 🔴 CAMBIO: se elimina max-w-4xl mx-auto para ocupar todo el ancho, igual que en Cliente */}
            <Card className="bg-black/40 backdrop-blur-sm border border-emerald-500/15 rounded-2xl">
              <CardContent className="p-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-emerald-500/15 rounded-xl">
                    <TabsTrigger
                      value="personal"
                      className="data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-50 rounded-lg"
                    >
                      Información Personal
                    </TabsTrigger>
                    <TabsTrigger
                      value="kyc"
                      className="data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-50 rounded-lg"
                    >
                      Estado KYC
                    </TabsTrigger>
                  </TabsList>

                  {/* === Información Personal (como en cliente) === */}
                  <TabsContent value="personal" className="mt-6">
                    <form className="space-y-6">
                      {/* Foto de perfil + botón cámara */}
                      <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-4">
                          <div className="w-32 h-32 rounded-full overflow-hidden bg-black/50 border-2 border-emerald-500/20 flex items-center justify-center">
                            {profilePhoto ? (
                              <img src={profilePhoto} alt="Foto de perfil" className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-16 h-16 text-emerald-300" />
                            )}
                          </div>
                          <label
                            htmlFor="photo-upload"
                            className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-500 rounded-full p-2 cursor-pointer transition-colors"
                          >
                            <Camera className="w-4 h-4 text-white" />
                          </label>
                          <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        </div>
                        <p className="text-emerald-200/80 text-sm text-center">Haz clic en el icono de cámara para subir tu foto</p>
                      </div>

                      {/* Campos */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="nombre" className="text-emerald-50">
                            Nombre Completo
                          </Label>
                          <Input
                            id="nombre"
                            value={profileData.name}
                            onChange={(e) => handleProfileInputChange("name", e.target.value)}
                            className="bg-black/50 border-emerald-500/20 text-emerald-50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-emerald-50">
                            Correo Electrónico
                          </Label>
                          <Input
                            id="email"
                            value={profileData.email}
                            disabled
                            className="bg-black/60 border-emerald-500/20 text-emerald-300/80 cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="telefono" className="text-emerald-50">
                            Número de Teléfono
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-300/70" />
                            <Input
                              id="telefono"
                              value={profileData.phone}
                              onChange={(e) => handleProfileInputChange("phone", e.target.value)}
                              placeholder="Ej: +34 666 555 444"
                              className="bg-black/50 border-emerald-500/20 text-emerald-50 pl-10"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="fecha-nacimiento" className="text-emerald-50">
                            Fecha de Nacimiento
                          </Label>
                          <Input
                            id="fecha-nacimiento"
                            value={profileData.birthDate}
                            onChange={(e) => handleProfileInputChange("birthDate", e.target.value)}
                            className="bg-black/50 border-emerald-500/20 text-emerald-50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="fecha-registro" className="text-emerald-50">
                            Fecha de Registro
                          </Label>
                          <Input
                            id="fecha-registro"
                            value={profileData.registerDate}
                            disabled
                            className="bg-black/60 border-emerald-500/20 text-emerald-300/80 cursor-not-allowed"
                          />
                        </div>
                        <div />
                      </div>

                      <div>
                        <Label htmlFor="direccion" className="text-emerald-50">
                          Dirección
                        </Label>
                        <Input
                          id="direccion"
                          value={profileData.address}
                          onChange={(e) => handleProfileInputChange("address", e.target.value)}
                          className="bg-black/50 border-emerald-500/20 text-emerald-50"
                        />
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold"
                          onClick={(e) => {
                            e.preventDefault();
                            // Aquí iría tu lógica de guardado
                          }}
                        >
                          ACTUALIZAR INFORMACIÓN PERSONAL
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  {/* === Estado KYC (igual que cliente) === */}
                  <TabsContent value="kyc" className="mt-6">
                    <div className="bg-black/40 rounded-xl p-8 border border-emerald-500/15">
                      <div className="flex items-center justify-center mb-6">
                        <div className="bg-emerald-500/20 rounded-full p-3 mr-4">
                          <User className="h-8 w-8 text-emerald-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-2xl font-bold text-emerald-50 mb-1">Verificación KYC</h3>
                          <p className="text-emerald-200/80">¡Tu cuenta está verificada! Ya puedes operar sin límites.</p>
                        </div>
                        <div className="ml-auto">
                          <Badge className="bg-emerald-500 text-black px-4 py-2 text-sm font-semibold">Approved</Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "resumen" && (
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-emerald-50 mb-2">Hola, {user?.name?.split(" ")[0]}</h1>
              <p className="text-emerald-200/80 text-lg mb-6">Bienvenido a tu panel de control ejecutivo</p>

              {/* KPI grid (3 tarjetas) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  {
                    label: "Comisiones Este Mes",
                    value: `$${partnerStats.monthlyCommission.toLocaleString()}`,
                    note: "¡Excelente rendimiento!",
                    icon: DollarSign,
                  },
                  {
                    label: "Total Año 2025",
                    value: `$${(partnerStats.ytdCommission / 1000).toFixed(0)}K`,
                    note: "Objetivo: $250K (75% completado)",
                    icon: Trophy,
                  },
                  {
                    label: partnerStats.daysToCommission === 1 ? "Día para Cobro" : "Días para Cobro",
                    value: `${partnerStats.daysToCommission}`,
                    note:
                      partnerStats.daysToCommission <= 0
                        ? "¡Hoy es día de pago!"
                        : partnerStats.daysToCommission === 1
                        ? "Mañana es día de pago"
                        : "Próximo pago de comisiones",
                    icon: Calendar,
                  },
                ].map(({ label, value, note, icon: Icon }, i) => (
                  <Card
                    key={i}
                    className="bg-black/40 border border-emerald-500/15 rounded-2xl shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_20px_60px_-20px_rgba(16,185,129,0.25)]"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-emerald-200/80 text-sm font-medium">{label}</p>
                          <p className="text-emerald-50 text-3xl font-bold">{value}</p>
                          <p className="text-emerald-400 text-xs">{note}</p>
                        </div>
                        <Icon className="w-8 h-8 text-emerald-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Tarjeta alargada de progreso */}
              <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_20px_60px_-20px_rgba(16,185,129,0.25)] mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <p className="text-emerald-200/80 text-sm font-medium">Progreso hacia Diamond Partner</p>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-50 text-4xl md:text-5xl font-extrabold">
                          {partnerStats.nextTierProgress}%
                        </span>
                        <Crown className="w-8 h-8 text-emerald-400" />
                      </div>
                      <p className="text-emerald-400 text-sm">Faltan $820K en volumen</p>
                    </div>

                    <div className="w-full md:max-w-xl">
                      <Progress
                        value={partnerStats.nextTierProgress}
                        className="h-4 bg-emerald-900/30 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-400"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Métricas secundarias */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: "Clientes Activos", value: partnerStats.totalClients, icon: Users },
                {
                  label: "Volumen Total",
                  value: `$${(partnerStats.activeInvestments / 1_000_000).toFixed(1)}M`,
                  icon: TrendingUp,
                },
                { label: "Nuevos Leads", value: partnerStats.newLeadsThisMonth, icon: UserPlus },
              ].map(({ label, value, icon: Icon }, i) => (
                <Card key={i} className="bg-black/40 border border-emerald-500/15 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-200/80 text-sm font-medium">{label}</p>
                        <p className="text-emerald-50 text-3xl font-bold">{value}</p>
                        <p className="text-emerald-400 text-xs">Actualizado</p>
                      </div>
                      <Icon className="w-8 h-8 text-emerald-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Chart */}
            <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl mb-8">
              <CardHeader>
                <CardTitle className="text-emerald-50">Comparación: Con vs Sin Interés Compuesto</CardTitle>
                <CardDescription className="text-emerald-200/80">
                  Visualización del crecimiento de €50,000 con 9% anual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CompoundInterestChart initialAmount={50000} rate={0.09} years={10} />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "clientes" && (
          <div>
            <h1 className="text-3xl font-bold text-emerald-50 mb-2">Gestión de Clientes</h1>
            <p className="text-emerald-200/80 mb-6">Administra tu cartera de inversores y gestiona renovaciones</p>

            {/* Filtros */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-emerald-500/20 text-emerald-50 hover:bg-emerald-900/10"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                </Button>

                {(Object.values(filters).some((v) => v !== "") || sortOrder !== "") && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setFilters({
                        inversionMin: "",
                        inversionMax: "",
                        gananciasMin: "",
                        gananciasMax: "",
                        pais: "",
                        sexo: "",
                        estado: "",
                      });
                      setSortOrder("");
                    }}
                    className="text-emerald-200 hover:text-emerald-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpiar Filtros
                  </Button>
                )}
              </div>

              {showFilters && (
                <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Orden */}
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Ordenar por inversión</Label>
                        <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as "asc" | "desc")}>
                          <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                            <SelectValue placeholder="Sin orden" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="desc">Mayor a menor</SelectItem>
                            <SelectItem value="asc">Menor a mayor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-emerald-50">Inversión Inicial</Label>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Mín"
                            value={filters.inversionMin}
                            onChange={(e) => setFilters({ ...filters, inversionMin: e.target.value })}
                            className="bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                          />
                          <Input
                            placeholder="Máx"
                            value={filters.inversionMax}
                            onChange={(e) => setFilters({ ...filters, inversionMax: e.target.value })}
                            className="bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-emerald-50">Dinero Ganado</Label>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Mín"
                            value={filters.gananciasMin}
                            onChange={(e) => setFilters({ ...filters, gananciasMin: e.target.value })}
                            className="bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                          />
                          <Input
                            placeholder="Máx"
                            value={filters.gananciasMax}
                            onChange={(e) => setFilters({ ...filters, gananciasMax: e.target.value })}
                            className="bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-emerald-50">País</Label>
                        <Select value={filters.pais} onValueChange={(value) => setFilters({ ...filters, pais: value })}>
                          <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                            <SelectValue placeholder="Seleccionar país" />
                          </SelectTrigger>
                          <SelectContent>
                            {["España", "Francia", "Portugal", "Italia", "Alemania"].map((p) => (
                              <SelectItem key={p} value={p}>
                                {p}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-emerald-50">Sexo</Label>
                        <Select value={filters.sexo} onValueChange={(value) => setFilters({ ...filters, sexo: value })}>
                          <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                            <SelectValue placeholder="Seleccionar sexo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hombre">Hombre</SelectItem>
                            <SelectItem value="Mujer">Mujer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-emerald-50">Estado</Label>
                        <Select value={filters.estado} onValueChange={(value) => setFilters({ ...filters, estado: value })}>
                          <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Activo">Activo</SelectItem>
                            <SelectItem value="Vencido">Vencido</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Stats rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { value: "4", label: "Total Clientes" },
                { value: "2", label: "Activos", border: "border-emerald-500/25", text: "text-emerald-400" },
                { value: "3", label: "Con Interés Compuesto", text: "text-amber-400", border: "border-amber-500/20" },
                { value: "2", label: "Vencidos", text: "text-red-400", border: "border-red-500/20" },
              ].map((s, i) => (
                <Card key={i} className={`bg-black/40 border ${s.border || "border-emerald-500/15"} rounded-2xl`}>
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold ${s.text || "text-emerald-50"}`}>{s.value}</div>
                    <p className="text-emerald-200/80 text-sm">{s.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cartera */}
            <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-emerald-50">Cartera de Clientes</CardTitle>
                <CardDescription className="text-emerald-200/80">Información detallada para seguimiento y renovaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      name: "María González",
                      investment: 150000,
                      returns: 13500,
                      tier: "Premium",
                      status: "Activo",
                      depositDate: "2024-01-15",
                      maturityDate: "2025-01-15",
                      compoundInterest: true,
                      email: "maria.gonzalez@email.com",
                      phone: "+34 666 123 456",
                      pais: "España",
                      sexo: "Mujer",
                    },
                    {
                      name: "Carlos Ruiz",
                      investment: 75000,
                      returns: 6750,
                      tier: "Standard",
                      status: "Vencido",
                      depositDate: "2024-03-10",
                      maturityDate: "2024-12-10",
                      compoundInterest: false,
                      email: "carlos.ruiz@email.com",
                      phone: "+34 666 789 012",
                      pais: "Francia",
                      sexo: "Hombre",
                    },
                    {
                      name: "Ana López",
                      investment: 200000,
                      returns: 18000,
                      tier: "Premium",
                      status: "Activo",
                      depositDate: "2024-08-20",
                      maturityDate: "2025-08-20",
                      compoundInterest: true,
                      email: "ana.lopez@email.com",
                      phone: "+34 666 345 678",
                      pais: "Portugal",
                      sexo: "Mujer",
                    },
                    {
                      name: "Miguel Santos",
                      investment: 120000,
                      returns: 10800,
                      tier: "Premium",
                      status: "Vencido",
                      depositDate: "2023-11-15",
                      maturityDate: "2024-11-15",
                      compoundInterest: true,
                      email: "miguel.santos@email.com",
                      phone: "+34 666 987 654",
                      pais: "España",
                      sexo: "Hombre",
                    },
                  ]
                    .filter((client) => {
                      const inversionMin = filters.inversionMin ? parseFloat(filters.inversionMin) : 0;
                      const inversionMax = filters.inversionMax ? parseFloat(filters.inversionMax) : Infinity;
                      const gananciasMin = filters.gananciasMin ? parseFloat(filters.gananciasMin) : 0;
                      const gananciasMax = filters.gananciasMax ? parseFloat(filters.gananciasMax) : Infinity;

                      return (
                        client.investment >= inversionMin &&
                        client.investment <= inversionMax &&
                        client.returns >= gananciasMin &&
                        client.returns <= gananciasMax &&
                        (filters.pais === "" || client.pais === filters.pais) &&
                        (filters.sexo === "" || client.sexo === filters.sexo) &&
                        (filters.estado === "" || client.status === filters.estado)
                      );
                    })
                    .sort((a, b) => {
                      if (sortOrder === "desc") return b.investment - a.investment;
                      if (sortOrder === "asc") return a.investment - b.investment;
                      return 0;
                    })
                    .map((client, index) => {
                      const daysToMaturity = Math.ceil(
                        (new Date(client.maturityDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
                      );
                      const isNearMaturity = daysToMaturity <= 30 && daysToMaturity > 0;
                      const isExpired = daysToMaturity <= 0;

                      return (
                        <Card
                          key={index}
                          className={`bg-black/30 border ${
                            isNearMaturity ? "border-amber-500/50" : isExpired ? "border-red-500/50" : "border-emerald-500/15"
                          } hover:bg-black/40 transition-all rounded-2xl`}
                        >
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              {/* Info (izquierda) */}
                              <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 rounded-full flex items-center justify-center">
                                    <span className="text-emerald-400 font-semibold">
                                      {client.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </span>
                                  </div>
                                  <div>
                                    <h3 className="text-emerald-50 font-semibold text-lg">{client.name}</h3>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant="outline" className="text-xs border-emerald-500/25 text-emerald-200">
                                        {client.tier}
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className={`text-xs border ${
                                          client.status === "Activo"
                                            ? "border-emerald-500/40 text-emerald-300"
                                            : isNearMaturity
                                            ? "border-amber-500/40 text-amber-300"
                                            : "border-emerald-500/25 text-emerald-200"
                                        }`}
                                      >
                                        {client.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                  <p className="text-emerald-200/80">{client.email}</p>
                                  <p className="text-emerald-200/80">{client.phone}</p>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="outline" className="text-xs border-emerald-500/20 text-emerald-200/90">
                                      {client.pais}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs border-emerald-500/20 text-emerald-200/90">
                                      {client.sexo}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              {/* Detalles (centro) */}
                              <div className="space-y-4">
                                <div>
                                  <p className="text-emerald-200/80 text-sm">Inversión Inicial</p>
                                  <p className="text-emerald-50 font-bold text-2xl">${client.investment.toLocaleString()}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  {/* Izquierda: Depósito + Interés Compuesto */}
                                  <div className="space-y-2">
                                    <div>
                                      <p className="text-emerald-200/80">Fecha Depósito</p>
                                      <p className="text-emerald-50 font-medium">
                                        {new Date(client.depositDate).toLocaleDateString("es-ES")}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-emerald-200/80">Interés Compuesto</p>
                                      <p className={`font-medium ${client.compoundInterest ? "text-emerald-400" : "text-amber-400"}`}>
                                        {client.compoundInterest ? "Sí" : "No"}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Derecha: Vencimiento */}
                                  <div>
                                    <p className="text-emerald-200/80">Fecha Vencimiento</p>
                                    <p className="text-emerald-50 font-medium">
                                      {new Date(client.maturityDate).toLocaleDateString("es-ES")}
                                    </p>
                                    <p
                                      className={`text-sm font-medium ${
                                        isExpired ? "text-red-400" : isNearMaturity ? "text-amber-400" : "text-emerald-400"
                                      }`}
                                    >
                                      {isExpired
                                        ? "Vencido"
                                        : isNearMaturity
                                        ? `Vence en ${daysToMaturity} días`
                                        : `${daysToMaturity} días restantes`}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Derecha: Rendimientos + botones */}
                              <div className="space-y-4">
                                <div>
                                  <p className="text-emerald-200/80 text-sm">Rendimientos</p>
                                  <p className="text-emerald-400 font-extrabold text-3xl">+${client.returns.toLocaleString()}</p>
                                </div>

                                <div className="space-y-2">
                                  {(isNearMaturity || isExpired) && (
                                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm">
                                      Gestionar Renovación
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    className="w-full text-emerald-50 border-emerald-500/20 hover:bg-emerald-900/10 text-sm"
                                  >
                                    Ver Detalle Completo
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "contratos" && (
          <div>
            <h1 className="text-3xl font-bold text-emerald-50 mb-2">Contratos Firmados</h1>
            <p className="text-emerald-200/80 mb-6">Accede y descarga todos tus contratos y documentos legales</p>

            {/* ===== Filtros Contratos ===== */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowContractFilters(!showContractFilters)}
                  className="border-emerald-500/20 text-emerald-50 hover:bg-emerald-900/10"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showContractFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                </Button>

                {(Object.values(contractFilters).some((v) => v !== "") || contractSort !== "") && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setContractFilters({
                        search: "",
                        status: "",
                        type: "",
                        tier: "",
                        amountMin: "",
                        amountMax: "",
                        signedFrom: "",
                        signedTo: "",
                        vencimiento: "",
                      });
                      setContractSort("");
                    }}
                    className="text-emerald-200 hover:text-emerald-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpiar Filtros
                  </Button>
                )}
              </div>

              {showContractFilters && (
                <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Búsqueda */}
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Búsqueda</Label>
                        <Input
                          placeholder="Buscar por ID, cliente, título o tipo…"
                          value={contractFilters.search}
                          onChange={(e) => setContractFilters({ ...contractFilters, search: e.target.value })}
                          className="bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                        />
                      </div>

                      {/* Estado */}
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Estado</Label>
                        <Select value={contractFilters.status} onValueChange={(value) => setContractFilters({ ...contractFilters, status: value })}>
                          <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Activo">Activo</SelectItem>
                            <SelectItem value="Vigente">Vigente</SelectItem>
                            <SelectItem value="Vencido">Vencido</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Tipo */}
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Tipo</Label>
                        <Select value={contractFilters.type} onValueChange={(value) => setContractFilters({ ...contractFilters, type: value })}>
                          <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Partnership">Partnership</SelectItem>
                            <SelectItem value="Inversión">Inversión</SelectItem>
                            <SelectItem value="Renovación">Renovación</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Tier */}
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Tier</Label>
                        <Select value={contractFilters.tier} onValueChange={(value) => setContractFilters({ ...contractFilters, tier: value })}>
                          <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Elite">Elite</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                            <SelectItem value="Standard">Standard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Importe */}
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Importe (€)</Label>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Mín"
                            value={contractFilters.amountMin}
                            onChange={(e) => setContractFilters({ ...contractFilters, amountMin: e.target.value })}
                            className="bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                          />
                          <Input
                            placeholder="Máx"
                            value={contractFilters.amountMax}
                            onChange={(e) => setContractFilters({ ...contractFilters, amountMax: e.target.value })}
                            className="bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                          />
                        </div>
                        <p className="text-xs text-emerald-200/70">* Solo aplica a contratos de Inversión</p>
                      </div>

                      {/* Firmado desde / hasta */}
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Firmado (desde)</Label>
                        <Input
                          type="date"
                          value={contractFilters.signedFrom}
                          onChange={(e) => setContractFilters({ ...contractFilters, signedFrom: e.target.value })}
                          className="bg-black/50 border-emerald-500/20 text-emerald-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Firmado (hasta)</Label>
                        <Input
                          type="date"
                          value={contractFilters.signedTo}
                          onChange={(e) => setContractFilters({ ...contractFilters, signedTo: e.target.value })}
                          className="bg-black/50 border-emerald-500/20 text-emerald-50"
                        />
                      </div>

                      {/* Vencimiento */}
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Vencimiento</Label>
                        <Select value={contractFilters.vencimiento} onValueChange={(value) => setContractFilters({ ...contractFilters, vencimiento: value })}>
                          <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="expiring">Por vencer (≤ 30 días)</SelectItem>
                            <SelectItem value="expired">Vencido</SelectItem>
                            <SelectItem value="vigente">Vigente (&gt; 30 días)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Orden */}
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Ordenar por</Label>
                        <Select value={contractSort} onValueChange={(v) => setContractSort(v as any)}>
                          <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                            <SelectValue placeholder="Sin orden" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="amountDesc">Monto (Mayor a menor)</SelectItem>
                            <SelectItem value="amountAsc">Monto (Menor a mayor)</SelectItem>
                            <SelectItem value="endAsc">Vencimiento (Próximos primero)</SelectItem>
                            <SelectItem value="endDesc">Vencimiento (Lejanos primero)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            {/* ===== Fin filtros Contratos ===== */}

            {/* Datos y render de contratos filtrados */}
            {(() => {
              const contractsData = [
                {
                  id: "CONT-2025-001",
                  title: "Acuerdo de Partnership Elite",
                  client: "Nakama&Partners",
                  signedDate: "2025-01-15",
                  endDate: "2026-01-15",
                  type: "Partnership",
                  status: "Activo",
                  fileSize: "2.3 MB",
                  tier: "Elite",
                  investment: null as number | null,
                },
                {
                  id: "CONT-2024-087",
                  title: "Contrato de Inversión - María González",
                  client: "María González",
                  signedDate: "2024-01-15",
                  endDate: "2025-01-15",
                  type: "Inversión",
                  status: "Vigente",
                  fileSize: "1.8 MB",
                  tier: "Premium",
                  investment: 150000,
                },
                {
                  id: "CONT-2024-103",
                  title: "Contrato de Inversión - Carlos Ruiz",
                  client: "Carlos Ruiz",
                  signedDate: "2024-03-10",
                  endDate: "2024-12-10",
                  type: "Inversión",
                  status: "Vencido",
                  fileSize: "1.9 MB",
                  tier: "Standard",
                  investment: 75000,
                },
                {
                  id: "CONT-2024-156",
                  title: "Contrato de Inversión - Ana López",
                  client: "Ana López",
                  signedDate: "2024-08-20",
                  endDate: "2025-08-20",
                  type: "Inversión",
                  status: "Vigente",
                  fileSize: "2.1 MB",
                  tier: "Premium",
                  investment: 200000,
                },
                {
                  id: "CONT-2023-234",
                  title: "Contrato de Inversión - Miguel Santos",
                  client: "Miguel Santos",
                  signedDate: "2023-11-15",
                  endDate: "2024-11-15",
                  type: "Inversión",
                  status: "Vencido",
                  fileSize: "2.0 MB",
                  tier: "Premium",
                  investment: 120000,
                },
                {
                  id: "CONT-2025-003",
                  title: "Renovación Partnership 2025",
                  client: "Nakama&Partners",
                  signedDate: "2025-01-01",
                  endDate: "2026-01-01",
                  type: "Renovación",
                  status: "Activo",
                  fileSize: "2.7 MB",
                  tier: "Elite",
                  investment: null as number | null,
                },
              ];

              const filteredContracts = contractsData
                .filter((c) => {
                  const q = contractFilters.search.toLowerCase();
                  const matchesSearch =
                    !q ||
                    c.id.toLowerCase().includes(q) ||
                    c.title.toLowerCase().includes(q) ||
                    c.client.toLowerCase().includes(q) ||
                    c.type.toLowerCase().includes(q);

                  const matchesStatus = !contractFilters.status || c.status === contractFilters.status;
                  const matchesType = !contractFilters.type || c.type === contractFilters.type;
                  const matchesTier = !contractFilters.tier || c.tier === contractFilters.tier;

                  const hasAmountFilter = contractFilters.amountMin !== "" || contractFilters.amountMax !== "";
                  const minA = contractFilters.amountMin ? parseFloat(contractFilters.amountMin) : -Infinity;
                  const maxA = contractFilters.amountMax ? parseFloat(contractFilters.amountMax) : Infinity;
                  const matchesAmount = hasAmountFilter ? c.investment !== null && c.investment >= minA && c.investment <= maxA : true;

                  const signed = new Date(c.signedDate).getTime();
                  const fromOk = !contractFilters.signedFrom || signed >= new Date(contractFilters.signedFrom).getTime();
                  const toOk = !contractFilters.signedTo || signed <= new Date(contractFilters.signedTo).getTime();

                  const daysToEnd = Math.ceil((new Date(c.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                  const matchesVenc =
                    !contractFilters.vencimiento ||
                    (contractFilters.vencimiento === "expiring" && daysToEnd <= 30 && daysToEnd > 0) ||
                    (contractFilters.vencimiento === "expired" && daysToEnd <= 0) ||
                    (contractFilters.vencimiento === "vigente" && daysToEnd > 30);

                  return matchesSearch && matchesStatus && matchesType && matchesTier && matchesAmount && fromOk && toOk && matchesVenc;
                })
                .sort((a, b) => {
                  if (contractSort === "amountDesc") {
                    return (b.investment ?? -1) - (a.investment ?? -1);
                  }
                  if (contractSort === "amountAsc") {
                    return (a.investment ?? Number.MAX_SAFE_INTEGER) - (b.investment ?? Number.MAX_SAFE_INTEGER);
                  }
                  if (contractSort === "endAsc") {
                    return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
                  }
                  if (contractSort === "endDesc") {
                    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
                  }
                  return 0;
                });

              return (
                <>
                  {/* Resumen filtrado */}
                  <Card className="bg-gradient-to-r from-emerald-600/15 to-emerald-400/10 border border-emerald-500/30 rounded-2xl mb-6">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-emerald-50 font-bold text-xl">Tu Progreso como Asesor</h3>
                          <p className="text-emerald-400 text-sm">¡Sigue creciendo tu cartera de clientes!</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-emerald-400">{filteredContracts.length}</div>
                          <p className="text-emerald-200/80 text-sm">Contratos filtrados</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-emerald-50">Contratos de Inversión</span>
                          <span className="text-emerald-400 font-semibold">
                            {filteredContracts.filter((c) => c.type === "Inversión").length}
                          </span>
                        </div>
                        <div className="w-full bg-black/50 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                (filteredContracts.filter((c) => c.type === "Inversión").length /
                                  Math.max(1, filteredContracts.length)) *
                                  100
                              ).toFixed(0)}%`,
                            }}
                          />
                        </div>
                        <p className="text-emerald-200/80 text-xs">* La barra muestra el porcentaje de contratos de Inversión sobre el total filtrado.</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cards de contratos (uniformes) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredContracts.map((contract, index) => {
                      const daysToEnd = Math.ceil((new Date(contract.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                      const isExpiring = daysToEnd <= 30 && daysToEnd > 0;
                      const isExpired = daysToEnd <= 0;

                      return (
                        <Card
                          key={index}
                          className={`bg-black/40 border border-emerald-500/15 hover:bg-black/50 transition-all rounded-2xl ${
                            isExpiring ? "border-amber-500/50" : isExpired ? "border-red-500/50" : ""
                          }`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                  <FileText className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-emerald-50 font-semibold text-lg">{contract.title}</h3>
                                  <p className="text-emerald-200/80 text-sm">{contract.client}</p>

                                  {/* Tier uniforme */}
                                  {contract.tier && (
                                    <div className="mt-2">
                                      <Badge variant="outline" className="text-xs border-emerald-500/25 text-emerald-200">
                                        {contract.tier}
                                      </Badge>
                                    </div>
                                  )}

                                  {typeof contract.investment === "number" && (
                                    <p className="text-emerald-400 font-semibold text-lg mt-1">
                                      ${contract.investment.toLocaleString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right space-y-2">
                                <Badge
                                  className={`${
                                    contract.status === "Activo"
                                      ? "bg-emerald-500 text-black"
                                      : contract.status === "Vigente"
                                      ? "bg-blue-500 text-white"
                                      : contract.status === "Vencido"
                                      ? "bg-red-500 text-white"
                                      : "bg-amber-500 text-black"
                                  }`}
                                >
                                  {contract.status}
                                </Badge>

                                {isExpiring && <div className="text-amber-400 text-xs font-semibold">⚠️ Vence en {daysToEnd} días</div>}
                                {isExpired && <div className="text-red-400 text-xs font-semibold">❌ Vencido</div>}
                              </div>
                            </div>

                            <div className="space-y-3 mb-6">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-emerald-200/80">ID Contrato:</span>
                                  <p className="text-emerald-50 font-mono">{contract.id}</p>
                                </div>
                                <div>
                                  <span className="text-emerald-200/80">Tipo:</span>
                                  <p className="text-emerald-50">{contract.type}</p>
                                </div>
                              </div>

                              <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                                <h4 className="text-emerald-50 font-semibold mb-3 text-center">📅 Duración del Contrato</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="text-center">
                                    <span className="text-emerald-400 text-xs font-medium block">INICIO</span>
                                    <p className="text-emerald-50 font-bold text-lg">{new Date(contract.signedDate).toLocaleDateString("es-ES")}</p>
                                  </div>
                                  <div className="text-center">
                                    <span
                                      className={`text-xs font-medium block ${
                                        isExpired ? "text-red-400" : isExpiring ? "text-amber-400" : "text-emerald-400"
                                      }`}
                                    >
                                      {isExpired ? "VENCIDO" : "VENCIMIENTO"}
                                    </span>
                                    <p
                                      className={`font-bold text-lg ${
                                        isExpired ? "text-red-400" : isExpiring ? "text-amber-400" : "text-emerald-50"
                                      }`}
                                    >
                                      {new Date(contract.endDate).toLocaleDateString("es-ES")}
                                    </p>
                                  </div>
                                </div>

                                {!isExpired && (
                                  <div className="mt-3">
                                    <div className="flex justify-between text-xs mb-1">
                                      <span className="text-emerald-200/80">Progreso del contrato</span>
                                      <span className="text-emerald-50">
                                        {Math.min(
                                          100,
                                          Math.max(
                                            0,
                                            Math.round(
                                              ((new Date().getTime() - new Date(contract.signedDate).getTime()) /
                                                (new Date(contract.endDate).getTime() - new Date(contract.signedDate).getTime())) *
                                                100
                                            )
                                          )
                                        )}
                                        %
                                      </span>
                                    </div>
                                    <div className="w-full bg-black/50 rounded-full h-2">
                                      <div
                                        className={`h-2 rounded-full ${
                                          isExpiring ? "bg-gradient-to-r from-amber-400 to-amber-600" : "bg-gradient-to-r from-emerald-500 to-emerald-400"
                                        }`}
                                        style={{
                                          width: `${Math.min(
                                            100,
                                            Math.max(
                                              0,
                                              ((new Date().getTime() - new Date(contract.signedDate).getTime()) /
                                                (new Date(contract.endDate).getTime() - new Date(contract.signedDate).getTime())) *
                                                100
                                            )
                                          )}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="grid grid-cols-1 gap-4 text-sm">
                                <div>
                                  <span className="text-emerald-200/80">Tamaño del archivo:</span>
                                  <p className="text-emerald-50">{contract.fileSize}</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex space-x-3">
                              <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white">
                                <Download className="w-4 h-4 mr-2" />
                                Descargar PDF
                              </Button>
                              <Button variant="outline" className="border-emerald-500/20 text-emerald-50 hover:bg-emerald-900/10">
                                Ver Detalles
                              </Button>
                              {isExpiring && <Button className="bg-amber-500 hover:bg-amber-600 text-black">Renovar</Button>}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Resumen al pie */}
                  <Card className="bg-gradient-to-r from-emerald-600/15 to-emerald-400/10 border border-emerald-500/30 rounded-2xl mt-8">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <FileText className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div>
                            <h3 className="text-emerald-50 font-semibold text-lg">Total de Contratos</h3>
                            <p className="text-emerald-200/80">
                              {filteredContracts.length} documento{filteredContracts.length === 1 ? "" : "s"} disponibles
                            </p>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white">
                          Descargar Todos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              );
            })()}
          </div>
        )}

        {activeTab === "herramientas" && (
          <div>
            <h1 className="text-3xl font-bold text-emerald-50 mb-2">Herramientas de Trabajo</h1>
            <p className="text-emerald-200/80 mb-6">Gestiona tus citas y reuniones con clientes</p>

            {/* Intro rápida */}
            <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl max-w-2xl mx-auto mb-8">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-emerald-400" />
                </div>

                <h2 className="text-2xl font-bold text-emerald-50 mb-4">Calendario de Citas</h2>
                <p className="text-emerald-200/80 mb-6">
                  Programa y gestiona reuniones con clientes potenciales y existentes. Sincroniza tu calendario y configura recordatorios automáticos.
                </p>

                <div className="space-y-4 mb-6">
                  {["Sincronización con Google Calendar", "Recordatorios automáticos por email", "Enlaces de videollamada automáticos"].map(
                    (t, i) => (
                      <div key={i} className="flex items-center justify-center space-x-3 text-emerald-200/80">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                        <span>{t}</span>
                      </div>
                    )
                  )}
                </div>

                <Button
                  onClick={handleOpenGoogleCalendar}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-3 text-lg font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir Google Calendar
                </Button>
              </CardContent>
            </Card>

            {/* ===== Visor integrado de Google Calendar ===== */}
            <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-emerald-50">Google Calendar (Demo Integrado)</CardTitle>
                    <CardDescription className="text-emerald-200/80">Vista embebida de un calendario público de ejemplo (Festivos España).</CardDescription>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <Button onClick={handleOpenGoogleCalendar} variant="outline" className="border-emerald-500/20">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir en nueva pestaña
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                {/* Controles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="space-y-1">
                    <Label className="text-emerald-50">Vista</Label>
                    <Select value={gcalView} onValueChange={(v: any) => setGcalView(v)}>
                      <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                        <SelectValue placeholder="Mes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">Mes</SelectItem>
                        <SelectItem value="week">Semana</SelectItem>
                        <SelectItem value="agenda">Agenda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-emerald-50 flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Zona horaria
                    </Label>
                    <Select value={gcalTz} onValueChange={setGcalTz}>
                      <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                        <SelectValue placeholder="Zona horaria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Madrid">Europe/Madrid</SelectItem>
                        <SelectItem value="Europe/Lisbon">Europe/Lisbon</SelectItem>
                        <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex md:justify-end items-end">
                    <Button onClick={handleOpenGoogleCalendar} className="w-full md:w-auto">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir Google Calendar
                    </Button>
                  </div>
                </div>

                {/* Iframe */}
                <div className="rounded-2xl overflow-hidden border border-emerald-500/15 bg-black/50 shadow-[0_0_0_1px_rgba(16,185,129,0.08),0_20px_60px_-20px_rgba(16,185,129,0.25)]">
                  <iframe
                    title="Google Calendar Demo"
                    src={gcalEmbedUrl}
                    style={{ border: 0 }}
                    width="100%"
                    height="720"
                    frameBorder={0}
                    scrolling="no"
                  />
                </div>

                <p className="text-xs text-emerald-200/70 mt-3">
                  * Para enlazar tu propio calendario, reemplaza el parámetro <code>src</code> por tu calendario público.
                </p>
              </CardContent>
            </Card>
            {/* ===== FIN Visor integrado ===== */}
          </div>
        )}
      </main>
    </div>
  );
}
