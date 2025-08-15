import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LogOut,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Plus,
  Phone,
  Package,
  User,
  Calculator,
  ArrowLeft,
  Camera,
  Filter,
  X,
} from "lucide-react";
import logoImg from "@/assets/Logo-removeBG_1752488347081.png";
import landscapeSvg from "@/assets/landscape.svg";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import CompoundInterestChart from "@/components/compound-interest-chart";
import InvestmentCalculator from "@/components/investment-calculator";

// --- Barra de progreso reutilizable ---
function ProgressBar({
  percent,
  noteWhenOver100 = false,
}: {
  percent: number;
  noteWhenOver100?: boolean;
}) {
  const capped = Math.min(percent, 100);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-sm text-emerald-200/80 mb-2">
        <span>Progreso</span>
        <span className="text-emerald-50 font-medium">{Math.round(percent)}%</span>
      </div>

      <div className="relative h-2 rounded-full bg-emerald-900/30 overflow-visible">
        <div
          className="absolute left-0 top-0 h-2 rounded-full bg-emerald-500/80"
          style={{ width: `${capped}%` }}
        />
        {percent > 100 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-2 h-2 w-6 rounded-full bg-emerald-400 shadow-[0_0_0_2px_rgba(16,185,129,0.25)]"
            aria-hidden
          />
        )}
      </div>

      {noteWhenOver100 && percent > 100 && (
        <p className="mt-2 text-xs text-emerald-200/70 italic">
          * Progreso superior al 100% (se supera el objetivo)
        </p>
      )}
    </div>
  );
}

