import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Crown, 
  Award, 
  Briefcase,
  BarChart3,
  UserPlus,
  Calendar,
  LogOut,
  Star,
  Trophy,
  Zap
} from "lucide-react";
import logoImg from "@/assets/Logo-removeBG_1752488347081.png";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import GrowthChart from "@/components/growth-chart";

export default function PartnerDashboard() {
  useScrollToTop();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("resumen");

  // Calculate days until next commission payout (every 15th of the month)
  const calculateDaysToCommission = () => {
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Next payout is on the 15th of current month or next month
    let nextPayoutDate;
    if (currentDay <= 15) {
      nextPayoutDate = new Date(currentYear, currentMonth, 15);
    } else {
      nextPayoutDate = new Date(currentYear, currentMonth + 1, 15);
    }
    
    const timeDiff = nextPayoutDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const partnerStats = {
    totalClients: 47,
    monthlyCommission: 15650,
    ytdCommission: 186200,
    activeInvestments: 2340000,
    newLeadsThisMonth: 23,
    tier: "Elite Partner",
    nextTierProgress: 78,
    daysToCommission: calculateDaysToCommission()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-600 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#040505] border-r border-silver-500/20 p-6 flex flex-col fixed h-full">
        <div className="flex items-center space-x-3 mb-8">
          <img src={logoImg} alt="Nakama&Partners" className="w-8 h-8" />
          <div>
            <h1 className="font-cormorant text-lg font-bold text-white">Nakama&Partners</h1>
            <p className="text-green text-xs">Portal de Partner</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setActiveTab("resumen")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "resumen" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Resumen</span>
          </button>
          
          <button
            onClick={() => setActiveTab("clientes")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "clientes" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Clientes</span>
          </button>
          
          <button
            onClick={() => setActiveTab("prospección")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "prospección" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <UserPlus className="h-4 w-4" />
            <span>Prospección</span>
          </button>
          
          <button
            onClick={() => setActiveTab("herramientas")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "herramientas" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Herramientas</span>
          </button>
          
          <Button 
            onClick={logout}
            variant="ghost" 
            className="w-full justify-start text-silver-100 hover:text-white hover:bg-black/50 mt-2"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Cerrar sesión
          </Button>
        </nav>

        {/* Partner Status Badge */}
        <div className="mt-auto pt-8">
          <div className="bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-green" />
              <span className="text-white text-sm font-medium">{partnerStats.tier}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        {activeTab === "resumen" && (
          <div>
            {/* Header with Commission Focus */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Hola, {user?.name?.split(' ')[0]}
              </h1>
              <p className="text-silver-100 text-lg mb-6">
                Bienvenido a tu panel de control ejecutivo
              </p>
              
              {/* Commission Showcase - Large and Motivational */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green/30 to-emerald-800/30 border-green/50">
                  <CardContent className="p-8 text-center">
                    <DollarSign className="w-12 h-12 text-green mx-auto mb-4" />
                    <div className="text-5xl font-bold text-white mb-2">
                      ${partnerStats.monthlyCommission.toLocaleString()}
                    </div>
                    <p className="text-green text-lg font-medium">Comisiones Este Mes</p>
                    <p className="text-silver-100 text-sm mt-2">¡Excelente rendimiento!</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gold/30 to-yellow-600/30 border-gold/50">
                  <CardContent className="p-8 text-center">
                    <Trophy className="w-12 h-12 text-gold mx-auto mb-4" />
                    <div className="text-5xl font-bold text-white mb-2">
                      ${(partnerStats.ytdCommission / 1000).toFixed(0)}K
                    </div>
                    <p className="text-gold text-lg font-medium">Total Año 2025</p>
                    <p className="text-silver-100 text-sm mt-2">Objetivo: $250K (75% completado)</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-600/30 to-indigo-800/30 border-blue-500/50">
                  <CardContent className="p-8 text-center">
                    <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <div className="text-5xl font-bold text-white mb-2">
                      {partnerStats.daysToCommission}
                    </div>
                    <p className="text-blue-400 text-lg font-medium">
                      {partnerStats.daysToCommission === 1 ? 'Día para Cobro' : 'Días para Cobro'}
                    </p>
                    <p className="text-silver-100 text-sm mt-2">
                      {partnerStats.daysToCommission === 0 ? '¡Hoy es día de pago!' : 
                       partnerStats.daysToCommission === 1 ? 'Mañana es día de pago' : 
                       'Próximo pago de comisiones'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Section */}
              <Card className="bg-gradient-to-r from-gold/20 to-gold/10 border-gold/30 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Crown className="w-6 h-6 text-green" />
                      <div>
                        <h3 className="text-white font-semibold">Progreso hacia Diamond Partner</h3>
                        <p className="text-silver-100 text-sm">Faltan $820K en volumen para la siguiente fase</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green font-bold text-lg">{partnerStats.nextTierProgress}%</div>
                    </div>
                  </div>
                  <Progress value={partnerStats.nextTierProgress} className="h-3" />
                </CardContent>
              </Card>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-[#040505] border-silver-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-silver-100 text-sm font-medium">Clientes Activos</p>
                      <p className="text-white text-3xl font-bold">{partnerStats.totalClients}</p>
                      <p className="text-green text-xs">+5 este mes</p>
                    </div>
                    <Users className="w-8 h-8 text-green" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#040505] border-silver-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-silver-100 text-sm font-medium">Volumen Total</p>
                      <p className="text-white text-3xl font-bold">${(partnerStats.activeInvestments / 1000000).toFixed(1)}M</p>
                      <p className="text-green text-xs">+12% vs mes anterior</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#040505] border-silver-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-silver-100 text-sm font-medium">Nuevos Leads</p>
                      <p className="text-white text-3xl font-bold">{partnerStats.newLeadsThisMonth}</p>
                      <p className="text-green text-xs">Este mes</p>
                    </div>
                    <UserPlus className="w-8 h-8 text-green" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Growth Chart - Full Width */}
            <div className="mb-8">
              <GrowthChart 
                initialAmount={100000}
                years={10}
                rate={0.09}
                showTitle={true}
                className="max-w-6xl mx-auto"
              />
            </div>
          </div>
        )}

        {activeTab === "clientes" && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestión de Clientes</h1>
            <p className="text-silver-100 mb-6">Administra tu cartera de inversores</p>
            
            <Card className="bg-[#040505] border-silver-500/20">
              <CardHeader>
                <CardTitle className="text-white">Cartera de Clientes</CardTitle>
                <CardDescription className="text-silver-100">
                  Gestiona y monitorea tu cartera de inversores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "María González", investment: 150000, returns: 13500, tier: "Premium", status: "Activo" },
                    { name: "Carlos Ruiz", investment: 75000, returns: 6750, tier: "Standard", status: "Activo" },
                    { name: "Ana López", investment: 200000, returns: 18000, tier: "Premium", status: "Activo" },
                    { name: "José Martín", investment: 50000, returns: 4500, tier: "Basic", status: "Pendiente" },
                  ].map((client, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-silver-500/10">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green/20 to-green/10 rounded-full flex items-center justify-center">
                          <span className="text-green font-semibold text-sm">{client.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{client.name}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant={client.tier === 'Premium' ? 'default' : 'secondary'} className="text-xs">
                              {client.tier}
                            </Badge>
                            <span className="text-silver-100 text-xs">{client.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">${client.investment.toLocaleString()}</p>
                        <p className="text-green text-sm">+${client.returns.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "prospección" && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Prospección de Leads</h1>
            <p className="text-silver-100 mb-6">Nuevas oportunidades de negocio</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#040505] border-silver-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Nuevos Prospectos</CardTitle>
                  <CardDescription className="text-silver-100">
                    {partnerStats.newLeadsThisMonth} nuevos leads este mes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Roberto Silva", source: "Referido", interest: "$80,000", priority: "Alta" },
                      { name: "Carmen Vega", source: "Web", interest: "$120,000", priority: "Media" },
                      { name: "Luis Torres", source: "LinkedIn", interest: "$60,000", priority: "Alta" },
                    ].map((lead, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{lead.name}</p>
                          <p className="text-silver-100 text-sm">{lead.source} • {lead.interest}</p>
                        </div>
                        <Badge variant={lead.priority === 'Alta' ? 'destructive' : 'secondary'}>
                          {lead.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#040505] border-silver-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Pipeline de Ventas</CardTitle>
                  <CardDescription className="text-silver-100">
                    Embudo de conversión actual
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { stage: "Contacto Inicial", count: 23, value: 920000, color: "blue" },
                      { stage: "Calificación", count: 15, value: 675000, color: "yellow" },
                      { stage: "Propuesta", count: 8, value: 480000, color: "orange" },
                      { stage: "Cierre", count: 3, value: 225000, color: "green" },
                    ].map((stage, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-sm font-medium">{stage.stage}</span>
                          <span className="text-silver-100 text-sm">{stage.count} leads</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <Progress value={(stage.count / 23) * 100} className="flex-1 mr-3 h-2" />
                          <span className="text-green text-sm font-semibold">${(stage.value / 1000).toFixed(0)}K</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "herramientas" && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Herramientas de Trabajo</h1>
            <p className="text-silver-100 mb-6">Recursos y utilidades para partners</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Calculadora Avanzada",
                  description: "Simula escenarios de inversión personalizados",
                  icon: <BarChart3 className="w-6 h-6" />,
                  premium: true
                },
                {
                  title: "Generador de Propuestas",
                  description: "Crea presentaciones profesionales automáticamente",
                  icon: <Briefcase className="w-6 h-6" />,
                  premium: true
                },
                {
                  title: "CRM Integrado",
                  description: "Gestiona contactos y seguimiento de clientes",
                  icon: <Users className="w-6 h-6" />,
                  premium: false
                },
                {
                  title: "Calendario de Citas",
                  description: "Programa reuniones con clientes potenciales",
                  icon: <Calendar className="w-6 h-6" />,
                  premium: false
                },
                {
                  title: "Reportes Ejecutivos",
                  description: "Análisis detallado de performance y métricas",
                  icon: <TrendingUp className="w-6 h-6" />,
                  premium: true
                },
                {
                  title: "Centro de Materiales",
                  description: "Acceso a presentaciones y documentos premium",
                  icon: <Award className="w-6 h-6" />,
                  premium: true
                }
              ].map((tool, index) => (
                <Card key={index} className={`${tool.premium ? 'bg-gradient-to-br from-gold/10 to-gold/5 border-gold/30' : 'bg-[#040505] border-silver-500/20'} hover:shadow-lg transition-all duration-300`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${tool.premium ? 'bg-green/20' : 'bg-white/10'}`}>
                        <div className={tool.premium ? 'text-green' : 'text-white'}>
                          {tool.icon}
                        </div>
                      </div>
                      {tool.premium && (
                        <Badge className="bg-green text-navy text-xs">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-white font-semibold mb-2">{tool.title}</h3>
                    <p className="text-silver-100 text-sm mb-4">{tool.description}</p>
                    <Button 
                      className={`w-full ${tool.premium ? 'bg-green hover:bg-green/80 text-navy' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    >
                      Acceder
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}