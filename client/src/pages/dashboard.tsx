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
  Calculator,
  ArrowLeft
} from "lucide-react";
import logoSvg from "@/assets/logo.svg";
import logoImg from "@/assets/Logo-removeBG_1752488347081.png";
import landscapeSvg from "@/assets/landscape.svg";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("inicio");
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleLogout = () => {
    setLocation("/login");
  };

  const handleProductDetails = (product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleBackToProducts = () => {
    setShowProductDetail(false);
    setSelectedProduct(null);
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
      <div className="w-64 bg-[#040505] border-r border-silver-500/20 p-6 flex flex-col fixed h-full">
        <div className="flex items-center space-x-3 mb-8">
          <img src={logoImg} alt="Nakama&Partners" className="w-8 h-8" />
          <div>
            <h1 className="font-cormorant text-lg font-bold text-white">Nakama&Partners</h1>
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
          
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="w-full justify-start text-silver-100 hover:text-white hover:bg-black/50 mt-2"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Cerrar sesión
          </Button>
        </nav>

        <div className="mt-auto pt-8">
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
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
                    <TabsTrigger value="kyc" className="data-[state=active]:bg-[#344e41]">
                      Estado KYC
                    </TabsTrigger>
                    <TabsTrigger value="productos" className="data-[state=active]:bg-[#344e41]">
                      Productos
                    </TabsTrigger>
                    <TabsTrigger value="transacciones" className="data-[state=active]:bg-[#344e41]">
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
                  
                  <TabsContent value="kyc" className="mt-6">
                    <div className="bg-black/30 rounded-lg p-8 text-center">
                      <div className="flex items-center justify-center mb-6">
                        <div className="bg-green-500/20 rounded-full p-3 mr-4">
                          <User className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-2xl font-bold text-white mb-2">Verificación KYC</h3>
                          <p className="text-silver-100">
                            ¡Tu cuenta está verificada! Ya puedes realizar todas las operaciones en la plataforma.
                          </p>
                        </div>
                        <div className="ml-auto">
                          <Badge className="bg-green-500 text-white px-4 py-2 text-sm font-semibold">
                            Approved
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="productos" className="mt-6">
                    <Tabs defaultValue="activos" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 bg-black/50">
                        <TabsTrigger value="activos" className="data-[state=active]:bg-[#387b46]">
                          ACTIVOS
                        </TabsTrigger>
                        <TabsTrigger value="completados" className="data-[state=active]:bg-[#344e41]">
                          COMPLETADOS
                        </TabsTrigger>
                        <TabsTrigger value="cancelados" className="data-[state=active]:bg-[#344e41]">
                          CANCELADOS
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="activos" className="mt-6">
                        <div className="space-y-4">
                          <div className="bg-black/30 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-lg font-semibold text-white">Fondo de Inversión Verde Europa</h4>
                                <Badge className="bg-green-500 text-white mt-2">En curso</Badge>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-gold">5.000 €</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-silver-100">Fecha de inicio</p>
                                <p className="text-white font-medium">12/05/2025</p>
                              </div>
                              <div>
                                <p className="text-silver-100">Rentabilidad Estimada</p>
                                <p className="text-white font-medium">6.2% anual</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-black/30 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-lg font-semibold text-white">Plan Ahorro Flexible Plus</h4>
                                <Badge className="bg-green-500 text-white mt-2">Activo</Badge>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-gold">2.500 €</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-silver-100">Fecha de inicio</p>
                                <p className="text-white font-medium">01/07/2025</p>
                              </div>
                              <div>
                                <p className="text-silver-100">Rentabilidad Estimada</p>
                                <p className="text-white font-medium">3.8% anual</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="completados" className="mt-6">
                        <div className="space-y-4">
                          <div className="bg-black/30 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-lg font-semibold text-white">Bono Corporativo Energía Solar</h4>
                                <Badge className="bg-blue-500 text-white mt-2">Éxito</Badge>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-gold">10.000 €</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-silver-100">Inicio</p>
                                <p className="text-white font-medium">10/03/2024</p>
                              </div>
                              <div>
                                <p className="text-silver-100">Finalizado</p>
                                <p className="text-white font-medium">10/03/2025</p>
                              </div>
                              <div>
                                <p className="text-silver-100">Rentabilidad Final</p>
                                <p className="text-white font-medium">5.5%</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-black/30 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-lg font-semibold text-white">Fondo Tecnología Asia</h4>
                                <Badge className="bg-blue-500 text-white mt-2">Éxito</Badge>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-gold">7.000 €</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-silver-100">Inicio</p>
                                <p className="text-white font-medium">15/01/2023</p>
                              </div>
                              <div>
                                <p className="text-silver-100">Finalizado</p>
                                <p className="text-white font-medium">15/01/2024</p>
                              </div>
                              <div>
                                <p className="text-silver-100">Rentabilidad Final</p>
                                <p className="text-white font-medium">4.9%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="cancelados" className="mt-6">
                        <div className="space-y-4">
                          <div className="bg-black/30 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-lg font-semibold text-white">Fondo Startups LatAm</h4>
                                <Badge className="bg-red-500 text-white mt-2">Cancelado</Badge>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-gray-400">3.000 €</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-silver-100">Fecha de cancelación</p>
                                <p className="text-white font-medium">02/04/2025</p>
                              </div>
                              <div>
                                <p className="text-silver-100">Motivo</p>
                                <p className="text-white font-medium">No se alcanzó el capital mínimo requerido</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-black/30 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-lg font-semibold text-white">Plan de Ahorro Salud</h4>
                                <Badge className="bg-red-500 text-white mt-2">Cancelado</Badge>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-gray-400">1.500 €</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-silver-100">Fecha de cancelación</p>
                                <p className="text-white font-medium">20/06/2025</p>
                              </div>
                              <div>
                                <p className="text-silver-100">Motivo</p>
                                <p className="text-white font-medium">Cancelado por el usuario antes del inicio</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </TabsContent>
                  
                  <TabsContent value="transacciones" className="mt-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white">Historial de Transacciones</h3>
                        <Select defaultValue="todos">
                          <SelectTrigger className="w-40 bg-black/50 border-silver-500/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-silver-500/20">
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="depositos">Depósitos</SelectItem>
                            <SelectItem value="retiros">Retiros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="bg-black/30 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-black/50">
                            <tr>
                              <th className="text-left p-4 text-white font-semibold">FECHA</th>
                              <th className="text-left p-4 text-white font-semibold">TIPO</th>
                              <th className="text-left p-4 text-white font-semibold">DESCRIPCIÓN</th>
                              <th className="text-left p-4 text-white font-semibold">MONTO</th>
                              <th className="text-left p-4 text-white font-semibold">ESTADO</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Empty table body */}
                          </tbody>
                        </table>
                        
                        <div className="p-8 text-center">
                          <p className="text-silver-100 text-lg">No hay transacciones para mostrar</p>
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
            {showProductDetail ? (
              /* Product Detail View */
              <div>
                {/* Back Button */}
                <div className="mb-6">
                  <Button 
                    onClick={handleBackToProducts}
                    variant="ghost" 
                    className="text-white hover:bg-black/50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver a Productos
                  </Button>
                </div>

                <h1 className="text-3xl font-bold text-white mb-8">Vista Detallada del Producto</h1>

                {/* Main Product Information and Simulator Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  {/* Section 1: Product Information */}
                  <div className="lg:col-span-2">
                    <Card className="bg-[#040505] border-silver-500/20 h-full">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                          <h2 className="text-2xl font-bold text-white">Plazo fijo 9% 365 días</h2>
                          <Badge className="bg-green-500 text-white text-lg px-4 py-2">9.00% interés</Badge>
                        </div>
                        
                        <p className="text-silver-100 mb-6 leading-relaxed">
                          Depósito bancario con un 9% de rentabilidad anual, mediante préstamo participativo y 
                          cesión de la pignoración al cliente depositante
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <div>
                            <p className="text-silver-100 text-sm">Plazo</p>
                            <p className="text-white font-semibold text-lg">365 días</p>
                          </div>
                          <div>
                            <p className="text-silver-100 text-sm">Renovación</p>
                            <div className="flex items-center gap-2">
                              <p className="text-white font-semibold text-lg">Auto-renovable</p>
                              <Badge className="bg-green-500 text-white">Automático</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-[#344e41] border border-[#344e41] rounded-lg p-4 mb-6">
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-white font-medium">
                              ¿Listo para invertir? Haz clic en el botón para contratar este producto
                            </p>
                            <Button className="bg-[#387b46] hover:bg-[#2d6334] text-white px-6 py-2 text-sm whitespace-nowrap">
                              CONTRATAR AHORA
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Section 2: Investment Simulator */}
                  <div className="lg:col-span-1">
                    <Card className="bg-[#040505] border-silver-500/20 h-full">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Simulador de Inversión</h3>
                        <p className="text-silver-100 mb-4 text-sm">Con una inversión de $10,000 podrías ganar:</p>
                        <div className="text-center">
                          <p className="text-5xl font-bold text-green-500">$900.00</p>
                          <p className="text-silver-100 text-xl font-medium">en 365 días</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Section 3: User Contracts */}
                <Card className="bg-[#040505] border-silver-500/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Tus Contratos en este Producto</h3>
                    
                    <div className="bg-black/30 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-black/50">
                          <tr>
                            <th className="text-left p-4 text-white font-semibold">FECHA</th>
                            <th className="text-left p-4 text-white font-semibold">MONTO</th>
                            <th className="text-left p-4 text-white font-semibold">ESTADO</th>
                            <th className="text-left p-4 text-white font-semibold">NOTAS</th>
                            <th className="text-left p-4 text-white font-semibold">ACCIONES</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-silver-500/20">
                            <td className="p-4 text-white">16/6/2025</td>
                            <td className="p-4 text-white font-semibold">$50,000.00</td>
                            <td className="p-4">
                              <Badge className="bg-blue-500 text-white">ready</Badge>
                            </td>
                            <td className="p-4 text-silver-100">Contrato aprobado</td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="border-white text-white hover:bg-white/10">
                                  Ver Contrato
                                </Button>
                                <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                                  Cancelar
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Products List View */
              <div>
                {/* Hero Section with Background Image */}
                <div 
                  className="relative h-80 rounded-lg overflow-hidden mb-8"
                  style={{
                    backgroundImage: `url(${landscapeSvg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h1 className="text-4xl font-bold mb-2">Prueba</h1>
                      <p className="text-xl">Anuncio de prueba</p>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Product Card 1 */}
                  <Card className="bg-[#040505] border-silver-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-xl font-bold text-white">Plazo fijo 9% 365 días</h2>
                        <Badge className="bg-blue-500 text-white">365 días</Badge>
                      </div>
                      
                      <p className="text-silver-100 mb-6 leading-relaxed text-sm">
                        Depósito bancario con un 9 % de rentabilidad anual, mediante préstamo participativo y 
                        cesión de la pignoración al cliente depositante
                      </p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-2xl font-bold text-green-500">9.00%</p>
                          <p className="text-silver-100 text-xs">Rentabilidad anual</p>
                        </div>
                        <Badge className="bg-orange-500 text-white">No renovable</Badge>
                      </div>
                      
                      <Button 
                        onClick={() => handleProductDetails({id: 1, name: 'Plazo fijo 9% 365 días'})}
                        className="bg-green-600 hover:bg-green-700 text-white w-full py-2"
                      >
                        VER DETALLES
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Product Card 2 - Placeholder */}
                  <Card className="bg-[#040505] border-silver-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-xl font-bold text-white">Plazo fijo 7% 180 días</h2>
                        <Badge className="bg-blue-500 text-white">180 días</Badge>
                      </div>
                      
                      <p className="text-silver-100 mb-6 leading-relaxed text-sm">
                        Depósito bancario con un 7 % de rentabilidad anual, mediante préstamo participativo y 
                        cesión de la pignoración al cliente depositante
                      </p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-2xl font-bold text-green-500">7.00%</p>
                          <p className="text-silver-100 text-xs">Rentabilidad anual</p>
                        </div>
                        <Badge className="bg-orange-500 text-white">No renovable</Badge>
                      </div>
                      
                      <Button className="bg-green-600 hover:bg-green-700 text-white w-full py-2">
                        VER DETALLES
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Product Card 3 - Placeholder */}
                  <Card className="bg-[#040505] border-silver-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-xl font-bold text-white">Plazo fijo 5% 90 días</h2>
                        <Badge className="bg-blue-500 text-white">90 días</Badge>
                      </div>
                      
                      <p className="text-silver-100 mb-6 leading-relaxed text-sm">
                        Depósito bancario con un 5 % de rentabilidad anual, mediante préstamo participativo y 
                        cesión de la pignoración al cliente depositante
                      </p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-2xl font-bold text-green-500">5.00%</p>
                          <p className="text-silver-100 text-xs">Rentabilidad anual</p>
                        </div>
                        <Badge className="bg-orange-500 text-white">No renovable</Badge>
                      </div>
                      
                      <Button className="bg-green-600 hover:bg-green-700 text-white w-full py-2">
                        VER DETALLES
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
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

            {/* Asesor Financiero Section */}
            <div className="mt-8">
              <Card className="bg-[#040505] border-silver-500/20">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Asesor Financiero: Un Producto Sólido, Fácil de Explicar, Imposible de Ignorar
                    </h2>
                    <p className="text-silver-100 max-w-3xl mx-auto">
                      Presentamos una oportunidad de inversión única que combina seguridad, rentabilidad y simplicidad. 
                      Perfect para explicar a tus clientes y cerrar ventas efectivamente.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-black/30 p-6 rounded-lg text-center">
                      <div className="w-12 h-12 bg-[#387b46] rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Rentabilidad Garantizada</h3>
                      <p className="text-gold text-xl font-bold mb-2">9% Anual</p>
                      <p className="text-silver-100 text-sm">Retorno fijo y predecible</p>
                    </div>

                    <div className="bg-black/30 p-6 rounded-lg text-center">
                      <div className="w-12 h-12 bg-[#387b46] rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Capital Protegido</h3>
                      <p className="text-gold text-xl font-bold mb-2">100%</p>
                      <p className="text-silver-100 text-sm">Garantía bancaria completa</p>
                    </div>

                    <div className="bg-black/30 p-6 rounded-lg text-center">
                      <div className="w-12 h-12 bg-[#387b46] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Flexibilidad Total</h3>
                      <p className="text-gold text-xl font-bold mb-2">1-5 años</p>
                      <p className="text-silver-100 text-sm">Plazos adaptables</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Perfil del Cliente Ideal */}
            <div className="mt-8">
              <Card className="bg-[#040505] border-silver-500/20">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-3">Perfil del Cliente Ideal</h3>
                      <ul className="text-white/90 space-y-2">
                        <li>• Inversores conservadores buscando estabilidad</li>
                        <li>• Personas próximas a la jubilación</li>
                        <li>• Familias planificando el futuro</li>
                        <li>• Empresarios diversificando patrimonio</li>
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gold font-bold text-lg">€50K-500K</p>
                        <p className="text-silver-100 text-sm">Capacidad inversión</p>
                      </div>
                      <div>
                        <p className="text-gold font-bold text-lg">Conservador</p>
                        <p className="text-silver-100 text-sm">Perfil de riesgo</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="mt-8">
              <Card className="bg-[#040505] border-silver-500/20">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2">¿Listo para presentar el producto?</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Utiliza la calculadora para mostrar proyecciones reales y impactar a tus clientes.
                  </p>
                  <div className="flex space-x-3">
                    <Button className="bg-white text-[#344e41] hover:bg-gray-100">
                      <Calculator className="h-4 w-4 mr-2" />
                      Ver Calculadora
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      <Download className="h-4 w-4 mr-2" />
                      Material de Ventas
                    </Button>
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