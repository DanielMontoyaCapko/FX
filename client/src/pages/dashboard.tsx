import { useState, useEffect } from "react";
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
  Mail,
  Phone,
  Globe,
  Home,
  Package,
  User,
  Calculator,
  ArrowLeft,
  Users,
  DollarSign,
  BarChart3,
  PieChart,
  Crown,
  Briefcase,
  Target,
  Award
} from "lucide-react";
import logoImg from "@/assets/Logo-removeBG_1752488347081.png";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  useScrollToTop();
  const [, setLocation] = useLocation();
  const { user, logout, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Acceso requerido",
        description: "Debes iniciar sesión para acceder al dashboard",
        variant: "destructive",
      });
      setLocation("/login");
    }
  }, [user, isLoading, setLocation, toast]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    setLocation("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-600 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Render different dashboards based on user role
  if (user.role === 'partner') {
    return <PartnerDashboard user={user} onLogout={handleLogout} />;
  } else {
    return <ClientDashboard user={user} onLogout={handleLogout} />;
  }
}

// Premium Partner Dashboard Component
function PartnerDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");

  const partnerKpis = [
    {
      title: "Clientes Activos",
      value: "127",
      change: "+18.2%",
      trending: "up",
      icon: Users,
      color: "text-emerald-400"
    },
    {
      title: "Ingresos Mensuales",
      value: "€45,680",
      change: "+24.5%", 
      trending: "up",
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      title: "Comisiones Totales",
      value: "€8,940",
      change: "+12.8%",
      trending: "up", 
      icon: Award,
      color: "text-yellow-400"
    },
    {
      title: "Conversión",
      value: "31.4%",
      change: "+4.2%",
      trending: "up",
      icon: Target,
      color: "text-blue-400"
    }
  ];

  const recentClients = [
    { name: "María González", investment: "€50,000", status: "Activo", date: "2025-01-15" },
    { name: "Carlos Ruiz", investment: "€75,000", status: "Pendiente", date: "2025-01-14" },
    { name: "Ana López", investment: "€100,000", status: "Activo", date: "2025-01-13" },
    { name: "Pedro Martín", investment: "€25,000", status: "Activo", date: "2025-01-12" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gold/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img src={logoImg} alt="Logo" className="w-10 h-10" />
                <div>
                  <h1 className="font-cormorant text-xl font-bold text-white">Nakama&Partners</h1>
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-gold" />
                    <span className="text-gold text-sm font-medium">Partner Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-gold text-sm">Partner Premium</p>
              </div>
              <Button 
                onClick={onLogout}
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/10 hover:text-gold"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/50 border border-gold/20">
            <TabsTrigger 
              value="overview" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-gold data-[state=active]:to-yellow-500 data-[state=active]:text-black"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Resumen
            </TabsTrigger>
            <TabsTrigger 
              value="clients" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-gold data-[state=active]:to-yellow-500 data-[state=active]:text-black"
            >
              <Users className="w-4 h-4 mr-2" />
              Clientes
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-gold data-[state=active]:to-yellow-500 data-[state=active]:text-black"
            >
              <PieChart className="w-4 h-4 mr-2" />
              Análisis
            </TabsTrigger>
            <TabsTrigger 
              value="tools" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-gold data-[state=active]:to-yellow-500 data-[state=active]:text-black"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Herramientas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {partnerKpis.map((kpi, index) => (
                <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-gold/20 hover:border-gold/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm font-medium">{kpi.title}</p>
                        <p className="text-white text-2xl font-bold mt-1">{kpi.value}</p>
                        <div className="flex items-center mt-2">
                          {kpi.trending === "up" ? (
                            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                          )}
                          <span className={kpi.trending === "up" ? "text-green-400 text-sm" : "text-red-400 text-sm"}>
                            {kpi.change}
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-800/50 ${kpi.color}`}>
                        <kpi.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-gray-900 to-black border-gold/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-gold" />
                    Clientes Recientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentClients.map((client, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{client.name}</p>
                          <p className="text-gray-400 text-sm">{client.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gold font-semibold">{client.investment}</p>
                          <Badge variant={client.status === "Activo" ? "default" : "secondary"} className="text-xs">
                            {client.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 to-black border-gold/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="w-5 h-5 mr-2 text-gold" />
                    Rendimiento del Mes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Meta de Ventas</span>
                      <span className="text-white font-semibold">78% completado</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-gold to-yellow-500 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Nuevos Clientes</span>
                      <span className="text-white font-semibold">12 este mes</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Ranking Nacional</span>
                      <span className="text-gold font-semibold">#7 de 245</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="mt-8">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Gestión de Clientes</CardTitle>
                <CardDescription className="text-gray-300">
                  Administra tu cartera de clientes y prospectos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Funcionalidad Avanzada</h3>
                  <p className="text-gray-400 mb-6">Esta sección incluirá herramientas de CRM y gestión de clientes</p>
                  <Button className="bg-gradient-to-r from-gold to-yellow-500 text-black hover:from-yellow-500 hover:to-gold">
                    Próximamente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Análisis Avanzado</CardTitle>
                <CardDescription className="text-gray-300">
                  Métricas detalladas y análisis de rendimiento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <PieChart className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Dashboard Analítico</h3>
                  <p className="text-gray-400 mb-6">Gráficos interactivos y reportes detallados</p>
                  <Button className="bg-gradient-to-r from-gold to-yellow-500 text-black hover:from-yellow-500 hover:to-gold">
                    Próximamente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-gray-900 to-black border-gold/20 hover:border-gold/40 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Calculator className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Calculadora Premium</h3>
                  <p className="text-gray-400 text-sm mb-4">Simulaciones avanzadas para clientes</p>
                  <Button size="sm" className="bg-gradient-to-r from-gold to-yellow-500 text-black">
                    Abrir
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 to-black border-gold/20 hover:border-gold/40 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Download className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Documentos</h3>
                  <p className="text-gray-400 text-sm mb-4">Materiales de marketing y contratos</p>
                  <Button size="sm" className="bg-gradient-to-r from-gold to-yellow-500 text-black">
                    Descargar
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 to-black border-gold/20 hover:border-gold/40 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Agenda</h3>
                  <p className="text-gray-400 text-sm mb-4">Programar reuniones con clientes</p>
                  <Button size="sm" className="bg-gradient-to-r from-gold to-yellow-500 text-black">
                    Abrir
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Client Dashboard Component
function ClientDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("inicio");

  const clientKpis = [
    {
      title: "Mi Inversión",
      value: "€50,000",
      change: "+9.0%",
      trending: "up"
    },
    {
      title: "Rendimiento Anual",
      value: "9.0%",
      change: "Garantizado",
      trending: "up"
    },
    {
      title: "Ganancias Mes",
      value: "€375",
      change: "+9.0%",
      trending: "up"
    },
    {
      title: "Total Acumulado",
      value: "€54,500",
      change: "+4,500",
      trending: "up"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-600 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#040505] border-r border-silver-500/20 p-6 flex flex-col fixed h-full">
        <div className="flex items-center space-x-3 mb-8">
          <img src={logoImg} alt="Nakama&Partners" className="w-8 h-8" />
          <div>
            <h1 className="font-cormorant text-lg font-bold text-white">Nakama&Partners</h1>
            <p className="text-gold text-xs">Portal de Cliente</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setActiveTab("inicio")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "inicio" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Inicio</span>
          </button>
          
          <button
            onClick={() => setActiveTab("portafolio")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "portafolio" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <Package className="h-4 w-4" />
            <span>Mi Portafolio</span>
          </button>
          
          <button
            onClick={() => setActiveTab("perfil")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "perfil" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Mi Perfil</span>
          </button>
        </nav>

        <Button 
          onClick={onLogout}
          variant="ghost" 
          className="w-full justify-start text-silver-100 hover:text-white hover:bg-black/50 mt-2"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Cerrar Sesión
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Bienvenido, {user.name}</h1>
            <p className="text-silver-100">Gestiona tu inversión de manera segura</p>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "inicio" && (
          <div className="space-y-8">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {clientKpis.map((kpi, index) => (
                <Card key={index} className="bg-[#040505] border-silver-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-silver-100 text-sm font-medium">{kpi.title}</p>
                        <p className="text-white text-2xl font-bold mt-1">{kpi.value}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                          <span className="text-green-400 text-sm">{kpi.change}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Investment Summary */}
            <Card className="bg-[#040505] border-silver-500/20">
              <CardHeader>
                <CardTitle className="text-white">Resumen de Inversión</CardTitle>
                <CardDescription className="text-silver-100">
                  Tu inversión está protegida y genera rendimientos garantizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Inversión Activa</h3>
                  <p className="text-silver-100 mb-6">Tu capital está trabajando de manera segura con rendimiento del 9% anual</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/30 p-4 rounded-lg">
                      <p className="text-gold font-semibold">Capital Inicial</p>
                      <p className="text-white text-lg">€50,000</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <p className="text-gold font-semibold">Rendimiento Anual</p>
                      <p className="text-white text-lg">9.0%</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <p className="text-gold font-semibold">Protección</p>
                      <p className="text-white text-lg">100%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "portafolio" && (
          <Card className="bg-[#040505] border-silver-500/20">
            <CardHeader>
              <CardTitle className="text-white">Mi Portafolio</CardTitle>
              <CardDescription className="text-silver-100">
                Detalles de tu inversión y rendimientos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Portafolio Detallado</h3>
                <p className="text-silver-100 mb-6">Información detallada de tu inversión y proyecciones</p>
                <Button className="bg-[#344e41] hover:bg-[#2d4235] text-white">
                  Próximamente
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "perfil" && (
          <Card className="bg-[#040505] border-silver-500/20">
            <CardHeader>
              <CardTitle className="text-white">Mi Perfil</CardTitle>
              <CardDescription className="text-silver-100">
                Información personal y configuración de cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white">Nombre</Label>
                    <Input value={user.name} disabled className="bg-black/30 border-silver-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Email</Label>
                    <Input value={user.email} disabled className="bg-black/30 border-silver-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Tipo de Cuenta</Label>
                    <Input value="Cliente" disabled className="bg-black/30 border-silver-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Estado</Label>
                    <Input value="Activo" disabled className="bg-black/30 border-silver-500/20 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}