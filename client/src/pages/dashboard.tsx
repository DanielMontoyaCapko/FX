import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  Calculator, 
  LogOut, 
  TrendingUp, 
  TrendingDown,
  Download,
  Calendar,
  Plus,
  Mail,
  Phone,
  Globe
} from "lucide-react";
import logoSvg from "@/assets/logo.svg";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");

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
      <div className="w-64 bg-[#040505] border-r border-silver-500/20 p-6">
        <div className="flex items-center space-x-3 mb-8">
          <img src={logoSvg} alt="Logo" className="w-8 h-8" />
          <div>
            <h1 className="font-playfair text-lg font-bold text-white">FundedXam Capital</h1>
            <p className="text-gold text-xs">Portal de Asesores</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "dashboard" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab("leads")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "leads" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Leads</span>
          </button>
          
          <button
            onClick={() => setActiveTab("simulations")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "simulations" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <Calculator className="h-4 w-4" />
            <span>Simulaciones</span>
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

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Acciones Rápidas</h2>
          <div className="flex space-x-4">
            <Button className="bg-[#344e41] hover:bg-[#2d4235] text-white">
              <Download className="h-4 w-4 mr-2" />
              Exportar Leads
            </Button>
            <Button className="gradient-navy text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Programar Seguimiento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}