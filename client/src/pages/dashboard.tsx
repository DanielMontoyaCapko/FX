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
  ArrowLeft,
  Camera,
  Upload
} from "lucide-react";
import logoSvg from "@/assets/logo.svg";
import logoImg from "@/assets/Logo-removeBG_1752488347081.png";
import landscapeSvg from "@/assets/landscape.svg";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import GrowthChart from "@/components/growth-chart";
import CompoundInterestChart from "@/components/compound-interest-chart";
import InvestmentCalculator from "@/components/investment-calculator";

export default function Dashboard() {
  useScrollToTop();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("inicio");
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("646 123 456");

  const handleLogout = () => {
    setLocation("/login");
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductDetails = (product: any) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleBackToProducts = () => {
    setShowProductDetail(false);
    setSelectedProduct(null);
  };

  const handleDownloadStatement = async () => {
    try {
      // Generate PDF with account statement
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      // Header
      doc.setFontSize(20);
      doc.setTextColor(52, 78, 65);
      doc.text('NAKAMA&PARTNERS', 20, 30);
      doc.setFontSize(16);
      doc.text('Estado de Cuenta', 20, 45);

      // Client info
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Cliente: Juan Cliente', 20, 70);
      doc.text('Fecha: ' + new Date().toLocaleDateString('es-ES'), 20, 80);
      doc.text('Período: Enero 2025', 20, 90);

      // Investment summary
      doc.setFontSize(14);
      doc.setTextColor(52, 78, 65);
      doc.text('RESUMEN DE INVERSIÓN', 20, 110);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Capital Invertido: €50.000', 20, 130);
      doc.text('Rentabilidad Anual: 9.0%', 20, 140);
      doc.text('Tiempo Transcurrido: 3 meses', 20, 150);
      doc.text('Beneficio Acumulado: €1.125', 20, 160);
      doc.text('Valor Total Actual: €51.125', 20, 170);

      // Performance details
      doc.setFontSize(14);
      doc.setTextColor(52, 78, 65);
      doc.text('DETALLE DE RENDIMIENTO', 20, 190);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Enero 2025: +€375', 20, 210);
      doc.text('Febrero 2025: +€375', 20, 220);
      doc.text('Marzo 2025: +€375', 20, 230);

      // Projections
      doc.setFontSize(14);
      doc.setTextColor(52, 78, 65);
      doc.text('PROYECCIÓN A FIN DE AÑO', 20, 250);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Beneficio Total Estimado: €4.500', 20, 270);
      doc.text('Valor Final Estimado: €54.500', 20, 280);

      // Save the PDF
      doc.save('estado-cuenta-nakama-' + new Date().toISOString().split('T')[0] + '.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Inténtalo de nuevo.');
    }
  };

  const handleCalculateInvestment = () => {
    setShowCalculator(true);
  };

  const kpis = [
    {
      title: "Capital Invertido",
      value: "€50.000",
      change: "100% completado",
      trending: "up"
    },
    {
      title: "Progreso en Meses",
      value: "Mes 3 de 12",
      change: "25% del período",
      trending: "up"
    },
    {
      title: "Beneficio Total Estimado",
      value: "€4.500",
      change: "A fin de año",
      trending: "up"
    },
    {
      title: "Rentabilidad Anual",
      value: "9.0%",
      change: "Garantizada",
      trending: "up"
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
    { type: "download", message: "Estado de cuenta descargado exitosamente", time: "hace 1 hora" },
    { type: "simulation", message: "Nueva simulación de inversión: €25.000 a 24 meses", time: "hace 2 horas" },
    { type: "download", message: "Simulación descargada con gráfico incluido", time: "hace 3 horas" },
    { type: "simulation", message: "Calculadora utilizada: €50.000 a 36 meses", time: "hace 5 horas" },
    { type: "download", message: "Estado de cuenta enero 2025 generado", time: "hace 1 día" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-600 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#040505] border-r border-silver-500/20 p-6 flex flex-col fixed h-full">
        <div className="flex items-center space-x-3 mb-8">
          <img src={logoImg} alt="Nakama&Partners" className="w-8 h-8" />
          <div>
            <h1 className="font-cormorant text-lg font-bold text-white">Nakama&Partners</h1>
            <p className="text-green text-xs">Portal de Cliente</p>
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
            onClick={() => setActiveTab("perfil")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "perfil" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Perfil</span>
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
                  <TabsList className="grid w-full grid-cols-2 bg-black/50">
                    <TabsTrigger value="personal" className="data-[state=active]:bg-[#344e41]">
                      Información Personal
                    </TabsTrigger>
                    <TabsTrigger value="kyc" className="data-[state=active]:bg-[#344e41]">
                      Estado KYC
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="mt-6">
                    <form className="space-y-6">
                      {/* Profile Photo Section */}
                      <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-4">
                          <div className="w-32 h-32 rounded-full overflow-hidden bg-black/50 border-2 border-silver-500/20 flex items-center justify-center">
                            {profilePhoto ? (
                              <img 
                                src={profilePhoto} 
                                alt="Foto de perfil" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-16 h-16 text-silver-300" />
                            )}
                          </div>
                          <label 
                            htmlFor="photo-upload" 
                            className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 rounded-full p-2 cursor-pointer transition-colors"
                          >
                            <Camera className="w-4 h-4 text-white" />
                          </label>
                          <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </div>
                        <p className="text-silver-300 text-sm text-center">
                          Haz clic en el icono de cámara para subir tu foto de perfil
                        </p>
                      </div>

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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email" className="text-white">Correo Electrónico</Label>
                          <Input
                            id="email"
                            defaultValue="test@test.com"
                            disabled
                            className="bg-black/70 border-silver-500/20 text-silver-300 cursor-not-allowed"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="telefono" className="text-white">Número de Teléfono</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-silver-400" />
                            <Input
                              id="telefono"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              placeholder="Ej: +34 646 123 456"
                              className="bg-black/50 border-silver-500/20 text-white pl-10"
                            />
                          </div>
                        </div>
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
                    <div className="bg-black/70 rounded-lg p-8 text-center">
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
                  

                </Tabs>
              </CardContent>
            </Card>
          </div>
        ) : activeTab === "productos" ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white">Productos e Inversiones</h1>
                <p className="text-silver-100">Gestiona tus productos disponibles e inversiones activas</p>
              </div>
            </div>
            
            <Card className="bg-[#040505] border-silver-500/20 mb-8">
              <CardContent className="p-6">
                <Tabs defaultValue="disponibles" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-black/50">
                    <TabsTrigger value="disponibles" className="data-[state=active]:bg-[#344e41]">
                      Disponibles
                    </TabsTrigger>
                    <TabsTrigger value="activos" className="data-[state=active]:bg-[#344e41]">
                      Mis Productos
                    </TabsTrigger>
                    <TabsTrigger value="historial" className="data-[state=active]:bg-[#344e41]">
                      Historial
                    </TabsTrigger>
                    <TabsTrigger value="transacciones" className="data-[state=active]:bg-[#344e41]">
                      Transacciones
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="disponibles" className="mt-6">
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
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <div className="text-center text-white">
                            <h1 className="text-4xl font-bold mb-2">Productos Disponibles</h1>
                            <p className="text-xl">Descubre nuestras opciones de inversión</p>
                          </div>
                        </div>
                      </div>

                      {/* Products Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Product Card 1 - Only 9% Product */}
                        <Card className="bg-[#040505] border-silver-500/20 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <h2 className="text-xl font-bold text-white">Plazo fijo 9% 365 días</h2>
                              <Badge className="bg-blue-500 text-white">365 días</Badge>
                            </div>
                            
                            <p className="text-silver-100 mb-6 leading-relaxed text-sm">
                              Depósito bancario con un 9% de rentabilidad anual, mediante préstamo participativo y 
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
                              className="bg-green-600 hover:bg-green-700 text-white w-full py-2"
                            >
                              VER DETALLES
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="activos" className="mt-6">
                    <div className="space-y-4">
                      <div className="bg-black/70 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white">Plazo fijo 9% 365 días</h4>
                            <Badge className="bg-green-500 text-white mt-2">Activo</Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-500">€50.000</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-silver-100">Fecha de inicio</p>
                            <p className="text-white font-medium">01/01/2025</p>
                          </div>
                          <div>
                            <p className="text-silver-100">Rentabilidad Estimada</p>
                            <p className="text-white font-medium">9.0% anual</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="historial" className="mt-6">
                    <div className="space-y-4">
                      <div className="bg-black/70 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white">Plazo fijo 7% completado</h4>
                            <Badge className="bg-blue-500 text-white mt-2">Completado</Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-500">€25.000</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-silver-100">Inicio</p>
                            <p className="text-white font-medium">01/01/2024</p>
                          </div>
                          <div>
                            <p className="text-silver-100">Finalizado</p>
                            <p className="text-white font-medium">31/12/2024</p>
                          </div>
                          <div>
                            <p className="text-silver-100">Rentabilidad Final</p>
                            <p className="text-white font-medium">7.0%</p>
                          </div>
                        </div>
                      </div>
                    </div>
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
                      
                      <div className="bg-black/70 rounded-lg overflow-hidden">
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
                            <tr className="border-b border-silver-500/20">
                              <td className="p-4 text-silver-100">01/01/2025</td>
                              <td className="p-4">
                                <Badge className="bg-green-500 text-white">Depósito</Badge>
                              </td>
                              <td className="p-4 text-white">Inversión inicial Plazo fijo 9%</td>
                              <td className="p-4 text-green-500 font-semibold">+€50.000</td>
                              <td className="p-4">
                                <Badge className="bg-green-500 text-white">Completado</Badge>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
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
                <Card key={index} className="bg-[#040505] border-silver-500/20 border-transparent transition-all duration-300 hover:border-green-500 hover:bg-[#040505]/80 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
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

            {/* Capital Growth Chart - Large Landscape */}
            {/* Asesor Financiero Section */}
            <div className="mb-8">
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
                    <div className="bg-black/70 p-6 rounded-lg text-center border border-transparent transition-all duration-300 hover:border-green-500 hover:bg-black/80 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
                      <div className="w-12 h-12 bg-[#387b46] rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Rentabilidad Garantizada</h3>
                      <p className="text-green text-xl font-bold mb-2">9% Anual</p>
                      <p className="text-silver-100 text-sm">Retorno fijo y predecible</p>
                    </div>

                    <div className="bg-black/70 p-6 rounded-lg text-center border border-transparent transition-all duration-300 hover:border-green-500 hover:bg-black/80 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
                      <div className="w-12 h-12 bg-[#387b46] rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Capital Protegido</h3>
                      <p className="text-green text-xl font-bold mb-2">100%</p>
                      <p className="text-silver-100 text-sm">Garantía bancaria completa</p>
                    </div>

                    <div className="bg-black/70 p-6 rounded-lg text-center border border-transparent transition-all duration-300 hover:border-green-500 hover:bg-black/80 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
                      <div className="w-12 h-12 bg-[#387b46] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Flexibilidad Total</h3>
                      <p className="text-green text-xl font-bold mb-2">1-5 años</p>
                      <p className="text-silver-100 text-sm">Plazos adaptables</p>
                    </div>
                  </div>

                  {/* Compound Interest Comparison Chart */}
                  <div className="mb-8">
                    <CompoundInterestChart 
                      initialAmount={50000}
                      years={10}
                      rate={0.09}
                      className="max-w-7xl mx-auto w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {/* Recent Activity */}
              <Card className="bg-[#040505] border-silver-500/20 border-transparent transition-all duration-300 hover:border-green-500 hover:bg-[#040505]/80 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-white">Actividad Reciente</CardTitle>
                  <CardDescription className="text-silver-100">Últimas acciones en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-black/70 rounded-lg">
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
                <Button 
                  onClick={handleDownloadStatement}
                  className="bg-[#344e41] hover:bg-[#2d4235] text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Estado de Cuenta
                </Button>
                <Button 
                  onClick={handleCalculateInvestment}
                  className="gradient-navy text-white"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular Nueva Inversión
                </Button>
              </div>
            </div>




          </div>
        )}
      </div>

      {/* Investment Calculator Modal */}
      {showCalculator && (
        <InvestmentCalculator onClose={() => setShowCalculator(false)} />
      )}
    </div>
  );
}