import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
  Zap,
  User,
  FileText,
  Download,
  Filter,
  Search,
  X
} from "lucide-react";
import logoImg from "@/assets/Logo-removeBG_1752488347081.png";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import CompoundInterestChart from "@/components/compound-interest-chart";

export default function PartnerDashboard() {
  useScrollToTop();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("resumen");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Partner Usuario',
    email: user?.email || '',
    phone: '+34 666 555 444',
    birthDate: '15/03/1985',
    address: 'Calle Mayor 123, 4º B, 28001 Madrid, España'
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  
  // Client filtering state
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    inversionMin: '',
    inversionMax: '',
    gananciasMin: '',
    gananciasMax: '',
    pais: '',
    sexo: '',
    estado: ''
  });

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

  const handleProfileInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    setIsEditingProfile(false);
    // Show success message
  };

  const handleCancelEdit = () => {
    // Reset to original values
    setProfileData({
      name: user?.name || 'Partner Usuario',
      email: user?.email || '',
      phone: '+34 666 555 444',
      birthDate: '15/03/1985',
      address: 'Calle Mayor 123, 4º B, 28001 Madrid, España'
    });
    setIsEditingProfile(false);
  };

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
    newLeadsThisMonth: 5,
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
            onClick={() => setActiveTab("perfil")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "perfil" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Perfil</span>
          </button>
          
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
            onClick={() => setActiveTab("contratos")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "contratos" ? "bg-[#344e41] text-white" : "text-silver-100 hover:bg-black/50"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Contratos</span>
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
        {activeTab === "perfil" && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Perfil de Partner</h1>
            <p className="text-silver-100 mb-6">Gestiona tu información personal y configuración de cuenta</p>
            
            <Card className="bg-[#040505] border-silver-500/20 max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white">Información Personal</CardTitle>
                <CardDescription className="text-silver-100">
                  Datos básicos de tu cuenta de partner
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Profile Picture Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-green/30 to-green/10 rounded-full flex items-center justify-center border-2 border-green/30 overflow-hidden">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-12 h-12 text-green" />
                      )}
                    </div>
                    <button 
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      className="absolute bottom-0 right-0 bg-green hover:bg-green/80 text-navy rounded-full p-2 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold">{profileData.name}</h3>
                    <p className="text-silver-100">Foto de perfil</p>
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      className="mt-2 border-silver-500/20 text-white hover:bg-white/10"
                    >
                      Cambiar foto
                    </Button>
                  </div>
                </div>

                {/* Personal Information Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Nombre Completo</label>
                    {isEditingProfile ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => handleProfileInputChange('name', e.target.value)}
                        className="bg-black/30 border-silver-500/20 text-white"
                      />
                    ) : (
                      <div className="bg-black/30 p-3 rounded-lg border border-silver-500/20">
                        <p className="text-white">{profileData.name}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Email</label>
                    {isEditingProfile ? (
                      <Input
                        value={profileData.email}
                        onChange={(e) => handleProfileInputChange('email', e.target.value)}
                        className="bg-black/30 border-silver-500/20 text-white"
                        type="email"
                      />
                    ) : (
                      <div className="bg-black/30 p-3 rounded-lg border border-silver-500/20">
                        <p className="text-white">{profileData.email}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Número de Teléfono</label>
                    {isEditingProfile ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) => handleProfileInputChange('phone', e.target.value)}
                        className="bg-black/30 border-silver-500/20 text-white"
                        type="tel"
                      />
                    ) : (
                      <div className="bg-black/30 p-3 rounded-lg border border-silver-500/20">
                        <p className="text-white">{profileData.phone}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Fecha de Nacimiento</label>
                    {isEditingProfile ? (
                      <Input
                        value={profileData.birthDate}
                        onChange={(e) => handleProfileInputChange('birthDate', e.target.value)}
                        className="bg-black/30 border-silver-500/20 text-white"
                        placeholder="DD/MM/YYYY"
                      />
                    ) : (
                      <div className="bg-black/30 p-3 rounded-lg border border-silver-500/20">
                        <p className="text-white">{profileData.birthDate}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-white text-sm font-medium">Dirección</label>
                    {isEditingProfile ? (
                      <Input
                        value={profileData.address}
                        onChange={(e) => handleProfileInputChange('address', e.target.value)}
                        className="bg-black/30 border-silver-500/20 text-white"
                      />
                    ) : (
                      <div className="bg-black/30 p-3 rounded-lg border border-silver-500/20">
                        <p className="text-white">{profileData.address}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  {isEditingProfile ? (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={handleCancelEdit}
                        className="border-silver-500/20 text-white hover:bg-white/10"
                      >
                        Cancelar
                      </Button>
                      <Button 
                        onClick={handleSaveProfile}
                        className="bg-green hover:bg-green/80 text-navy px-8"
                      >
                        Guardar Cambios
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={() => setIsEditingProfile(true)}
                      className="bg-green hover:bg-green/80 text-navy px-8"
                    >
                      Editar Información
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
              
              {/* Commission and Progress Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-[#040505] border-silver-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-silver-100 text-sm font-medium">Comisiones Este Mes</p>
                        <p className="text-white text-3xl font-bold">${partnerStats.monthlyCommission.toLocaleString()}</p>
                        <p className="text-green text-xs">¡Excelente rendimiento!</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#040505] border-silver-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-silver-100 text-sm font-medium">Total Año 2025</p>
                        <p className="text-white text-3xl font-bold">${(partnerStats.ytdCommission / 1000).toFixed(0)}K</p>
                        <p className="text-green text-xs">Objetivo: $250K (75% completado)</p>
                      </div>
                      <Trophy className="w-8 h-8 text-green" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#040505] border-silver-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-silver-100 text-sm font-medium">
                          {partnerStats.daysToCommission === 1 ? 'Día para Cobro' : 'Días para Cobro'}
                        </p>
                        <p className="text-white text-3xl font-bold">{partnerStats.daysToCommission}</p>
                        <p className="text-green text-xs">
                          {partnerStats.daysToCommission === 0 ? '¡Hoy es día de pago!' : 
                           partnerStats.daysToCommission === 1 ? 'Mañana es día de pago' : 
                           'Próximo pago de comisiones'}
                        </p>
                      </div>
                      <Calendar className="w-8 h-8 text-green" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#040505] border-silver-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-silver-100 text-sm font-medium">Progreso hacia Diamond Partner</p>
                        <p className="text-white text-3xl font-bold">{partnerStats.nextTierProgress}%</p>
                        <p className="text-green text-xs">Faltan $820K en volumen</p>
                      </div>
                      <Crown className="w-8 h-8 text-green" />
                    </div>
                    <Progress value={partnerStats.nextTierProgress} className="h-3" />
                  </CardContent>
                </Card>
              </div>
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

            {/* Comparison Chart - With vs Without Compound Interest */}
            <Card className="bg-[#040505] border-silver-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Comparación: Con vs Sin Interés Compuesto</CardTitle>
                <CardDescription className="text-silver-100">
                  Visualización del crecimiento de €50,000 con 9% anual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CompoundInterestChart 
                  initialAmount={50000}
                  rate={0.09}
                  years={10}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "clientes" && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestión de Clientes</h1>
            <p className="text-silver-100 mb-6">Administra tu cartera de inversores y gestiona renovaciones</p>
            
            {/* Filter Controls */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-silver-500/20 text-white hover:bg-white/10"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                </Button>
                
                {Object.values(filters).some(value => value !== '') && (
                  <Button 
                    variant="ghost" 
                    onClick={() => setFilters({
                      inversionMin: '',
                      inversionMax: '',
                      gananciasMin: '',
                      gananciasMax: '',
                      pais: '',
                      sexo: '',
                      estado: ''
                    })}
                    className="text-silver-100 hover:text-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpiar Filtros
                  </Button>
                )}
              </div>

              {showFilters && (
                <Card className="bg-[#040505] border-silver-500/20">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Investment Range */}
                      <div className="space-y-2">
                        <Label className="text-white">Inversión Inicial</Label>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Mín"
                            value={filters.inversionMin}
                            onChange={(e) => setFilters({...filters, inversionMin: e.target.value})}
                            className="bg-black/70 border-silver-500/20 text-white placeholder-silver-100"
                          />
                          <Input
                            placeholder="Máx"
                            value={filters.inversionMax}
                            onChange={(e) => setFilters({...filters, inversionMax: e.target.value})}
                            className="bg-black/70 border-silver-500/20 text-white placeholder-silver-100"
                          />
                        </div>
                      </div>

                      {/* Returns Range */}
                      <div className="space-y-2">
                        <Label className="text-white">Dinero Ganado</Label>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Mín"
                            value={filters.gananciasMin}
                            onChange={(e) => setFilters({...filters, gananciasMin: e.target.value})}
                            className="bg-black/70 border-silver-500/20 text-white placeholder-silver-100"
                          />
                          <Input
                            placeholder="Máx"
                            value={filters.gananciasMax}
                            onChange={(e) => setFilters({...filters, gananciasMax: e.target.value})}
                            className="bg-black/70 border-silver-500/20 text-white placeholder-silver-100"
                          />
                        </div>
                      </div>

                      {/* Country */}
                      <div className="space-y-2">
                        <Label className="text-white">País</Label>
                        <Select value={filters.pais} onValueChange={(value) => setFilters({...filters, pais: value})}>
                          <SelectTrigger className="bg-black/70 border-silver-500/20 text-white">
                            <SelectValue placeholder="Seleccionar país" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="España">España</SelectItem>
                            <SelectItem value="Francia">Francia</SelectItem>
                            <SelectItem value="Portugal">Portugal</SelectItem>
                            <SelectItem value="Italia">Italia</SelectItem>
                            <SelectItem value="Alemania">Alemania</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Gender */}
                      <div className="space-y-2">
                        <Label className="text-white">Sexo</Label>
                        <Select value={filters.sexo} onValueChange={(value) => setFilters({...filters, sexo: value})}>
                          <SelectTrigger className="bg-black/70 border-silver-500/20 text-white">
                            <SelectValue placeholder="Seleccionar sexo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hombre">Hombre</SelectItem>
                            <SelectItem value="Mujer">Mujer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Status */}
                      <div className="space-y-2">
                        <Label className="text-white">Estado</Label>
                        <Select value={filters.estado} onValueChange={(value) => setFilters({...filters, estado: value})}>
                          <SelectTrigger className="bg-black/70 border-silver-500/20 text-white">
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

            {/* Client Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-[#040505] border-silver-500/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">4</div>
                  <p className="text-silver-100 text-sm">Total Clientes</p>
                </CardContent>
              </Card>
              <Card className="bg-[#040505] border-green/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green">2</div>
                  <p className="text-silver-100 text-sm">Activos</p>
                </CardContent>
              </Card>
              <Card className="bg-[#040505] border-blue-500/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">3</div>
                  <p className="text-silver-100 text-sm">Con Interés Compuesto</p>
                </CardContent>
              </Card>
              <Card className="bg-[#040505] border-red-500/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">2</div>
                  <p className="text-silver-100 text-sm">Vencidos</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-[#040505] border-silver-500/20">
              <CardHeader>
                <CardTitle className="text-white">Cartera de Clientes</CardTitle>
                <CardDescription className="text-silver-100">
                  Información detallada para seguimiento y renovaciones
                </CardDescription>
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
                      sexo: "Mujer"
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
                      sexo: "Hombre"
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
                      sexo: "Mujer"
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
                      sexo: "Hombre"
                    }
                  ].filter(client => {
                    // Apply filters
                    const inversionMin = filters.inversionMin ? parseFloat(filters.inversionMin) : 0;
                    const inversionMax = filters.inversionMax ? parseFloat(filters.inversionMax) : Infinity;
                    const gananciasMin = filters.gananciasMin ? parseFloat(filters.gananciasMin) : 0;
                    const gananciasMax = filters.gananciasMax ? parseFloat(filters.gananciasMax) : Infinity;
                    
                    return (
                      client.investment >= inversionMin &&
                      client.investment <= inversionMax &&
                      client.returns >= gananciasMin &&
                      client.returns <= gananciasMax &&
                      (filters.pais === '' || client.pais === filters.pais) &&
                      (filters.sexo === '' || client.sexo === filters.sexo) &&
                      (filters.estado === '' || client.status === filters.estado)
                    );
                  }).map((client, index) => {
                    const daysToMaturity = Math.ceil((new Date(client.maturityDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                    const isNearMaturity = daysToMaturity <= 30 && daysToMaturity > 0;
                    const isExpired = daysToMaturity <= 0;
                    
                    return (
                      <Card key={index} className={`bg-black/30 border ${isNearMaturity ? 'border-yellow-500/50' : isExpired ? 'border-red-500/50' : 'border-silver-500/20'} hover:bg-black/40 transition-all`}>
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Client Info */}
                            <div className="space-y-4">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-green/20 to-green/10 rounded-full flex items-center justify-center">
                                  <span className="text-green font-semibold">{client.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                                <div>
                                  <h3 className="text-white font-semibold text-lg">{client.name}</h3>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant={client.tier === 'Premium' ? 'default' : 'secondary'} className="text-xs">
                                      {client.tier}
                                    </Badge>
                                    <Badge variant={client.status === 'Activo' ? 'default' : isNearMaturity ? 'destructive' : 'secondary'} className="text-xs">
                                      {client.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <p className="text-silver-100">{client.email}</p>
                                <p className="text-silver-100">{client.phone}</p>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="text-xs border-silver-500/20 text-silver-100">
                                    {client.pais}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs border-silver-500/20 text-silver-100">
                                    {client.sexo}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {/* Investment Details */}
                            <div className="space-y-4">
                              <div>
                                <p className="text-silver-100 text-sm">Inversión Inicial</p>
                                <p className="text-white font-bold text-2xl">${client.investment.toLocaleString()}</p>
                                <p className="text-green text-sm">Rendimientos: +${client.returns.toLocaleString()}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-silver-100">Fecha Depósito</p>
                                  <p className="text-white font-medium">{new Date(client.depositDate).toLocaleDateString('es-ES')}</p>
                                </div>
                                <div>
                                  <p className="text-silver-100">Interés Compuesto</p>
                                  <p className={`font-medium ${client.compoundInterest ? 'text-green' : 'text-yellow-400'}`}>
                                    {client.compoundInterest ? 'Sí' : 'No'}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Maturity & Actions */}
                            <div className="space-y-4">
                              <div>
                                <p className="text-silver-100 text-sm">Fecha Vencimiento</p>
                                <p className="text-white font-medium">{new Date(client.maturityDate).toLocaleDateString('es-ES')}</p>
                                <p className={`text-sm font-medium ${isExpired ? 'text-red-400' : isNearMaturity ? 'text-yellow-400' : 'text-green'}`}>
                                  {isExpired ? 'Vencido' : 
                                   isNearMaturity ? `Vence en ${daysToMaturity} días` : 
                                   `${daysToMaturity} días restantes`}
                                </p>
                              </div>

                              <div className="space-y-2">
                                {(isNearMaturity || isExpired) && (
                                  <Button className="w-full bg-green hover:bg-green/80 text-navy text-sm">
                                    Gestionar Renovación
                                  </Button>
                                )}
                                <Button variant="outline" className="w-full text-white border-silver-500/20 hover:bg-white/10 text-sm">
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
            <h1 className="text-3xl font-bold text-white mb-2">Contratos Firmados</h1>
            <p className="text-silver-100 mb-6">Accede y descarga todos tus contratos y documentos legales</p>
            
            {/* Progress Motivation Card */}
            <Card className="bg-gradient-to-r from-green/20 to-green/10 border-green/30 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-xl">Tu Progreso como Asesor</h3>
                    <p className="text-green text-sm">¡Sigue creciendo tu cartera de clientes!</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green">6</div>
                    <p className="text-silver-100 text-sm">Contratos Totales</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Contratos de Inversión</span>
                    <span className="text-green font-semibold">4 / 10 objetivo</span>
                  </div>
                  <div className="w-full bg-black/50 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green to-green/80 h-3 rounded-full" style={{width: '40%'}}></div>
                  </div>
                  <p className="text-silver-100 text-xs">¡Solo 6 contratos más para alcanzar tu objetivo mensual!</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
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
                  investment: null
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
                  investment: 150000
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
                  investment: 75000
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
                  investment: 200000
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
                  investment: 120000
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
                  investment: null
                }
              ].map((contract, index) => {
                const daysToEnd = Math.ceil((new Date(contract.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                const isExpiring = daysToEnd <= 30 && daysToEnd > 0;
                const isExpired = daysToEnd <= 0;
                
                return (
                <Card key={index} className={`bg-[#040505] border-silver-500/20 hover:bg-black/40 transition-all ${isExpiring ? 'border-yellow-500/50' : isExpired ? 'border-red-500/50' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-green" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{contract.title}</h3>
                          <p className="text-silver-100 text-sm">{contract.client}</p>
                          
                          {/* Client Tier Badge - Very Prominent */}
                          {contract.type === 'Inversión' && (
                            <div className="mt-2">
                              <Badge 
                                className={`text-sm px-3 py-1 font-bold ${
                                  contract.tier === 'Premium' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg' :
                                  contract.tier === 'Standard' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg' :
                                  'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg'
                                }`}
                              >
                                {contract.tier === 'Premium' ? '⭐ CLIENTE PREMIUM' : 
                                 contract.tier === 'Standard' ? '📋 CLIENTE STANDARD' : 
                                 '👑 ELITE'}
                              </Badge>
                            </div>
                          )}
                          
                          {/* Investment Amount for Investment Contracts */}
                          {contract.investment && (
                            <p className="text-green font-semibold text-lg mt-1">
                              ${contract.investment.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge 
                          className={`${
                            contract.status === 'Activo' ? 'bg-green text-navy' :
                            contract.status === 'Vigente' ? 'bg-blue-500 text-white' :
                            contract.status === 'Vencido' ? 'bg-red-500 text-white' :
                            'bg-yellow-500 text-navy'
                          }`}
                        >
                          {contract.status}
                        </Badge>
                        
                        {/* Days warning for expiring contracts */}
                        {isExpiring && (
                          <div className="text-yellow-400 text-xs font-semibold">
                            ⚠️ Vence en {daysToEnd} días
                          </div>
                        )}
                        {isExpired && (
                          <div className="text-red-400 text-xs font-semibold">
                            ❌ Vencido
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-silver-100">ID Contrato:</span>
                          <p className="text-white font-mono">{contract.id}</p>
                        </div>
                        <div>
                          <span className="text-silver-100">Tipo:</span>
                          <p className="text-white">{contract.type}</p>
                        </div>
                      </div>
                      
                      {/* Contract Start and End Dates - Very Clear */}
                      <div className="bg-black/30 rounded-lg p-4 border border-silver-500/20">
                        <h4 className="text-white font-semibold mb-3 text-center">📅 Duración del Contrato</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <span className="text-green text-xs font-medium block">INICIO</span>
                            <p className="text-white font-bold text-lg">{new Date(contract.signedDate).toLocaleDateString('es-ES')}</p>
                          </div>
                          <div className="text-center">
                            <span className={`text-xs font-medium block ${isExpired ? 'text-red-400' : isExpiring ? 'text-yellow-400' : 'text-green'}`}>
                              {isExpired ? 'VENCIDO' : 'VENCIMIENTO'}
                            </span>
                            <p className={`font-bold text-lg ${isExpired ? 'text-red-400' : isExpiring ? 'text-yellow-400' : 'text-white'}`}>
                              {new Date(contract.endDate).toLocaleDateString('es-ES')}
                            </p>
                          </div>
                        </div>
                        
                        {/* Contract progress bar */}
                        {!isExpired && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-silver-100">Progreso del contrato</span>
                              <span className="text-white">{Math.min(100, Math.max(0, Math.round(((new Date().getTime() - new Date(contract.signedDate).getTime()) / (new Date(contract.endDate).getTime() - new Date(contract.signedDate).getTime())) * 100)))}%</span>
                            </div>
                            <div className="w-full bg-black/50 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${isExpiring ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-green to-green/80'}`}
                                style={{width: `${Math.min(100, Math.max(0, ((new Date().getTime() - new Date(contract.signedDate).getTime()) / (new Date(contract.endDate).getTime() - new Date(contract.signedDate).getTime())) * 100))}%`}}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 text-sm">
                        <div>
                          <span className="text-silver-100">Tamaño del archivo:</span>
                          <p className="text-white">{contract.fileSize}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-green hover:bg-green/80 text-navy">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar PDF
                      </Button>
                      <Button variant="outline" className="border-silver-500/20 text-white hover:bg-white/10">
                        Ver Detalles
                      </Button>
                      {isExpiring && (
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                          Renovar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
                );
              })}
            </div>
            
            {/* Summary Card */}
            <Card className="bg-gradient-to-r from-green/20 to-green/10 border-green/30 mt-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green/20 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Total de Contratos</h3>
                      <p className="text-silver-100">6 documentos disponibles para descarga</p>
                    </div>
                  </div>
                  <Button className="bg-green hover:bg-green/80 text-navy">
                    Descargar Todos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "herramientas" && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Herramientas de Trabajo</h1>
            <p className="text-silver-100 mb-6">Gestiona tus citas y reuniones con clientes</p>
            
            <Card className="bg-[#040505] border-silver-500/20 max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-green" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">Calendario de Citas</h2>
                <p className="text-silver-100 mb-6">
                  Programa y gestiona reuniones con clientes potenciales y existentes. 
                  Sincroniza tu calendario y configura recordatorios automáticos.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center space-x-3 text-silver-100">
                    <div className="w-2 h-2 bg-green rounded-full"></div>
                    <span>Sincronización con Google Calendar</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-silver-100">
                    <div className="w-2 h-2 bg-green rounded-full"></div>
                    <span>Recordatorios automáticos por email</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-silver-100">
                    <div className="w-2 h-2 bg-green rounded-full"></div>
                    <span>Enlaces de videollamada automáticos</span>
                  </div>
                </div>
                
                <Button className="bg-green hover:bg-green/80 text-navy px-8 py-3 text-lg font-medium">
                  Abrir Calendario
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}