export default function Dashboard() {
  useScrollToTop();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("inicio");
  const [showCalculator, setShowCalculator] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("646 123 456");
  const [activeProductsView, setActiveProductsView] = useState<"default" | "mis-productos" | "historial" | "transacciones" | "contratos">("default");
  const [activeProductsSubTab, setActiveProductsSubTab] = useState<"activos" | "completados" | "cancelados">("activos");

  const handleLogout = () => setLocation("/login");

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setProfilePhoto(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDownloadStatement = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      // Header
      doc.setFontSize(20);
      doc.setTextColor(16, 185, 129);
      doc.text("NAKAMA&PARTNERS", 20, 30);
      doc.setFontSize(16);
      doc.text("Estado de Cuenta", 20, 45);

      // Client info
      doc.setFontSize(12);
      doc.setTextColor(20, 20, 20);
      doc.text("Cliente: Juan Cliente", 20, 70);
      doc.text("Fecha: " + new Date().toLocaleDateString("es-ES"), 20, 80);
      doc.text("Período: Enero 2025", 20, 90);

      // Investment summary
      doc.setFontSize(14);
      doc.setTextColor(16, 185, 129);
      doc.text("RESUMEN DE INVERSIÓN", 20, 110);

      doc.setFontSize(12);
      doc.setTextColor(20, 20, 20);
      doc.text("Capital Invertido: €50.000", 20, 130);
      doc.text("Rentabilidad Anual: 9.0%", 20, 140);
      doc.text("Tiempo Transcurrido: 3 meses", 20, 150);
      doc.text("Beneficio Acumulado: €1.125", 20, 160);
      doc.text("Valor Total Actual: €51.125", 20, 170);

      // Performance details
      doc.setFontSize(14);
      doc.setTextColor(16, 185, 129);
      doc.text("DETALLE DE RENDIMIENTO", 20, 190);

      doc.setFontSize(12);
      doc.setTextColor(20, 20, 20);
      doc.text("Enero 2025: +€375", 20, 210);
      doc.text("Febrero 2025: +€375", 20, 220);
      doc.text("Marzo 2025: +€375", 20, 230);

      // Projections
      doc.setFontSize(14);
      doc.setTextColor(16, 185, 129);
      doc.text("PROYECCIÓN A FIN DE AÑO", 20, 250);

      doc.setFontSize(12);
      doc.setTextColor(20, 20, 20);
      doc.text("Beneficio Total Estimado: €4.500", 20, 270);
      doc.text("Valor Final Estimado: €54.500", 20, 280);

      doc.save("estado-cuenta-nakama-" + new Date().toISOString().split("T")[0] + ".pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error al generar el PDF. Inténtalo de nuevo.");
    }
  };

  const handleCalculateInvestment = () => setShowCalculator(true);

  // ===== KPIs (sin "Rentabilidad Anual") =====
  const kpis = [
    { title: "Capital Invertido", value: "€50.000", change: "110% del objetivo", trending: "up" as const },
    { title: "Progreso en Meses", value: "Mes 3 de 12", change: "25% del período", trending: "up" as const },
    { title: "Beneficio Total Estimado", value: "€4.500", change: "A fin de año", trending: "up" as const },
  ] as const;

  const recentActivity = [
    { type: "download", message: "Estado de cuenta descargado exitosamente", time: "hace 1 hora" },
    { type: "simulation", message: "Nueva simulación de inversión: €25.000 a 24 meses", time: "hace 2 horas" },
    { type: "download", message: "Simulación descargada con gráfico incluido", time: "hace 3 horas" },
    { type: "simulation", message: "Calculadora utilizada: €50.000 a 36 meses", time: "hace 5 horas" },
    { type: "download", message: "Estado de cuenta enero 2025 generado", time: "hace 1 día" },
  ];

  // --- Mis productos (ejemplos) ---
  const productosActivos = [
    { nombre: "Fondo de Inversión Verde Europa", estado: "En curso", cantidad: "€5.000", fechaInicio: "12/05/2025", rentabilidad: "6.2% anual" },
    { nombre: "Plan Ahorro Flexible Plus", estado: "Activo", cantidad: "€2.500", fechaInicio: "01/07/2025", rentabilidad: "3.8% anual" },
    { nombre: "Depósito Estructurado Europa", estado: "En curso", cantidad: "€8.500", fechaInicio: "22/08/2025", rentabilidad: "5.1% anual" },
  ];

  const productosCompletados = [
    { nombre: "Bono Corporativo Energía Solar", estado: "Éxito", cantidad: "€10.000", fechaInicio: "10/03/2024", fechaFin: "10/03/2025", rentabilidadFinal: "5.5%" },
    { nombre: "Fondo Tecnología Asia", estado: "Éxito", cantidad: "€7.000", fechaInicio: "15/01/2023", fechaFin: "15/01/2024", rentabilidadFinal: "4.9%" },
    { nombre: "Letra del Tesoro España 12M", estado: "Éxito", cantidad: "€6.000", fechaInicio: "01/02/2023", fechaFin: "01/02/2024", rentabilidadFinal: "3.7%" },
  ];

  const productosCancelados = [
    { nombre: "Fondo Startups LatAm", estado: "Cancelado", cantidad: "€3.000", fechaCancelacion: "02/04/2025", motivo: "No se alcanzó el capital mínimo requerido" },
    { nombre: "Plan de Ahorro Salud", estado: "Cancelado", cantidad: "€1.500", fechaCancelacion: "20/06/2025", motivo: "Cancelado por el usuario antes del inicio" },
    { nombre: "Fondo Inmobiliario Urbano", estado: "Cancelado", cantidad: "€4.000", fechaCancelacion: "15/05/2025", motivo: "Documentación incompleta del cliente" },
  ];

  // ===== Helpers parsing =====
  const parseEuro = (s: string) => {
    const num = s.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
    const n = Number(num);
    return isNaN(n) ? 0 : n;
  };
  const parsePercent = (s?: string) => {
    if (!s) return 0;
    const num = s.replace(/[^\d,.-]/g, "").replace(",", ".");
    const n = Number(num);
    return isNaN(n) ? 0 : n;
  };
  const parseESDate = (s: string) => {
    const [d, m, y] = s.split("/").map((p) => parseInt(p, 10));
    return new Date(y, m - 1, d);
  };

  // ====== FILTROS: Mis Productos ======
  const [showMPFilters, setShowMPFilters] = useState(false);
  const [mpSort, setMpSort] = useState<"" | "cantidadDesc" | "cantidadAsc" | "fechaAsc" | "fechaDesc" | "rentDesc" | "rentAsc">("");
  const [mpFilters, setMpFilters] = useState({ search: "", cantidadMin: "", cantidadMax: "", fechaFrom: "", fechaTo: "", rentMin: "", rentMax: "" });

  // ====== FILTROS: Historial ======
  const [showHistFilters, setShowHistFilters] = useState(false);
  const [histFilters, setHistFilters] = useState({ search: "", dateFrom: "", dateTo: "", tipo: "" });

  // ====== FILTROS: Transacciones ======
  const [showTxFilters, setShowTxFilters] = useState(false);
  const [txSort, setTxSort] = useState<"" | "dateDesc" | "dateAsc" | "cantidadDesc" | "cantidadAsc">("");
  const [txFilters, setTxFilters] = useState({ search: "", tipo: "", estado: "", cantidadMin: "", cantidadMax: "", dateFrom: "", dateTo: "" });

  const transacciones = [
    { fecha: "2025-01-15", tipo: "Depósito", descripcion: "Depósito inicial producto 9%", cantidad: 50000, estado: "Completada" },
    { fecha: "2025-02-15", tipo: "Intereses", descripcion: "Intereses mensuales", cantidad: 375, estado: "Completada" },
    { fecha: "2025-03-10", tipo: "Retiro", descripcion: "Retiro parcial", cantidad: -1000, estado: "Pendiente" },
    { fecha: "2025-04-15", tipo: "Intereses", descripcion: "Intereses mensuales", cantidad: 375, estado: "Completada" },
  ];

  // ====== FILTROS: Contratos ======
  const [showCFilters, setShowCFilters] = useState(false);
  const [cSort, setCSort] = useState<"" | "dateDesc" | "dateAsc">("");
  const [cFilters, setCFilters] = useState({ search: "", estado: "", dateFrom: "", dateTo: "", tipo: "" });

  const contratosCliente = [
    { id: "DOC-PLAZO-9-365", titulo: "Contrato Plazo Fijo 9% - 365 días", descripcion: "Contrato de depósito bancario con garantía", tipo: "PDF", tamano: "2.3 MB", fecha: "2025-01-01", estado: "Disponible", categoria: "Producto" },
    { id: "DOC-INFO-PRIV", titulo: "Política de Privacidad", descripcion: "Documento legal informado al cliente", tipo: "PDF", tamano: "0.6 MB", fecha: "2024-12-01", estado: "Disponible", categoria: "Legal" },
  ];

  return (
    <div
      className={[
        "relative min-h-screen text-white flex overflow-hidden",
        "bg-gradient-to-br from-black via-[#0A1713] to-[#0E2A1F]",
        "before:pointer-events-none before:absolute before:inset-0",
        "before:bg-[radial-gradient(80%_60%_at_110%_-10%,rgba(16,185,129,0.18),transparent),radial-gradient(60%_40%_at_-20%_110%,rgba(16,185,129,0.12),transparent)]",
      ].join(" ")}
    >
      {/* Sidebar */}
      <aside
        className={[
          "w-64 fixed h-full z-40 p-6",
          "bg-black/40 backdrop-blur-sm",
          "border-r border-emerald-500/15",
          "shadow-[0_0_0_1px_rgba(16,185,129,0.08),_0_20px_60px_-20px_rgba(16,185,129,0.25)]",
        ].join(" ")}
      >
        <div className="flex items-center space-x-3 mb-8">
          <img src={logoImg} alt="Nakama&Partners" className="w-8 h-8 drop-shadow-[0_0_14px_rgba(16,185,129,0.35)]" />
          <div>
            <h1 className="font-cormorant text-lg font-bold text-emerald-50">Nakama&Partners</h1>
            <p className="text-emerald-300 text-xs">Portal de Cliente</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: "inicio", label: "Inicio", icon: () => <span /> },
            { id: "perfil", label: "Perfil", icon: () => <span /> },
            { id: "productos", label: "Productos", icon: () => <span /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={[
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                activeTab === item.id
                  ? "bg-emerald-600/20 border border-emerald-500/30 text-emerald-50 shadow-[0_8px_24px_-12px_rgba(16,185,129,0.45)]"
                  : "text-emerald-200 hover:bg-emerald-900/10",
              ].join(" ")}
            >
              {item.id === "inicio" && <Calendar className="h-4 w-4" />}
              {item.id === "perfil" && <User className="h-4 w-4" />}
              {item.id === "productos" && <Package className="h-4 w-4" />}
              <span>{item.label}</span>
            </button>
          ))}

        </nav>

        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full mt-4 justify-start border-emerald-500/20 text-emerald-50 hover:bg-emerald-900/10"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Cerrar sesión
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        {activeTab === "perfil" ? (
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
        ) : activeTab === "productos" ? (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-emerald-50">Productos e Inversiones</h1>
              <p className="text-emerald-200/80">Gestiona tus productos disponibles e inversiones activas</p>
            </div>

            {/* Views */}
            {activeProductsView === "default" ? (
              <div className="mb-8">
                {/* Hero */}
                <div
                  className="relative h-80 rounded-2xl overflow-hidden mb-8 border border-emerald-500/15"
                  style={{ backgroundImage: `url(${landscapeSvg})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0A1713]/80 to-[#0E2A1F]/80 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-emerald-50 mb-2">Productos Disponibles</h1>
                      <p className="text-emerald-200/80 text-lg">Descubre nuestras opciones de inversión</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Button
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-50 hover:bg-emerald-900/10 hover:border-emerald-400 py-4 rounded-xl"
                    onClick={() => setActiveProductsView("mis-productos")}
                  >
                    <Package className="h-5 w-5 mr-2" />
                    Mis Productos
                  </Button>
                  <Button
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-50 hover:bg-emerald-900/10 hover:border-emerald-400 py-4 rounded-xl"
                    onClick={() => setActiveProductsView("historial")}
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Historial
                  </Button>
                  <Button
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-50 hover:bg-emerald-900/10 hover:border-emerald-400 py-4 rounded-xl"
                    onClick={() => setActiveProductsView("transacciones")}
                  >
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Transacciones
                  </Button>
                  <Button
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-50 hover:bg-emerald-900/10 hover:border-emerald-400 py-4 rounded-xl"
                    onClick={() => setActiveProductsView("contratos")}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Contratos
                  </Button>
                </div>

                {/* Products Grid (producto 9%) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-black/40 border border-emerald-500/15 hover:border-emerald-400 hover:shadow-[0_16px_40px_-20px_rgba(16,185,129,0.45)] transition-all rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-xl font-bold text-emerald-50">Plazo fijo 9% 365 días</h2>
                        <Badge className="bg-emerald-500 text-black">365 días</Badge>
                      </div>
                      <p className="text-emerald-200/80 mb-6 leading-relaxed text-sm">
                        Depósito bancario con un 9% de rentabilidad anual, mediante préstamo participativo y
                        cesión de la pignoración al cliente depositante.
                      </p>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-3xl font-bold text-emerald-400">9.00%</p>
                          <p className="text-emerald-200/80 text-xs">Rentabilidad anual</p>
                        </div>
                        <Badge className="bg-emerald-900/30 text-emerald-200 border border-emerald-500/20">No renovable</Badge>
                      </div>
                      <Button className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white">
                        VER DETALLES
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : activeProductsView === "mis-productos" ? (
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveProductsView("default")}
                    className="border-emerald-500/30 text-emerald-50 hover:bg-emerald-900/10"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                  </Button>
                  <h2 className="text-2xl font-bold text-emerald-50">Mis Productos</h2>
                </div>

                {/* Filtros Mis Productos */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowMPFilters(!showMPFilters)}
                      className="border-emerald-500/20 text-emerald-50 hover:bg-emerald-900/10"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      {showMPFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                    </Button>

                    {(Object.values(mpFilters).some((v) => v !== "") || mpSort !== "") && (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setMpSort("");
                          setMpFilters({
                            search: "",
                            cantidadMin: "",
                            cantidadMax: "",
                            fechaFrom: "",
                            fechaTo: "",
                            rentMin: "",
                            rentMax: "",
                          });
                        }}
                        className="text-emerald-200 hover:text-emerald-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Limpiar Filtros
                      </Button>
                    )}
                  </div>

                  {showMPFilters && (
                    <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Búsqueda</Label>
                            <Input
                              placeholder="Buscar por nombre…"
                              value={mpFilters.search}
                              onChange={(e) => setMpFilters({ ...mpFilters, search: e.target.value })}
                              className="bg-black/50 border-emerald-500/20 text-emerald-50"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-emerald-50">Cantidad (€)</Label>
                            <div className="flex space-x-2">
                              <Input
                                placeholder="Mín"
                                value={mpFilters.cantidadMin}
                                onChange={(e) => setMpFilters({ ...mpFilters, cantidadMin: e.target.value })}
                                className="bg-black/50 border-emerald-500/20 text-emerald-50"
                              />
                              <Input
                                placeholder="Máx"
                                value={mpFilters.cantidadMax}
                                onChange={(e) => setMpFilters({ ...mpFilters, cantidadMax: e.target.value })}
                                className="bg-black/50 border-emerald-500/20 text-emerald-50"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-emerald-50">Rend. (%)</Label>
                            <div className="flex space-x-2">
                              <Input
                                placeholder="Mín"
                                value={mpFilters.rentMin}
                                onChange={(e) => setMpFilters({ ...mpFilters, rentMin: e.target.value })}
                                className="bg-black/50 border-emerald-500/20 text-emerald-50"
                              />
                              <Input
                                placeholder="Máx"
                                value={mpFilters.rentMax}
                                onChange={(e) => setMpFilters({ ...mpFilters, rentMax: e.target.value })}
                                className="bg-black/50 border-emerald-500/20 text-emerald-50"
                              />
                            </div>
                            <p className="text-xs text-emerald-200/70">* En “Activos” usa “Rentabilidad Estimada”</p>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-emerald-50">Fecha desde</Label>
                            <Input
                              type="date"
                              value={mpFilters.fechaFrom}
                              onChange={(e) => setMpFilters({ ...mpFilters, fechaFrom: e.target.value })}
                              className="bg-black/50 border-emerald-500/20 text-emerald-50"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-emerald-50">Fecha hasta</Label>
                            <Input
                              type="date"
                              value={mpFilters.fechaTo}
                              onChange={(e) => setMpFilters({ ...mpFilters, fechaTo: e.target.value })}
                              className="bg-black/50 border-emerald-500/20 text-emerald-50"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-emerald-50">Ordenar por</Label>
                            <Select value={mpSort} onValueChange={(v) => setMpSort(v as typeof mpSort)}>
                              <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                                <SelectValue placeholder="Sin orden" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cantidadDesc">Cantidad (Mayor a menor)</SelectItem>
                                <SelectItem value="cantidadAsc">Cantidad (Menor a mayor)</SelectItem>
                                <SelectItem value="fechaAsc">Fecha (Más antiguos)</SelectItem>
                                <SelectItem value="fechaDesc">Fecha (Más recientes)</SelectItem>
                                <SelectItem value="rentDesc">Rentabilidad (Mayor)</SelectItem>
                                <SelectItem value="rentAsc">Rentabilidad (Menor)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <Tabs value={activeProductsSubTab} onValueChange={setActiveProductsSubTab} className="mb-6">
                  <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-emerald-500/15 rounded-xl">
                    <TabsTrigger value="activos" className="data-[state=active]:bg-emerald-600/20 rounded-lg">
                      Activos
                    </TabsTrigger>
                    <TabsTrigger value="completados" className="data-[state=active]:bg-emerald-600/20 rounded-lg">
                      Completados
                    </TabsTrigger>
                    <TabsTrigger value="cancelados" className="data-[state=active]:bg-emerald-600/20 rounded-lg">
                      Cancelados
                    </TabsTrigger>
                  </TabsList>

                  {/* Activos */}
                  <TabsContent value="activos" className="mt-6">
                    <div className="space-y-4">
                      {productosActivos
                        .filter((p) => {
                          const q = mpFilters.search.toLowerCase();
                          const matchesSearch = !q || p.nombre.toLowerCase().includes(q);

                          const cantidad = parseEuro(p.cantidad);
                          const minC = mpFilters.cantidadMin ? parseFloat(mpFilters.cantidadMin) : -Infinity;
                          const maxC = mpFilters.cantidadMax ? parseFloat(mpFilters.cantidadMax) : Infinity;
                          const matchesCantidad = cantidad >= minC && cantidad <= maxC;

                          const rent = parsePercent(p.rentabilidad);
                          const minR = mpFilters.rentMin ? parseFloat(mpFilters.rentMin) : -Infinity;
                          const maxR = mpFilters.rentMax ? parseFloat(mpFilters.rentMax) : Infinity;
                          const matchesRent = rent >= minR && rent <= maxR;

                          const f = parseESDate(p.fechaInicio).getTime();
                          const fromOk = !mpFilters.fechaFrom || f >= new Date(mpFilters.fechaFrom).getTime();
                          const toOk = !mpFilters.fechaTo || f <= new Date(mpFilters.fechaTo).getTime();

                          return matchesSearch && matchesCantidad && matchesRent && fromOk && toOk;
                        })
                        .sort((a, b) => {
                          if (mpSort === "cantidadDesc") return parseEuro(b.cantidad) - parseEuro(a.cantidad);
                          if (mpSort === "cantidadAsc") return parseEuro(a.cantidad) - parseEuro(b.cantidad);
                          if (mpSort === "fechaAsc") return parseESDate(a.fechaInicio).getTime() - parseESDate(b.fechaInicio).getTime();
                          if (mpSort === "fechaDesc") return parseESDate(b.fechaInicio).getTime() - parseESDate(a.fechaInicio).getTime();
                          if (mpSort === "rentDesc") return parsePercent(b.rentabilidad) - parsePercent(a.rentabilidad);
                          if (mpSort === "rentAsc") return parsePercent(a.rentabilidad) - parsePercent(b.rentabilidad);
                          return 0;
                        })
                        .map((p, i) => (
                          <Card key={i} className="bg-black/40 border border-emerald-500/15 hover:border-emerald-400 transition-all rounded-xl">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="text-lg font-semibold text-emerald-50 mb-2">{p.nombre}</h4>
                                  <Badge className="bg-emerald-500 text-black">{p.estado}</Badge>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-emerald-400">{p.cantidad}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-emerald-200/80">Fecha de inicio</p>
                                  <p className="text-emerald-50 font-medium">{p.fechaInicio}</p>
                                </div>
                                <div>
                                  <p className="text-emerald-200/80">Rentabilidad Estimada</p>
                                  <p className="text-emerald-50 font-medium">{p.rentabilidad}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>

                  {/* Completados */}
                  <TabsContent value="completados" className="mt-6">
                    <div className="space-y-4">
                      {productosCompletados
                        .filter((p) => {
                          const q = mpFilters.search.toLowerCase();
                          const matchesSearch = !q || p.nombre.toLowerCase().includes(q);

                          const cantidad = parseEuro(p.cantidad);
                          const minC = mpFilters.cantidadMin ? parseFloat(mpFilters.cantidadMin) : -Infinity;
                          const maxC = mpFilters.cantidadMax ? parseFloat(mpFilters.cantidadMax) : Infinity;
                          const matchesCantidad = cantidad >= minC && cantidad <= maxC;

                          const rent = parsePercent(p.rentabilidadFinal);
                          const minR = mpFilters.rentMin ? parseFloat(mpFilters.rentMin) : -Infinity;
                          const maxR = mpFilters.rentMax ? parseFloat(mpFilters.rentMax) : Infinity;
                          const matchesRent = rent >= minR && rent <= maxR;

                          const f = parseESDate(p.fechaFin).getTime();
                          const fromOk = !mpFilters.fechaFrom || f >= new Date(mpFilters.fechaFrom).getTime();
                          const toOk = !mpFilters.fechaTo || f <= new Date(mpFilters.fechaTo).getTime();

                          return matchesSearch && matchesCantidad && matchesRent && fromOk && toOk;
                        })
                        .sort((a, b) => {
                          if (mpSort === "cantidadDesc") return parseEuro(b.cantidad) - parseEuro(a.cantidad);
                          if (mpSort === "cantidadAsc") return parseEuro(a.cantidad) - parseEuro(b.cantidad);
                          if (mpSort === "fechaAsc") return parseESDate(a.fechaFin).getTime() - parseESDate(b.fechaFin).getTime();
                          if (mpSort === "fechaDesc") return parseESDate(b.fechaFin).getTime() - parseESDate(a.fechaFin).getTime();
                          if (mpSort === "rentDesc") return parsePercent(b.rentabilidadFinal) - parsePercent(a.rentabilidadFinal);
                          if (mpSort === "rentAsc") return parsePercent(a.rentabilidadFinal) - parsePercent(b.rentabilidadFinal);
                          return 0;
                        })
                        .map((p, i) => (
                          <Card key={i} className="bg-black/40 border border-emerald-500/15 hover:border-emerald-400 transition-all rounded-xl">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="text-lg font-semibold text-emerald-50 mb-2">{p.nombre}</h4>
                                  <Badge className="bg-blue-500 text-white">{p.estado}</Badge>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-emerald-400">{p.cantidad}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-emerald-200/80">Inicio</p>
                                  <p className="text-emerald-50 font-medium">{p.fechaInicio}</p>
                                </div>
                                <div>
                                  <p className="text-emerald-200/80">Finalizado</p>
                                  <p className="text-emerald-50 font-medium">{p.fechaFin}</p>
                                </div>
                                <div>
                                  <p className="text-emerald-200/80">Rentabilidad Final</p>
                                  <p className="text-emerald-50 font-medium">{p.rentabilidadFinal}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>

                  {/* Cancelados */}
                  <TabsContent value="cancelados" className="mt-6">
                    <div className="space-y-4">
                      {productosCancelados
                        .filter((p) => {
                          const q = mpFilters.search.toLowerCase();
                          const matchesSearch = !q || p.nombre.toLowerCase().includes(q);

                          const cantidad = parseEuro(p.cantidad);
                          const minC = mpFilters.cantidadMin ? parseFloat(mpFilters.cantidadMin) : -Infinity;
                          const maxC = mpFilters.cantidadMax ? parseFloat(mpFilters.cantidadMax) : Infinity;
                          const matchesCantidad = cantidad >= minC && cantidad <= maxC;

                          const f = parseESDate(p.fechaCancelacion).getTime();
                          const fromOk = !mpFilters.fechaFrom || f >= new Date(mpFilters.fechaFrom).getTime();
                          const toOk = !mpFilters.fechaTo || f <= new Date(mpFilters.fechaTo).getTime();

                          return matchesSearch && matchesCantidad && fromOk && toOk;
                        })
                        .sort((a, b) => {
                          if (mpSort === "cantidadDesc") return parseEuro(b.cantidad) - parseEuro(a.cantidad);
                          if (mpSort === "cantidadAsc") return parseEuro(a.cantidad) - parseEuro(b.cantidad);
                          if (mpSort === "fechaAsc") return parseESDate(a.fechaCancelacion).getTime() - parseESDate(b.fechaCancelacion).getTime();
                          if (mpSort === "fechaDesc") return parseESDate(b.fechaCancelacion).getTime() - parseESDate(a.fechaCancelacion).getTime();
                          return 0;
                        })
                        .map((p, i) => (
                          <Card key={i} className="bg-black/40 border border-emerald-500/15 hover:border-emerald-400 transition-all rounded-xl">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="text-lg font-semibold text-emerald-50 mb-2">{p.nombre}</h4>
                                  <Badge className="bg-red-500 text-white">{p.estado}</Badge>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-red-400">{p.cantidad}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 gap-4 text-sm">
                                <div>
                                  <p className="text-emerald-200/80">Fecha de cancelación</p>
                                  <p className="text-emerald-50 font-medium">{p.fechaCancelacion}</p>
                                </div>
                                <div>
                                  <p className="text-emerald-200/80">Motivo</p>
                                  <p className="text-emerald-50 font-medium italic">{p.motivo}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : activeProductsView === "historial" ? (
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveProductsView("default")}
                    className="border-emerald-500/30 text-emerald-50 hover:bg-emerald-900/10"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                  </Button>
                  <h2 className="text-2xl font-bold text-emerald-50">Historial de Actividades</h2>
                </div>

                {/* Filtros Historial */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowHistFilters(!showHistFilters)}
                      className="border-emerald-500/20 text-emerald-50 hover:bg-emerald-900/10"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      {showHistFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                    </Button>

                    {Object.values(histFilters).some((v) => v !== "") && (
                      <Button
                        variant="ghost"
                        onClick={() => setHistFilters({ search: "", dateFrom: "", dateTo: "", tipo: "" })}
                        className="text-emerald-200 hover:text-emerald-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Limpiar Filtros
                      </Button>
                    )}
                  </div>

                  {showHistFilters && (
                    <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Búsqueda</Label>
                            <Input
                              placeholder="Buscar en el historial…"
                              value={histFilters.search}
                              onChange={(e) => setHistFilters({ ...histFilters, search: e.target.value })}
                              className="bg-black/50 border-emerald-500/20 text-emerald-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Tipo</Label>
                            <Select value={histFilters.tipo} onValueChange={(v) => setHistFilters({ ...histFilters, tipo: v })}>
                              <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                                <SelectValue placeholder="Todos" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="download">Descarga</SelectItem>
                                <SelectItem value="simulation">Simulación</SelectItem>
                                <SelectItem value="lead">Otro</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Desde</Label>
                            <Input
                              type="date"
                              value={histFilters.dateFrom}
                              onChange={(e) => setHistFilters({ ...histFilters, dateFrom: e.target.value })}
                              className="bg-black/50 border-emerald-500/20 text-emerald-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Hasta</Label>
                            <Input
                              type="date"
                              value={histFilters.dateTo}
                              onChange={(e) => setHistFilters({ ...histFilters, dateTo: e.target.value })}
                              className="bg-black/50 border-emerald-500/20 text-emerald-50"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="text-center text-emerald-200/80">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-emerald-400" />
                      <p className="text-lg mb-2 text-emerald-50/90">No hay actividades recientes</p>
                      <p className="text-sm">El historial aparecerá aquí cuando realices operaciones.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : activeProductsView === "contratos" ? (
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveProductsView("default")}
                    className="border-emerald-500/30 text-emerald-50 hover:bg-emerald-900/10"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                  </Button>
                  <h2 className="text-2xl font-bold text-emerald-50">Contratos Disponibles</h2>
                </div>

                {/* Filtros Contratos */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowCFilters(!showCFilters)}
                      className="border-emerald-500/20 text-emerald-50 hover:bg-emerald-900/10"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      {showCFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                    </Button>

                    {(Object.values(cFilters).some((v) => v !== "") || cSort !== "") && (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setCFilters({ search: "", estado: "", dateFrom: "", dateTo: "", tipo: "" });
                          setCSort("");
                        }}
                        className="text-emerald-200 hover:text-emerald-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Limpiar Filtros
                      </Button>
                    )}
                  </div>

                  {showCFilters && (
                    <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Búsqueda</Label>
                            <Input
                              placeholder="Buscar por ID, título o descripción…"
                              value={cFilters.search}
                              onChange={(e) => setCFilters({ ...cFilters, search: e.target.value })}
                              className="bg-black/50 border-emerald-500/20 text-emerald-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Estado</Label>
                            <Select value={cFilters.estado} onValueChange={(v) => setCFilters({ ...cFilters, estado: v })}>
                              <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                                <SelectValue placeholder="Todos" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Disponible">Disponible</SelectItem>
                                <SelectItem value="No disponible">No disponible</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Categoría</Label>
                            <Select value={cFilters.tipo} onValueChange={(v) => setCFilters({ ...cFilters, tipo: v })}>
                              <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                                <SelectValue placeholder="Todas" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Producto">Producto</SelectItem>
                                <SelectItem value="Legal">Legal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Desde</Label>
                            <Input
                              type="date"
                              value={cFilters.dateFrom}
                              onChange={(e) => setCFilters({ ...cFilters, dateFrom: e.target.value })}
                              className="bg-black/50 border-emerald-500/20 text-emerald-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Hasta</Label>
                            <Input
                              type="date"
                              value={cFilters.dateTo}
                              onChange={(e) => setCFilters({ ...cFilters, dateTo: e.target.value })}
                              className="bg-black/50 border-emerald-500/20 text-emerald-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Ordenar por</Label>
                            <Select value={cSort} onValueChange={(v) => setCSort(v as typeof cSort)}>
                              <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                                <SelectValue placeholder="Sin orden" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dateDesc">Fecha (Más recientes)</SelectItem>
                                <SelectItem value="dateAsc">Fecha (Más antiguos)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Listado de contratos filtrados */}
                <div className="space-y-4">
                  {contratosCliente
                    .filter((c) => {
                      const q = cFilters.search.toLowerCase();
                      const matchesSearch =
                        !q ||
                        c.id.toLowerCase().includes(q) ||
                        c.titulo.toLowerCase().includes(q) ||
                        c.descripcion.toLowerCase().includes(q);

                      const matchesEstado = !cFilters.estado || c.estado === cFilters.estado;
                      const matchesTipo = !cFilters.tipo || c.categoria === cFilters.tipo;

                      const t = new Date(c.fecha).getTime();
                      const fromOk = !cFilters.dateFrom || t >= new Date(cFilters.dateFrom).getTime();
                      const toOk = !cFilters.dateTo || t <= new Date(cFilters.dateTo).getTime();

                      return matchesSearch && matchesEstado && matchesTipo && fromOk && toOk;
                    })
                    .sort((a, b) => {
                      if (cSort === "dateDesc") return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                      if (cSort === "dateAsc") return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
                      return 0;
                    })
                    .map((doc) => (
                      <Card key={doc.id} className="bg-black/40 border border-emerald-500/15 hover:border-emerald-400 transition-all rounded-2xl">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                                  <Download className="h-5 w-5 text-black" />
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold text-emerald-50">{doc.titulo}</h4>
                                  <p className="text-emerald-200/80 text-sm">{doc.descripcion}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mt-4">
                                <div>
                                  <p className="text-emerald-200/80">ID</p>
                                  <p className="text-emerald-50 font-medium">{doc.id}</p>
                                </div>
                                <div>
                                  <p className="text-emerald-200/80">Tipo</p>
                                  <p className="text-emerald-50 font-medium">{doc.tipo}</p>
                                </div>
                                <div>
                                  <p className="text-emerald-200/80">Tamaño</p>
                                  <p className="text-emerald-50 font-medium">{doc.tamano}</p>
                                </div>
                                <div>
                                  <p className="text-emerald-200/80">Fecha</p>
                                  <p className="text-emerald-50 font-medium">
                                    {new Date(doc.fecha).toLocaleDateString("es-ES")}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-emerald-200/80">Estado</p>
                                  <Badge className="bg-emerald-500 text-black">{doc.estado}</Badge>
                                </div>
                              </div>
                            </div>
                            <div className="ml-6">
                              <Button
                                className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-6"
                                onClick={() => alert("Descarga pendiente de implementar")}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Descargar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {/* Placeholder si no hay resultados */}
                  {contratosCliente.filter((c) => {
                    const q = cFilters.search.toLowerCase();
                    const matchesSearch =
                      !q ||
                      c.id.toLowerCase().includes(q) ||
                      c.titulo.toLowerCase().includes(q) ||
                      c.descripcion.toLowerCase().includes(q);
                    const matchesEstado = !cFilters.estado || c.estado === cFilters.estado;
                    const matchesTipo = !cFilters.tipo || c.categoria === cFilters.tipo;
                    const t = new Date(c.fecha).getTime();
                    const fromOk = !cFilters.dateFrom || t >= new Date(cFilters.dateFrom).getTime();
                    const toOk = !cFilters.dateTo || t <= new Date(cFilters.dateTo).getTime();
                    return matchesSearch && matchesEstado && matchesTipo && fromOk && toOk;
                  }).length === 0 && (
                    <Card className="bg-black/30 border border-emerald-500/15 border-dashed rounded-2xl">
                      <CardContent className="p-8">
                        <div className="text-center text-emerald-200/80">
                          <Download className="h-12 w-12 mx-auto mb-4 text-emerald-400" />
                          <p className="text-lg mb-2 text-emerald-50/90">No hay contratos para los filtros aplicados</p>
                          <p className="text-sm">Ajusta los filtros para ver más resultados.</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ) : activeProductsView === "transacciones" ? (
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveProductsView("default")}
                    className="border-emerald-500/30 text-emerald-50 hover:bg-emerald-900/10"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                  </Button>
                  <h2 className="text-2xl font-bold text-emerald-50">Historial de Transacciones</h2>
                </div>

                {/* Filtros Transacciones */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowTxFilters(!showTxFilters)}
                      className="border-emerald-500/20 text-emerald-50 hover:bg-emerald-900/10"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      {showTxFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                    </Button>

                    {(Object.values(txFilters).some((v) => v !== "") || txSort !== "") && (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setTxFilters({
                            search: "",
                            tipo: "",
                            estado: "",
                            cantidadMin: "",
                            cantidadMax: "",
                            dateFrom: "",
                            dateTo: "",
                          });
                          setTxSort("");
                        }}
                        className="text-emerald-200 hover:text-emerald-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Limpiar Filtros
                      </Button>
                    )}
                  </div>

                  {showTxFilters && (
                    <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Búsqueda</Label>
                            <Input
                              placeholder="Buscar por descripción…"
                              value={txFilters.search}
                              onChange={(e) => setTxFilters({ ...txFilters, search: e.target.value })}
                              className="bg-black/50 border-emerald-500/20 text-emerald-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Tipo</Label>
                            <Select value={txFilters.tipo} onValueChange={(v) => setTxFilters({ ...txFilters, tipo: v })}>
                              <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                                <SelectValue placeholder="Todos" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Depósito">Depósito</SelectItem>
                                <SelectItem value="Retiro">Retiro</SelectItem>
                                <SelectItem value="Intereses">Intereses</SelectItem>
                                <SelectItem value="Renovación">Renovación</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Estado</Label>
                            <Select value={txFilters.estado} onValueChange={(v) => setTxFilters({ ...txFilters, estado: v })}>
                              <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                                <SelectValue placeholder="Todos" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Completada">Completada</SelectItem>
                                <SelectItem value="Pendiente">Pendiente</SelectItem>
                                <SelectItem value="Rechazada">Rechazada</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-emerald-50">Cantidad (€)</Label>
                            <div className="flex space-x-2">
                              <Input
                                placeholder="Mín"
                                value={txFilters.cantidadMin}
                                onChange={(e) => setTxFilters({ ...txFilters, cantidadMin: e.target.value })}
                                className="bg-black/50 border-emerald-500/20 text-emerald-50"
                              />
                              <Input
                                placeholder="Máx"
                                value={txFilters.cantidadMax}
                                onChange={(e) => setTxFilters({ ...txFilters, cantidadMax: e.target.value })}
                                className="bg-black/50 border-emerald-500/20 text-emerald-50"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-emerald-50">Desde</Label>
                            <Input
                              type="date"
                              value={txFilters.dateFrom}
                              onChange={(e) => setTxFilters({ ...txFilters, dateFrom: e.target.value })}
                              className="bg-black/50 border-emerald-500/20 text-emerald-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-emerald-50">Hasta</Label>
                            <Input
                              type="date"
                              value={txFilters.dateTo}
                              onChange={(e) => setTxFilters({ ...txFilters, dateTo: e.target.value })}
                              className="bg-black/50 border-emerald-500/20 text-emerald-50"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-emerald-50">Ordenar por</Label>
                            <Select value={txSort} onValueChange={(v) => setTxSort(v as typeof txSort)}>
                              <SelectTrigger className="bg-black/50 border-emerald-500/20 text-emerald-50">
                                <SelectValue placeholder="Sin orden" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dateDesc">Fecha (Más recientes)</SelectItem>
                                <SelectItem value="dateAsc">Fecha (Más antiguos)</SelectItem>
                                <SelectItem value="cantidadDesc">Cantidad (Mayor a menor)</SelectItem>
                                <SelectItem value="cantidadAsc">Cantidad (Menor a mayor)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Tabla transacciones */}
                <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
                  <CardContent className="p-0">
                    <div className="overflow-hidden rounded-xl">
                      <table className="w-full">
                        <thead className="bg-black/40 border-b border-emerald-500/15">
                          <tr>
                            {["FECHA", "TIPO", "DESCRIPCIÓN", "CANTIDAD", "ESTADO"].map((h) => (
                              <th key={h} className="text-left p-4 text-emerald-200/80 font-medium">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {transacciones
                            .filter((t) => {
                              const q = txFilters.search.toLowerCase();
                              const matchesSearch = !q || t.descripcion.toLowerCase().includes(q);
                              const matchesTipo = !txFilters.tipo || t.tipo === txFilters.tipo;
                              const matchesEstado = !txFilters.estado || t.estado === txFilters.estado;

                              const minC = txFilters.cantidadMin ? parseFloat(txFilters.cantidadMin) : -Infinity;
                              const maxC = txFilters.cantidadMax ? parseFloat(txFilters.cantidadMax) : Infinity;
                              const matchesCantidad = t.cantidad >= minC && t.cantidad <= maxC;

                              const ts = new Date(t.fecha).getTime();
                              const fromOk = !txFilters.dateFrom || ts >= new Date(txFilters.dateFrom).getTime();
                              const toOk = !txFilters.dateTo || ts <= new Date(txFilters.dateTo).getTime();

                              return matchesSearch && matchesTipo && matchesEstado && matchesCantidad && fromOk && toOk;
                            })
                            .sort((a, b) => {
                              if (txSort === "dateDesc") return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                              if (txSort === "dateAsc") return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
                              if (txSort === "cantidadDesc") return b.cantidad - a.cantidad;
                              if (txSort === "cantidadAsc") return a.cantidad - b.cantidad;
                              return 0;
                            })
                            .map((t, i) => (
                              <tr key={i} className="border-b border-emerald-500/10">
                                <td className="p-4 text-emerald-50">{new Date(t.fecha).toLocaleDateString("es-ES")}</td>
                                <td className="p-4 text-emerald-50">{t.tipo}</td>
                                <td className="p-4 text-emerald-50">{t.descripcion}</td>
                                <td className={`p-4 ${t.cantidad >= 0 ? "text-emerald-400" : "text-red-400"} font-medium`}>
                                  {t.cantidad.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                                </td>
                                <td className="p-4">
                                  <Badge
                                    className={
                                      t.estado === "Completada"
                                        ? "bg-emerald-500 text-black"
                                        : t.estado === "Pendiente"
                                        ? "bg-amber-500 text-black"
                                        : "bg-red-500 text-white"
                                    }
                                  >
                                    {t.estado}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          {transacciones.filter((_) => true).length === 0 && (
                            <tr>
                              <td colSpan={5} className="p-8 text-center text-emerald-200/80">
                                No hay transacciones para mostrar
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : null}
          </div>
        ) : (
          // INICIO (home)
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-emerald-50">Dashboard</h1>
              <p className="text-emerald-200/80">Vista general de tu actividad</p>
            </div>

            {/* KPIs (3 tarjetas) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {kpis.map((kpi, i) => (
                <Card
                  key={i}
                  className="bg-black/40 border border-emerald-500/15 rounded-2xl hover:shadow-[0_16px_40px_-20px_rgba(16,185,129,0.45)] transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-200/80 text-sm">{kpi.title}</p>
                        <p className="text-2xl font-bold text-emerald-50">{kpi.value}</p>
                      </div>
                      <div className={`flex items-center space-x-1 ${kpi.trending === "up" ? "text-emerald-400" : "text-red-400"}`}>
                        {kpi.trending === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="text-sm">{kpi.change}</span>
                      </div>
                    </div>

                    {/* Barras de progreso para los 2 KPIs solicitados */}
                    {kpi.title === "Capital Invertido" && (
                      <ProgressBar percent={110} noteWhenOver100 />
                    )}
                    {kpi.title === "Progreso en Meses" && (
                      <ProgressBar percent={25} />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Producto destacado + gráfica (proyección a 10 años) */}
            <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl mb-8">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-emerald-50 mb-2">
                    Un Producto Sólido, Simple y Rentable
                  </h2>
                  <p className="text-emerald-200/80 max-w-3xl mx-auto">
                    Seguridad, rentabilidad y simplicidad. Ideal para hacer crecer tu capital de forma predecible.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { icon: <TrendingUp className="h-6 w-6 text-white" />, title: "Rentabilidad Garantizada", value: "9% Anual", note: "Retorno fijo" },
                    { icon: <TrendingUp className="h-6 w-6 text-white" />, title: "Capital Protegido", value: "100%", note: "Garantía bancaria" },
                    { icon: <Calendar className="h-6 w-6 text-white" />, title: "Flexibilidad", value: "1-5 años", note: "Plazos adaptables" },
                  ].map((b, idx) => (
                    <div
                      key={idx}
                      className="bg-black/40 p-6 rounded-xl text-center border border-emerald-500/15 hover:border-emerald-400 hover:shadow-[0_16px_40px_-20px_rgba(16,185,129,0.45)] transition-all"
                    >
                      <div className="w-12 h-12 bg-emerald-700/80 rounded-full flex items-center justify-center mx-auto mb-4">{b.icon}</div>
                      <h3 className="text-emerald-50 font-semibold mb-1">{b.title}</h3>
                      <p className="text-emerald-400 text-xl font-bold mb-1">{b.value}</p>
                      <p className="text-emerald-200/80 text-sm">{b.note}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-2">
                  <p className="text-emerald-200/80 text-sm mb-2">Proyección a 10 años</p>
                  <CompoundInterestChart initialAmount={50000} years={10} rate={0.09} className="max-w-7xl mx-auto w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Actividad reciente */}
            <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-emerald-50">Actividad Reciente</CardTitle>
                <CardDescription className="text-emerald-200/80">Últimas acciones en el sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((a, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 bg-black/40 rounded-lg border border-emerald-500/15">
                      <div className="w-8 h-8 bg-emerald-700/70 rounded-full flex items-center justify-center">
                        {a.type === "simulation" && <Calculator className="h-4 w-4 text-white" />}
                        {a.type === "download" && <Download className="h-4 w-4 text-white" />}
                        {a.type === "lead" && <Plus className="h-4 w-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-emerald-50 text-sm">{a.message}</p>
                        <p className="text-emerald-200/80 text-xs">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Acciones rápidas */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-emerald-50 mb-4">Acciones Rápidas</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleDownloadStatement} className="rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Estado de Cuenta
                </Button>
                <Button onClick={handleCalculateInvestment} className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular Nueva Inversión
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Investment Calculator Modal */}
      {showCalculator && <InvestmentCalculator onClose={() => setShowCalculator(false)} />}
    </div>
  );
}
