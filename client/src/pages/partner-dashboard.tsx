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
  Target, 
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

export default function PartnerDashboard() {
  useScrollToTop();
  const { user, logout } = useAuth();

  const partnerStats = {
    totalClients: 47,
    monthlyCommission: 15650,
    ytdCommission: 186200,
    activeInvestments: 2340000,
    conversionRate: 34,
    newLeadsThisMonth: 23,
    tier: "Elite Partner",
    nextTierProgress: 78
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Premium Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-gold/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={logoImg} alt="Logo" className="w-10 h-10" />
              <div>
                <h1 className="font-cormorant text-2xl font-bold text-white">Nakama&Partners</h1>
                <div className="flex items-center space-x-2">
                  <Crown className="w-4 h-4 text-gold" />
                  <span className="text-gold text-sm font-medium">Portal Ejecutivo</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">{user?.name}</p>
                <Badge className="bg-gold text-navy font-medium">
                  <Star className="w-3 h-3 mr-1" />
                  {partnerStats.tier}
                </Badge>
              </div>
              <Button 
                onClick={logout}
                variant="ghost" 
                className="text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Bienvenido, {user?.name?.split(' ')[0]}
              </h2>
              <p className="text-silver-100 text-lg">
                Panel de control ejecutivo para socios estratégicos
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gold mb-1">
                ${partnerStats.monthlyCommission.toLocaleString()}
              </div>
              <div className="text-silver-100 text-sm">Comisiones este mes</div>
            </div>
          </div>

          {/* Tier Progress */}
          <Card className="bg-gradient-to-r from-gold/20 to-gold/10 border-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-6 h-6 text-gold" />
                  <div>
                    <h3 className="text-white font-semibold">Progreso hacia Diamond Partner</h3>
                    <p className="text-silver-100 text-sm">Faltan $820K en volumen para el siguiente nivel</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gold font-bold text-lg">{partnerStats.nextTierProgress}%</div>
                </div>
              </div>
              <Progress value={partnerStats.nextTierProgress} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Clientes Activos</p>
                  <p className="text-white text-3xl font-bold">{partnerStats.totalClients}</p>
                  <p className="text-blue-200 text-xs">+5 este mes</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border-emerald-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-200 text-sm font-medium">Volumen Total</p>
                  <p className="text-white text-3xl font-bold">${(partnerStats.activeInvestments / 1000000).toFixed(1)}M</p>
                  <p className="text-emerald-200 text-xs">+12% vs mes anterior</p>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gold/20 to-yellow-600/20 border-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gold text-sm font-medium">Comisiones YTD</p>
                  <p className="text-white text-3xl font-bold">${(partnerStats.ytdCommission / 1000).toFixed(0)}K</p>
                  <p className="text-gold text-xs">Objetivo: $250K</p>
                </div>
                <DollarSign className="w-8 h-8 text-gold" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Tasa Conversión</p>
                  <p className="text-white text-3xl font-bold">{partnerStats.conversionRate}%</p>
                  <p className="text-purple-200 text-xs">Top 10% de partners</p>
                </div>
                <Target className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-black/50 p-1 space-x-1">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-gold data-[state=active]:text-navy px-6">
              <BarChart3 className="w-4 h-4 mr-2" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="clients" className="text-white data-[state=active]:bg-gold data-[state=active]:text-navy px-6">
              <Users className="w-4 h-4 mr-2" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="leads" className="text-white data-[state=active]:bg-gold data-[state=active]:text-navy px-6">
              <UserPlus className="w-4 h-4 mr-2" />
              Prospección
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-white data-[state=active]:bg-gold data-[state=active]:text-navy px-6">
              <Briefcase className="w-4 h-4 mr-2" />
              Herramientas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <Card className="bg-[#040505] border-silver-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-gold" />
                    Performance Mensual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "Enero", commission: 14200, clients: 3 },
                      { month: "Febrero", commission: 16800, clients: 4 },
                      { month: "Marzo", commission: 15650, clients: 5 },
                    ].map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{data.month}</p>
                          <p className="text-silver-100 text-sm">{data.clients} nuevos clientes</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gold font-bold">${data.commission.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-[#040505] border-silver-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-gold" />
                    Actividad Reciente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Nuevo cliente registrado", client: "María González", amount: "$50,000", time: "Hace 2 horas" },
                      { action: "Inversión incrementada", client: "Carlos Ruiz", amount: "$25,000", time: "Hace 5 horas" },
                      { action: "Renovación automática", client: "Ana López", amount: "$75,000", time: "Hace 1 día" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-black/30 rounded-lg">
                        <div className="w-2 h-2 bg-gold rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{activity.action}</p>
                          <p className="text-silver-100 text-xs">{activity.client} - {activity.amount}</p>
                          <p className="text-silver-100 text-xs">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
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
                        <div className="w-10 h-10 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                          <span className="text-gold font-semibold text-sm">{client.name.split(' ').map(n => n[0]).join('')}</span>
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
                        <p className="text-gold text-sm">+${client.returns.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
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
                  <Button className="w-full mt-4 bg-gold hover:bg-gold/80 text-navy font-semibold">
                    Ver Todos los Prospectos
                  </Button>
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
                          <span className="text-gold text-sm font-semibold">${(stage.value / 1000).toFixed(0)}K</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
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
                      <div className={`p-3 rounded-lg ${tool.premium ? 'bg-gold/20' : 'bg-white/10'}`}>
                        <div className={tool.premium ? 'text-gold' : 'text-white'}>
                          {tool.icon}
                        </div>
                      </div>
                      {tool.premium && (
                        <Badge className="bg-gold text-navy text-xs">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-white font-semibold mb-2">{tool.title}</h3>
                    <p className="text-silver-100 text-sm mb-4">{tool.description}</p>
                    <Button 
                      className={`w-full ${tool.premium ? 'bg-gold hover:bg-gold/80 text-navy' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    >
                      Acceder
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}