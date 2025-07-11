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
  Mail,
  Phone,
  Globe,
  Home,
  Package,
  User,
  Calculator
} from "lucide-react";
import logoSvg from "@/assets/logo.svg";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("inicio");

  const handleLogout = () => {
    setLocation("/login");
  };

  const kpis = [
    {
      title: "Total Leads",
      value: "46",
      change: "+12.5%",
      trending: "up"
    },
    {
      title: "Simulaciones",
      value: "41",
      change: "+8.2%",
      trending: "up"
    },
    {
      title: "Inversión Potencial",
      value: "€3.210.500",
      change: "+15.3%",
      trending: "up"
    },
    {
      title: "Conversión",
      value: "24.8%",
      change: "−2.1%",
      trending: "down"
    }
  ];

  const recentLeads = [
    {
      name: "María González",
      email: "maria.gonzalez@email.com",
      investment: "€75.000",
      channel: "Web",
      date: "2025-01-09"
    },
    {
      name: "Carlos Ruiz",
      email: "carlos.ruiz@email.com",
      investment: "€120.000",
      channel: "Web",
      date: "2025-01-09"
    },
    {
      name: "Ana Martín",
      email: "ana.martin@email.com",
      investment: "€95.000",
      channel: "Web",
      date: "2025-01-08"
    },
    {
      name: "Luis Fernández",
      email: "luis.fernandez@email.com",
      investment: "€180.000",
      channel: "Web",
      date: "2025-01-08"
    }
  ];

  const recentActivity = [
    { type: "lead", message: "Nuevo lead registrado: María González", time: "hace 2 horas" },
    { type: "simulation", message: "Simulación completada: €75.000", time: "hace 3 horas" },
    { type: "download", message: "PDF descargado: Dossier Institucional", time: "hace 4 horas" },
    { type: "lead", message: "Nuevo lead registrado: Carlos Ruiz", time: "hace 5 horas" },
    { type: "simulation", message: "Simulación completada: €120.000", time: "hace 6 horas" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-600 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#040505] border-r border-silver-500/20 p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <img src={logoSvg} alt="Logo" className="w-8 h-8" />
          <div>
            <h1 className="font-playfair text-lg font-bold text-white">FundedXam Capital</h1>
            <p className="text-gold text-xs">Portal de Asesores</p>
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
            onClick={() => setActiveTab("productos")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "productos" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <Package className="h-4 w-4" />
            <span>Productos</span>
          </button>
          
          <button
            onClick={() => setActiveTab("perfil")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "perfil" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Perfil</span>
          </button>
        </nav>

        <div className="mt-auto pt-8">
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="w-full justify-start text-silver-100 hover:text-white hover:bg-black/50"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Cerrar sesión
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "perfil" ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
                <p className="text-silver-100">Gestiona tu información personal</p>
              </div>
            </div>
            
            <Card className="bg-[#040505] border-silver-500/20">
              <CardContent className="p-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-black/50">
                    <TabsTrigger value="personal" className="data-[state=active]:bg-[#344e41]">
                      Información Personal
                    </TabsTrigger>
                    <TabsTrigger value="kyc" disabled className="opacity-50">
                      Estado KYC
                    </TabsTrigger>
                    <TabsTrigger value="productos" disabled className="opacity-50">
                      Productos
                    </TabsTrigger>
                    <TabsTrigger value="transacciones" disabled className="opacity-50">
                      Transacciones
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="mt-6">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="nombre" className="text-white">Nombre</Label>
                          <Input
                            id="nombre"
                            defaultValue="Test"
                            className="bg-black/50 border-silver-500/20 text-white"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="apellidos" className="text-white">Apellidos</Label>
                          <Input
                            id="apellidos"
                            defaultValue="Placeholder"
                            className="bg-black/50 border-silver-500/20 text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-white">Correo Electrónico</Label>
                        <Input
                          id="email"
                          defaultValue="test@test.com"
                          disabled
                          className="bg-black/30 border-silver-500/20 text-silver-300 cursor-not-allowed"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="fecha-nacimiento" className="text-white">Fecha de Nacimiento</Label>
                          <Input
                            id="fecha-nacimiento"
                            defaultValue="25/02/1962"
                            className="bg-black/50 border-silver-500/20 text-white"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="pais" className="text-white">País</Label>
                          <Select defaultValue="espana">
                            <SelectTrigger className="bg-black/50 border-silver-500/20 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-silver-500/20">
                              <SelectItem value="espana">España</SelectItem>
                              <SelectItem value="francia">Francia</SelectItem>
                              <SelectItem value="portugal">Portugal</SelectItem>
                              <SelectItem value="italia">Italia</SelectItem>
                              <SelectItem value="alemania">Alemania</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="direccion" className="text-white">Dirección</Label>
                        <Input
                          id="direccion"
                          defaultValue="Calle Nueva Era 45, 2ºA, 08035 Barcelona"
                          className="bg-black/50 border-silver-500/20 text-white"
                        />
                      </div>
                      
                      <div className="pt-6">
                        <Button 
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                        >
                          ACTUALIZAR INFORMACIÓN PERSONAL
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-silver-100">Vista general de tu actividad</p>
              </div>
              
              <Select defaultValue="last-30-days">
                <SelectTrigger className="w-40 bg-black/50 border-silver-500/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-silver-500/20">
                  <SelectItem value="last-7-days">Últimos 7 días</SelectItem>
                  <SelectItem value="last-30-days">Últimos 30 días</SelectItem>
                  <SelectItem value="last-90-days">Últimos 90 días</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpis.map((kpi, index) => (
                <Card key={index} className="bg-[#040505] border-silver-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-silver-100 text-sm">{kpi.title}</p>
                        <p className="text-2xl font-bold text-white">{kpi.value}</p>
                      </div>
                      <div className={`flex items-center space-x-1 ${
                        kpi.trending === "up" ? "text-green-500" : "text-red-500"
                      }`}>
                        {kpi.trending === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="text-sm">{kpi.change}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Leads */}
              <Card className="bg-[#040505] border-silver-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Leads Recientes</CardTitle>
                  <CardDescription className="text-silver-100">Últimos contactos registrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentLeads.map((lead, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#344e41] rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{lead.name}</p>
                            <p className="text-silver-100 text-sm">{lead.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gold font-semibold">{lead.investment}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-black/50">
                              <Globe className="h-3 w-3 mr-1" />
                              {lead.channel}
                            </Badge>
                            <span className="text-silver-100 text-xs">{lead.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-[#040505] border-silver-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Actividad Reciente</CardTitle>
                  <CardDescription className="text-silver-100">Últimas acciones en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg">
                        <div className="w-8 h-8 bg-[#344e41] rounded-full flex items-center justify-center">
                          {activity.type === "lead" && <Plus className="h-4 w-4 text-white" />}
                          {activity.type === "simulation" && <Calculator className="h-4 w-4 text-white" />}
                          {activity.type === "download" && <Download className="h-4 w-4 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm">{activity.message}</p>
                          <p className="text-silver-100 text-xs">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}