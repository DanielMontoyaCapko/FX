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
  Camera,
  Phone,
  Trash2,
  PlusCircle,
} from "lucide-react";
import logoImg from "@/assets/Logo-removeBG_1752488347081.png";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import CompoundInterestChart from "@/components/compound-interest-chart";

type Client = {
  id: string;
  name: string;
  investment: number;
  returns: number;
  tier: string;
  status: "Activo" | "Vencido";
  depositDate: string; // yyyy-mm-dd
  maturityDate: string; // yyyy-mm-dd
  compoundInterest: boolean;
  email: string;
  phone: string;
  pais: string;
  sexo: "Hombre" | "Mujer";
};

type KycStatus = "Pendiente" | "Aprobado" | "Rechazado";

export default function PartnerDashboard() {
  useScrollToTop();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("resumen");

  // Foto y teléfono (como en el dashboard de clientes)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("646 123 456");

  // ===== KYC: estado y manejadores =====
  const [kycStatus, setKycStatus] = useState<KycStatus>("Pendiente");
  const [kycDocs, setKycDocs] = useState<File[]>([]);
  const [kycFeedback, setKycFeedback] = useState<string>("");

  const handleKycUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    // (Opcional) validar tamaño y tipo
    const accepted = files.filter((f) => {
      const okType = ["image/jpeg", "image/png", "application/pdf"].includes(f.type) || f.type === "";
      const okSize = f.size <= 10 * 1024 * 1024;
      return okType && okSize;
    });
    setKycDocs(accepted);
    setKycStatus("Pendiente");
    setKycFeedback("");
  };

  const handleKycRemove = (idx: number) => {
    setKycDocs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kycDocs.length) return;
    // TODO: enviar al backend. Aquí lo dejamos como "Pendiente".
    setKycStatus("Pendiente");
    // Cuando el backend responda:
    // setKycStatus("Aprobado") o setKycStatus("Rechazado"); setKycFeedback("Motivo...");
  };

  const handleKycReupload = () => {
    setKycDocs([]);
    const input = document.getElementById("kyc-upload") as HTMLInputElement | null;
    input?.click();
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  // Filtros CLIENTES
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
  const [sortOrder, setSortOrder] = useState<"" | "asc" | "desc">("");

  // Filtros CONTRATOS
  const [showContractFilters, setShowContractFilters] = useState(false);
  const [contractSort, setContractSort] = useState<"" | "amountDesc" | "amountAsc" | "endAsc" | "endDesc">("");
  const [contractFilters, setContractFilters] = useState({
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

  // Google Calendar (herramientas)
  const [gcalView, setGcalView] = useState<"month" | "week" | "agenda">("month");
  const [gcalTz, setGcalTz] = useState<string>("Europe/Madrid");
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

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setProfilePhoto(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  // ======== CLIENTES: estado, alta y eliminación ========
  const todayISO = new Date().toISOString().slice(0, 10);
  const nextYearISO = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .slice(0, 10);

  const [clients, setClients] = useState<Client[]>([
    {
      id: "c1",
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
      id: "c2",
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
      id: "c3",
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
      id: "c4",
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
  ]);

  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState<Omit<Client, "id">>({
    name: "",
    investment: 50000,
    returns: 0,
    tier: "Standard",
    status: "Activo",
    depositDate: todayISO,
    maturityDate: nextYearISO,
    compoundInterest: true,
    email: "",
    phone: "",
    pais: "España",
    sexo: "Hombre",
  });

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name.trim()) return;
    setClients((prev) => [{ id: `c${Date.now()}`, ...newClient }, ...prev]);
    setNewClient({
      name: "",
      investment: 50000,
      returns: 0,
      tier: "Standard",
      status: "Activo",
      depositDate: todayISO,
      maturityDate: nextYearISO,
      compoundInterest: true,
      email: "",
      phone: "",
      pais: "España",
      sexo: "Hombre",
    });
    setShowAddClient(false);
  };

  // ✅ Doble verificación para eliminación
  const handleDeleteClient = (id: string, name: string) => {
    const first = confirm(`¿Seguro que quieres eliminar a "${name}"?`);
    if (!first) return;
    const second = confirm(
      `Última confirmación.\nEsta acción eliminará permanentemente a "${name}" y no se puede deshacer.\n¿Confirmas la eliminación?`
    );
    if (!second) return;
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  // KPIs de clientes (para tarjetas rápidas y otras vistas)
  const statsClients = useMemo(() => {
    const total = clients.length;
    const activos = clients.filter((c) => c.status === "Activo").length;
    const comp = clients.filter((c) => c.compoundInterest).length;
    const vencidos = clients.filter((c) => {
      const days = Math.ceil((new Date(c.maturityDate).getTime() - Date.now()) / 86400000);
      return days <= 0 || c.status === "Vencido";
    }).length;
    return { total, activos, comp, vencidos };
  }, [clients]);

  // 📊 Estadísticas superiores del dashboard RESUMEN alimentadas por los clientes
  const resumenStats = useMemo(() => {
    const activeClients = clients.filter((c) => c.status === "Activo");
    const activeVolume = activeClients.reduce((sum, c) => sum + c.investment, 0);
    const expiringSoon = activeClients.filter((c) => {
      const days = Math.ceil((new Date(c.maturityDate).getTime() - Date.now()) / 86400000);
      return days > 0 && days <= 30;
    }).length;
    return { activeClients: activeClients.length, activeVolume, expiringSoon };
  }, [clients]);

  const filteredClients = useMemo(() => {
    const list = clients
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
      });

    return list;
  }, [clients, filters, sortOrder]);

  // días hasta comisión (para KPI de pagos)
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
    monthlyCommission: 15650,
    ytdCommission: 186200,
    nextTierProgress: 79,
    daysToCommission: calculateDaysToCommission(),
    tier: "Elite Partner",
  };

  const kycBadgeClass =
    kycStatus === "Aprobado"
      ? "bg-emerald-500 text-black"
      : kycStatus === "Rechazado"
      ? "bg-red-500 text-white"
      : "bg-amber-500 text-black";

  const kycMessage =
    kycStatus === "Aprobado"
      ? "¡Tu cuenta está verificada! Ya puedes operar sin límites."
      : kycStatus === "Rechazado"
      ? kycFeedback || "Hemos detectado inconsistencias. Vuelve a subir los documentos."
      : kycDocs.length
      ? "Tus documentos están en revisión. Te notificaremos al finalizar."
      : "Aún no has subido documentos. Sube tu DNI o pasaporte para iniciar la verificación.";

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
        {/* ===== PERFIL ===== */}
        {activeTab === "perfil" && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-emerald-50">Mi Perfil</h1>
              <p className="text-emerald-200/80">Gestiona tu información personal</p>
            </div>

            <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
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

                  <TabsContent value="personal" className="mt-6">
                    <form className="space-y-6">
                      {/* Profile Photo */}
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="nombre" className="text-emerald-50">Nombre</Label>
                          <Input id="nombre" defaultValue="Test" className="bg-black/50 border-emerald-500/20 text-emerald-50" />
                        </div>
                        <div>
                          <Label htmlFor="apellidos" className="text-emerald-50">Apellidos</Label>
                          <Input id="apellidos" defaultValue="Placeholder" className="bg-black/50 border-emerald-500/20 text-emerald-50" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email" className="text-emerald-50">Correo Electrónico</Label>
                          <Input
                            id="email"
                            defaultValue="test@test.com"
                            disabled
                            className="bg-black/60 border-emerald-500/20 text-emerald-300/80 cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <Label htmlFor="telefono" className="text-emerald-50">Número de Teléfono</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-300/70" />
                            <Input
                              id="telefono"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              placeholder="Ej: +34 646 123 456"
                              className="bg-black/50 border-emerald-500/20 text-emerald-50 pl-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="fecha-nacimiento" className="text-emerald-50">Fecha de Nacimiento</Label>
                          <Input id="fecha-nacimiento" defaultValue="25/02/1962" className="bg-black/50 border-emerald-500/20 text-emerald-50" />
                        </div>
                        <div>
                          <Label htmlFor="fecha-registro" className="text-emerald-50">Fecha de Registro</Label>
                          <Input
                            id="fecha-registro"
                            defaultValue="15/01/2024"
                            disabled
                            className="bg-black/60 border-emerald-500/20 text-emerald-300/80 cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="pais" className="text-emerald-50">País</Label>
                          <Select defaultValue="espana">
                            <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black/40 border-emerald-500/15 text-emerald-50">
                              <SelectItem value="espana">España</SelectItem>
                              <SelectItem value="francia">Francia</SelectItem>
                              <SelectItem value="portugal">Portugal</SelectItem>
                              <SelectItem value="italia">Italia</SelectItem>
                              <SelectItem value="alemania">Alemania</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div />
                      </div>

                      <div>
                        <Label htmlFor="direccion" className="text-emerald-50">Dirección</Label>
                        <Input
                          id="direccion"
                          defaultValue="Calle Nueva Era 45, 2ºA, 08035 Barcelona"
                          className="bg-black/50 border-emerald-500/20 text-emerald-50"
                        />
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold"
                        >
                          ACTUALIZAR INFORMACIÓN PERSONAL
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="kyc" className="mt-6">
                    {/* Encabezado estado KYC */}
                    <div className="bg-black/40 rounded-xl p-8 border border-emerald-500/15">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-emerald-500/20 rounded-full p-3">
                          <User className="h-8 w-8 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-emerald-50 mb-1">Verificación KYC</h3>
                          <p className="text-emerald-200/80">{kycMessage}</p>
                        </div>
                        <Badge className={`${kycBadgeClass} px-4 py-2 text-sm font-semibold`}>{kycStatus}</Badge>
                      </div>

                      {/* Subida de documentos */}
                      <div className="mt-2 bg-black/40 rounded-xl p-6 border border-emerald-500/15">
                        <form onSubmit={handleKycSubmit} className="space-y-4">
                          <div className="rounded-lg border border-emerald-500/20 bg-black/30 p-4">
                            <input
                              id="kyc-upload"
                              type="file"
                              accept="image/*,application/pdf"
                              multiple
                              onChange={handleKycUpload}
                              className="hidden"
                            />
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                              <div className="text-sm">
                                <p className="text-emerald-200/90">
                                  Archivos permitidos: .jpg, .png, .pdf (máx 10MB por archivo)
                                </p>
                              </div>
                              <label
                                htmlFor="kyc-upload"
                                className="inline-flex items-center gap-2 cursor-pointer rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-sm"
                              >
                                <PlusCircle className="w-4 h-4" />
                                Seleccionar archivos
                              </label>
                            </div>

                            {!!kycDocs.length && (
                              <div className="mt-4 space-y-2">
                                {kycDocs.map((f, idx) => (
                                  <div
                                    key={`${f.name}-${idx}`}
                                    className="flex items-center justify-between rounded-md bg-black/40 border border-emerald-500/10 px-3 py-2"
                                  >
                                    <div className="flex items-center gap-3">
                                      <FileText className="w-4 h-4 text-emerald-400" />
                                      <div className="text-sm">
                                        <p className="text-emerald-50">{f.name}</p>
                                        <p className="text-emerald-300/70 text-xs">{formatBytes(f.size)}</p>
                                      </div>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      onClick={() => handleKycRemove(idx)}
                                      className="text-red-300 hover:text-red-200"
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Quitar
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              type="submit"
                              disabled={!kycDocs.length}
                              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Enviar para verificación
                            </Button>

                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleKycReupload}
                              className="border-emerald-500/25 text-emerald-50 hover:bg-emerald-900/10"
                            >
                              Volver a subir
                            </Button>
                          </div>

                          {kycStatus === "Aprobado" && (
                            <p className="text-emerald-200/80 text-sm">Verificación completada. ¡Gracias!</p>
                          )}
                          {kycStatus === "Pendiente" && kycDocs.length > 0 && (
                            <p className="text-emerald-200/80 text-sm">
                              Tus documentos están en revisión. Te notificaremos al finalizar.
                            </p>
                          )}
                          {kycStatus === "Rechazado" && (
                            <p className="text-amber-300 text-sm">
                              {kycFeedback || "Revisa tus documentos y vuelve a subirlos."}
                            </p>
                          )}
                        </form>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ===== RESUMEN ===== */}
        {activeTab === "resumen" && (
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-emerald-50 mb-2">
                Hola, {user?.name?.split(" ")[0] ?? "Partner"}
              </h1>
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
                    icon: Star,
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

              {/* Progreso hacia tier */}
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

            {/* Métricas superiores DINÁMICAS basadas en clientes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: "Clientes Activos", value: resumenStats.activeClients, icon: Users },
                {
                  label: "Volumen Activo",
                  value: `$${resumenStats.activeVolume.toLocaleString()}`,
                  icon: TrendingUp,
                },
                { label: "Por vencer (≤30 días)", value: resumenStats.expiringSoon, icon: UserPlus },
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

        {/* ===== CLIENTES ===== */}
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

            {/* Stats rápidos (dinámicos) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { value: String(statsClients.total), label: "Total Clientes" },
                { value: String(statsClients.activos), label: "Activos", border: "border-emerald-500/25", text: "text-emerald-400" },
                { value: String(statsClients.comp), label: "Con Interés Compuesto", text: "text-amber-400", border: "border-amber-500/20" },
                { value: String(statsClients.vencidos), label: "Vencidos", text: "text-red-400", border: "border-red-500/20" },
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
              {/* Encabezado izquierda + botón */}
              <CardHeader className="items-start">
                <CardTitle className="text-emerald-50">Cartera de Clientes</CardTitle>
                <CardDescription className="text-emerald-200/80">
                  Información detallada para seguimiento y renovaciones
                </CardDescription>
                <div className="mt-4">
                  <Button
                    variant={showAddClient ? "outline" : "default"}
                    onClick={() => setShowAddClient((v) => !v)}
                    className={showAddClient ? "border-emerald-500/25" : "bg-emerald-600 hover:bg-emerald-500"}
                  >
                    {showAddClient ? <X className="w-4 h-4 mr-2" /> : <PlusCircle className="w-4 h-4 mr-2" />}
                    {showAddClient ? "Cancelar" : "Añadir cliente"}
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {/* Formulario alta */}
                {showAddClient && (
                  <form
                    onSubmit={handleAddClient}
                    className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4 bg-black/30 p-4 rounded-xl border border-emerald-500/15"
                  >
                    <div className="space-y-1">
                      <Label className="text-emerald-50">Nombre</Label>
                      <Input
                        value={newClient.name}
                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                        className="bg-black/50 border-emerald-500/20 text-emerald-50"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-50">Email</Label>
                      <Input
                        value={newClient.email}
                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                        className="bg-black/50 border-emerald-500/20 text-emerald-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-50">Teléfono</Label>
                      <Input
                        value={newClient.phone}
                        onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                        className="bg-black/50 border-emerald-500/20 text-emerald-50"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-emerald-50">Inversión (€)</Label>
                      <Input
                        type="number"
                        value={newClient.investment}
                        onChange={(e) => setNewClient({ ...newClient, investment: parseFloat(e.target.value || "0") })}
                        className="bg-black/50 border-emerald-500/20 text-emerald-50"
                        min={0}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-50">Rendimientos (€)</Label>
                      <Input
                        type="number"
                        value={newClient.returns}
                        onChange={(e) => setNewClient({ ...newClient, returns: parseFloat(e.target.value || "0") })}
                        className="bg-black/50 border-emerald-500/20 text-emerald-50"
                        min={0}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-50">Tier</Label>
                      <Select value={newClient.tier} onValueChange={(v) => setNewClient({ ...newClient, tier: v })}>
                        <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                          <SelectValue placeholder="Tier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Elite">Elite</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-emerald-50">Estado</Label>
                      <Select value={newClient.status} onValueChange={(v: "Activo" | "Vencido") => setNewClient({ ...newClient, status: v })}>
                        <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                          <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Activo">Activo</SelectItem>
                          <SelectItem value="Vencido">Vencido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-emerald-50">Fecha Depósito</Label>
                      <Input
                        type="date"
                        value={newClient.depositDate}
                        onChange={(e) => setNewClient({ ...newClient, depositDate: e.target.value })}
                        className="bg-black/50 border-emerald-500/20 text-emerald-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-50">Fecha Vencimiento</Label>
                      <Input
                        type="date"
                        value={newClient.maturityDate}
                        onChange={(e) => setNewClient({ ...newClient, maturityDate: e.target.value })}
                        className="bg-black/50 border-emerald-500/20 text-emerald-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-50">País</Label>
                      <Select value={newClient.pais} onValueChange={(v) => setNewClient({ ...newClient, pais: v })}>
                        <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                          <SelectValue placeholder="País" />
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
                    <div className="space-y-1">
                      <Label className="text-emerald-50">Sexo</Label>
                      <Select value={newClient.sexo} onValueChange={(v: "Hombre" | "Mujer") => setNewClient({ ...newClient, sexo: v })}>
                        <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                          <SelectValue placeholder="Sexo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hombre">Hombre</SelectItem>
                          <SelectItem value="Mujer">Mujer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-50">Interés Compuesto</Label>
                      <Select
                        value={newClient.compoundInterest ? "si" : "no"}
                        onValueChange={(v) => setNewClient({ ...newClient, compoundInterest: v === "si" })}
                      >
                        <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                          <SelectValue placeholder="Sí / No" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">Sí</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Guardar
                      </Button>
                    </div>
                  </form>
                )}

                {/* Lista de clientes */}
                <div className="space-y-6">
                  {filteredClients.map((client) => {
                    const daysToMaturity = Math.ceil(
                      (new Date(client.maturityDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
                    );
                    const isNearMaturity = daysToMaturity <= 30 && daysToMaturity > 0;
                    const isExpired = daysToMaturity <= 0;

                    return (
                      <Card
                        key={client.id}
                        className={`relative bg-black/30 border ${
                          isNearMaturity ? "border-amber-500/50" : isExpired ? "border-red-500/50" : "border-emerald-500/15"
                        } hover:bg-black/40 transition-all rounded-2xl`}
                      >
                        {/* Eliminar */}
                        <div className="absolute top-3 right-3 z-[1]">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteClient(client.id, client.name)}
                            className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                            title="Eliminar cliente"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Info */}
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

                            {/* Detalles */}
                            <div className="space-y-4">
                              <div>
                                <p className="text-emerald-200/80 text-sm">Inversión Inicial</p>
                                <p className="text-emerald-50 font-bold text-2xl">${client.investment.toLocaleString()}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-sm">
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

                            {/* Rendimientos + acciones */}
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

        {/* ===== CONTRATOS ===== */}
        {activeTab === "contratos" && (
          <div>
            <h1 className="text-3xl font-bold text-emerald-50 mb-2">Contratos Firmados</h1>
            <p className="text-emerald-200/80 mb-6">Accede y descarga todos tus contratos y documentos legales</p>

            {/* Filtros Contratos */}
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
                            <SelectItem value="Inversión">Inversión</SelectItem>
                            <SelectItem value="Afiliación">Afiliación</SelectItem>
                            <SelectItem value="NDA">NDA</SelectItem>
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
                            <SelectItem value="Standard">Standard</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                            <SelectItem value="Elite">Elite</SelectItem>
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
                      </div>

                      {/* Firmado entre */}
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Firmado desde</Label>
                        <Input
                          type="date"
                          value={contractFilters.signedFrom}
                          onChange={(e) => setContractFilters({ ...contractFilters, signedFrom: e.target.value })}
                          className="bg-black/50 border-emerald-500/20 text-emerald-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Firmado hasta</Label>
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
                        <Select
                          value={contractFilters.vencimiento}
                          onValueChange={(value) => setContractFilters({ ...contractFilters, vencimiento: value })}
                        >
                          <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">≤ 30 días</SelectItem>
                            <SelectItem value="60">≤ 60 días</SelectItem>
                            <SelectItem value="90">≤ 90 días</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Orden */}
                      <div className="space-y-2">
                        <Label className="text-emerald-50">Ordenar por</Label>
                        <Select value={contractSort} onValueChange={(v) => setContractSort(v as typeof contractSort)}>
                          <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                            <SelectValue placeholder="Sin orden" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="amountDesc">Importe ↓</SelectItem>
                            <SelectItem value="amountAsc">Importe ↑</SelectItem>
                            <SelectItem value="endAsc">Vencimiento más cercano</SelectItem>
                            <SelectItem value="endDesc">Vencimiento más lejano</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Lista de contratos */}
            {(() => {
              // Datos de ejemplo
              const contractsData = [
                {
                  id: "CT-2025-001",
                  cliente: "María González",
                  type: "Inversión",
                  tier: "Premium",
                  amount: 150000,
                  status: "Vigente",
                  signedDate: "2024-01-15",
                  endDate: "2025-01-15",
                  fileUrl: "#",
                },
                {
                  id: "CT-2025-002",
                  cliente: "Carlos Ruiz",
                  type: "Afiliación",
                  tier: "Standard",
                  amount: 25000,
                  status: "Activo",
                  signedDate: "2024-03-10",
                  endDate: "2024-12-10",
                  fileUrl: "#",
                },
                {
                  id: "CT-2025-003",
                  cliente: "Ana López",
                  type: "Inversión",
                  tier: "Premium",
                  amount: 200000,
                  status: "Vigente",
                  signedDate: "2024-08-20",
                  endDate: "2025-08-20",
                  fileUrl: "#",
                },
                {
                  id: "CT-2025-004",
                  cliente: "Miguel Santos",
                  type: "NDA",
                  tier: "Premium",
                  amount: 0,
                  status: "Vencido",
                  signedDate: "2023-11-15",
                  endDate: "2024-11-15",
                  fileUrl: "#",
                },
              ];

              // Filtrado
              const q = contractFilters.search.trim().toLowerCase();
              const min = contractFilters.amountMin ? parseFloat(contractFilters.amountMin) : -Infinity;
              const max = contractFilters.amountMax ? parseFloat(contractFilters.amountMax) : Infinity;
              const from = contractFilters.signedFrom ? new Date(contractFilters.signedFrom) : null;
              const to = contractFilters.signedTo ? new Date(contractFilters.signedTo) : null;
              const vencLimit = contractFilters.vencimiento ? parseInt(contractFilters.vencimiento, 10) : null;

              const filtered = contractsData
                .filter((c) => {
                  const matchSearch =
                    !q ||
                    c.id.toLowerCase().includes(q) ||
                    c.cliente.toLowerCase().includes(q) ||
                    c.type.toLowerCase().includes(q);
                  const matchStatus = !contractFilters.status || c.status === contractFilters.status;
                  const matchType = !contractFilters.type || c.type === contractFilters.type;
                  const matchTier = !contractFilters.tier || c.tier === contractFilters.tier;
                  const matchAmount = c.amount >= min && c.amount <= max;

                  const signed = new Date(c.signedDate);
                  const matchFrom = !from || signed >= from;
                  const matchTo = !to || signed <= to;

                  const end = new Date(c.endDate);
                  const daysLeft = Math.ceil((end.getTime() - Date.now()) / 86400000);
                  const matchVenc = !vencLimit || (daysLeft > 0 && daysLeft <= vencLimit);

                  return matchSearch && matchStatus && matchType && matchTier && matchAmount && matchFrom && matchTo && matchVenc;
                })
                .sort((a, b) => {
                  if (contractSort === "amountDesc") return b.amount - a.amount;
                  if (contractSort === "amountAsc") return a.amount - b.amount;
                  if (contractSort === "endAsc") return +new Date(a.endDate) - +new Date(b.endDate);
                  if (contractSort === "endDesc") return +new Date(b.endDate) - +new Date(a.endDate);
                  return 0;
                });

              return (
                <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
                  <CardHeader className="items-start">
                    <CardTitle className="text-emerald-50">Listado de Contratos</CardTitle>
                    <CardDescription className="text-emerald-200/80">
                      {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {filtered.map((c) => {
                      const end = new Date(c.endDate);
                      const daysLeft = Math.ceil((end.getTime() - Date.now()) / 86400000);
                      const isNear = daysLeft <= 30 && daysLeft > 0;
                      const isExpired = daysLeft <= 0;

                      return (
                        <Card
                          key={c.id}
                          className={`bg-black/30 border ${
                            isNear ? "border-amber-500/50" : isExpired ? "border-red-500/50" : "border-emerald-500/15"
                          } rounded-xl`}
                        >
                          <CardContent className="p-5">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                              <div className="flex items-center gap-3 md:col-span-2">
                                <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/25">
                                  <FileText className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                  <p className="text-emerald-50 font-semibold">{c.id}</p>
                                  <p className="text-emerald-200/80 text-sm">{c.type} · {c.cliente}</p>
                                </div>
                              </div>

                              <div>
                                <p className="text-emerald-200/80 text-sm">Importe</p>
                                <p className="text-emerald-50 font-bold">{c.amount ? `€${c.amount.toLocaleString()}` : "—"}</p>
                                <Badge variant="outline" className="mt-1 text-xs border-emerald-500/25 text-emerald-200">
                                  {c.tier}
                                </Badge>
                              </div>

                              <div>
                                <p className="text-emerald-200/80 text-sm">Firmado</p>
                                <p className="text-emerald-50 font-medium">{new Date(c.signedDate).toLocaleDateString("es-ES")}</p>
                                <p className="text-emerald-200/80 text-sm mt-1">Vence</p>
                                <p className="text-emerald-50 font-medium">{end.toLocaleDateString("es-ES")}</p>
                                <p
                                  className={`text-xs font-medium ${
                                    isExpired ? "text-red-400" : isNear ? "text-amber-400" : "text-emerald-400"
                                  }`}
                                >
                                  {isExpired ? "Vencido" : daysLeft === 1 ? "Mañana" : daysLeft <= 0 ? "—" : `En ${daysLeft} días`}
                                </p>
                              </div>

                              <div className="flex md:justify-end gap-2">
                                <Button
                                  variant="outline"
                                  className="border-emerald-500/25 text-emerald-50 hover:bg-emerald-900/10"
                                  onClick={() => window.open(c.fileUrl, "_blank", "noopener,noreferrer")}
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Descargar
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })()}
          </div>
        )}

        {/* ===== HERRAMIENTAS ===== */}
        {activeTab === "herramientas" && (
          <div>
            <h1 className="text-3xl font-bold text-emerald-50 mb-2">Herramientas</h1>
            <p className="text-emerald-200/80 mb-6">Gestión de agenda y utilidades</p>

            <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
              <CardHeader className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-emerald-400" />
                    <div>
                      <CardTitle className="text-emerald-50">Google Calendar</CardTitle>
                      <CardDescription className="text-emerald-200/80">Consulta festivos y organiza tus citas</CardDescription>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {/* Vista */}
                    <div className="w-40">
                      <Select value={gcalView} onValueChange={(v) => setGcalView(v as "month" | "week" | "agenda")}>
                        <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                          <SelectValue placeholder="Vista" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="month">Mes</SelectItem>
                          <SelectItem value="week">Semana</SelectItem>
                          <SelectItem value="agenda">Agenda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Zona horaria */}
                    <div className="w-56">
                      <Select value={gcalTz} onValueChange={(v) => setGcalTz(v)}>
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

                    <Button onClick={handleOpenGoogleCalendar} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                      <Calendar className="w-4 h-4 mr-2" />
                      Abrir Google Calendar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl overflow-hidden border border-emerald-500/15">
                  <iframe
                    title="Calendario público"
                    src={gcalEmbedUrl}
                    className="w-full h-[720px]"
                    style={{ border: 0 }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
