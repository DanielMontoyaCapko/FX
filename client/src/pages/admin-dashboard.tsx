import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  FileCheck, 
  Package, 
  FileText, 
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  LogOut,
  BarChart3,
  PieChart,
  Settings,
  Download
} from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import logoImg from "@/assets/Logo-removeBG_1753542032142.png";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalContracts: number;
  pendingKyc: number;
}

interface KycData {
  id: number;
  fullName: string;
  documentType: string;
  documentNumber: string;
  country: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  sponsor: string | null;
  grade: string;
  verificationStatus: string;
  createdAt: string;
}

interface ProductData {
  id: number;
  name: string;
  interestRate: string;
  termDays: number;
  minAmount: string;
  maxAmount: string;
  status: string;
  autoRenewal: boolean;
  contractTemplate: string | null;
}

interface ContractData {
  id: number;
  userId: number;
  userName: string;
  productId: number;
  productName: string;
  amount: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalContracts: 0,
    pendingKyc: 0
  });

  // Data states
  const [users, setUsers] = useState<UserData[]>([]);
  const [kyc, setKyc] = useState<KycData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [contracts, setContracts] = useState<ContractData[]>([]);
  const [loading, setLoading] = useState(true);

  // Search and filter states
  const [userSearch, setUserSearch] = useState("");
  const [kycSearch, setKycSearch] = useState("");
  const [kycFilter, setKycFilter] = useState("all");

  useEffect(() => {
    if (user?.role !== 'admin') {
      setLocation('/login');
      return;
    }
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all data
      const [usersRes, kycRes, productsRes, contractsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/kyc'),
        fetch('/api/admin/products'),
        fetch('/api/admin/contracts')
      ]);

      const usersData = await usersRes.json();
      const kycData = await kycRes.json();
      const productsData = await productsRes.json();
      const contractsData = await contractsRes.json();

      setUsers(usersData.users || []);
      setKyc(kycData.kyc || []);
      setProducts(productsData.products || []);
      setContracts(contractsData.contracts || []);

      // Calculate stats
      setStats({
        totalUsers: usersData.users?.length || 0,
        totalProducts: productsData.products?.length || 0,
        totalContracts: contractsData.contracts?.length || 0,
        pendingKyc: kycData.kyc?.filter((k: KycData) => k.status === 'pending').length || 0
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  // Chart data
  const kycChartData = [
    { name: 'Aprobados', value: kyc.filter(k => k.status === 'approved').length, color: '#22c55e' },
    { name: 'Pendientes', value: kyc.filter(k => k.status === 'pending').length, color: '#f59e0b' },
    { name: 'Rechazados', value: kyc.filter(k => k.status === 'rejected').length, color: '#ef4444' }
  ];

  const contractsChartData = [
    { name: 'Activos', value: contracts.filter(c => c.status === 'active').length, color: '#22c55e' },
    { name: 'Listos', value: contracts.filter(c => c.status === 'ready_to_start').length, color: '#f59e0b' },
    { name: 'Completados', value: contracts.filter(c => c.status === 'completed').length, color: '#3b82f6' }
  ];

  // Filter functions
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.id.toString().includes(userSearch)
  );

  const filteredKyc = kyc.filter(k => {
    const matchesSearch = k.fullName.toLowerCase().includes(kycSearch.toLowerCase()) ||
                          k.documentNumber.toLowerCase().includes(kycSearch.toLowerCase()) ||
                          k.id.toString().includes(kycSearch);
    const matchesFilter = kycFilter === 'all' || k.status === kycFilter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-white text-xl">Cargando panel de administración...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-[#040505] border-r border-silver-500/20 z-40">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <img src={logoImg} alt="Nakama&Partners" className="h-10 w-auto" />
            <div>
              <h2 className="text-lg font-bold text-white">Admin Panel</h2>
              <p className="text-silver-100 text-sm">{user?.name}</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "usuarios", label: "Usuarios", icon: Users },
              { id: "kyc", label: "KYC", icon: FileCheck },
              { id: "productos", label: "Productos", icon: Package },
              { id: "contratos", label: "Contratos", icon: FileText }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-green text-navy font-semibold"
                    : "text-silver-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-silver-500/20 text-silver-100 hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-8">Panel de Administración</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-[#040505] border-silver-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-silver-100 text-sm font-medium">Usuarios Totales</p>
                      <p className="text-white text-3xl font-bold">{stats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-green" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#040505] border-silver-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-silver-100 text-sm font-medium">Productos Totales</p>
                      <p className="text-white text-3xl font-bold">{stats.totalProducts}</p>
                    </div>
                    <Package className="w-8 h-8 text-green" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#040505] border-silver-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-silver-100 text-sm font-medium">Contratos Totales</p>
                      <p className="text-white text-3xl font-bold">{stats.totalContracts}</p>
                    </div>
                    <FileText className="w-8 h-8 text-green" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#040505] border-silver-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-silver-100 text-sm font-medium">KYC Pendientes</p>
                      <p className="text-white text-3xl font-bold">{stats.pendingKyc}</p>
                    </div>
                    <FileCheck className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-[#040505] border-silver-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Estado KYC</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={kycChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {kycChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-[#040505] border-silver-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Estado Contratos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={contractsChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {contractsChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "usuarios" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">Gestión de Usuarios</h1>
              <Button className="bg-green hover:bg-green/80 text-navy">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Usuario
              </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-100 w-4 h-4" />
                <Input
                  placeholder="Buscar por ID, nombre o email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="pl-10 bg-[#040505] border-silver-500/20 text-white"
                />
              </div>
            </div>

            {/* Users Table */}
            <Card className="bg-[#040505] border-silver-500/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-silver-500/20">
                      <tr>
                        <th className="text-left p-4 text-silver-100 font-medium">ID</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Nombre</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Email</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Rol</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Patrocinador</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Grado</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Estado</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Fecha</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-silver-500/10">
                          <td className="p-4 text-white">{user.id}</td>
                          <td className="p-4 text-white">{user.name}</td>
                          <td className="p-4 text-white">{user.email}</td>
                          <td className="p-4">
                            <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'partner' ? 'default' : 'secondary'}>
                              {user.role === 'admin' ? 'Administrador' : user.role === 'partner' ? 'Asesor' : 'Usuario'}
                            </Badge>
                          </td>
                          <td className="p-4 text-white">{user.sponsor || '-'}</td>
                          <td className="p-4 text-white">{user.grade}</td>
                          <td className="p-4">
                            <Badge variant={user.verificationStatus === 'verified' ? 'default' : 'secondary'}>
                              {user.verificationStatus === 'verified' ? 'Verificado' : 'Pendiente'}
                            </Badge>
                          </td>
                          <td className="p-4 text-white">
                            {new Date(user.createdAt).toLocaleDateString('es-ES')}
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-silver-500/20">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-silver-500/20">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500/20 text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "kyc" && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-6">Gestión KYC</h1>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-100 w-4 h-4" />
                <Input
                  placeholder="Buscar por ID, nombre o número de documento..."
                  value={kycSearch}
                  onChange={(e) => setKycSearch(e.target.value)}
                  className="pl-10 bg-[#040505] border-silver-500/20 text-white"
                />
              </div>
              <Select value={kycFilter} onValueChange={setKycFilter}>
                <SelectTrigger className="w-48 bg-[#040505] border-silver-500/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#040505] border-silver-500/20">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="approved">Aprobados</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="rejected">Rechazados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* KYC Table */}
            <Card className="bg-[#040505] border-silver-500/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-silver-500/20">
                      <tr>
                        <th className="text-left p-4 text-silver-100 font-medium">ID</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Nombre</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Tipo Doc</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Número</th>
                        <th className="text-left p-4 text-silver-100 font-medium">País</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Estado</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Fecha</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredKyc.map((record) => (
                        <tr key={record.id} className="border-b border-silver-500/10">
                          <td className="p-4 text-white">{record.id}</td>
                          <td className="p-4 text-white">{record.fullName}</td>
                          <td className="p-4 text-white">{record.documentType.toUpperCase()}</td>
                          <td className="p-4 text-white">{record.documentNumber}</td>
                          <td className="p-4 text-white">{record.country}</td>
                          <td className="p-4">
                            <Badge 
                              variant={
                                record.status === 'approved' ? 'default' : 
                                record.status === 'pending' ? 'secondary' : 
                                'destructive'
                              }
                            >
                              {record.status === 'approved' ? 'Aprobado' : 
                               record.status === 'pending' ? 'Pendiente' : 
                               'Rechazado'}
                            </Badge>
                          </td>
                          <td className="p-4 text-white">
                            {new Date(record.createdAt).toLocaleDateString('es-ES')}
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-silver-500/20">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-silver-500/20">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "productos" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">Gestión de Productos</h1>
              <Button className="bg-green hover:bg-green/80 text-navy">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Producto
              </Button>
            </div>

            {/* Products Table */}
            <Card className="bg-[#040505] border-silver-500/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-silver-500/20">
                      <tr>
                        <th className="text-left p-4 text-silver-100 font-medium">ID</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Nombre</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Tasa</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Plazo</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Monto Min</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Monto Max</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Estado</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Auto Renovación</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Contrato</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-silver-500/10">
                          <td className="p-4 text-white">{product.id}</td>
                          <td className="p-4 text-white">{product.name}</td>
                          <td className="p-4 text-white">{product.interestRate}%</td>
                          <td className="p-4 text-white">{product.termDays} días</td>
                          <td className="p-4 text-white">€{parseInt(product.minAmount).toLocaleString()}</td>
                          <td className="p-4 text-white">€{parseInt(product.maxAmount).toLocaleString()}</td>
                          <td className="p-4">
                            <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                              {product.status === 'active' ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant={product.autoRenewal ? 'default' : 'secondary'}>
                              {product.autoRenewal ? 'Sí' : 'No'}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Button size="sm" variant="outline" className="border-silver-500/20">
                              <Download className="w-4 h-4" />
                            </Button>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-silver-500/20">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-silver-500/20">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500/20 text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "contratos" && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-6">Gestión de Contratos</h1>

            {/* Contracts Table */}
            <Card className="bg-[#040505] border-silver-500/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-silver-500/20">
                      <tr>
                        <th className="text-left p-4 text-silver-100 font-medium">ID</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Usuario</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Producto</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Monto</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Estado</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Fecha</th>
                        <th className="text-left p-4 text-silver-100 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contracts.map((contract) => (
                        <tr key={contract.id} className="border-b border-silver-500/10">
                          <td className="p-4 text-white">{contract.id}</td>
                          <td className="p-4 text-white">{contract.userName}</td>
                          <td className="p-4 text-white">{contract.productName}</td>
                          <td className="p-4 text-white">€{parseInt(contract.amount).toLocaleString()}</td>
                          <td className="p-4">
                            <Badge 
                              variant={
                                contract.status === 'active' ? 'default' : 
                                contract.status === 'ready_to_start' ? 'secondary' : 
                                'outline'
                              }
                              className={
                                contract.status === 'active' ? 'bg-green text-navy' :
                                contract.status === 'ready_to_start' ? 'bg-yellow-500 text-navy' :
                                ''
                              }
                            >
                              {contract.status === 'active' ? 'Activo' : 
                               contract.status === 'ready_to_start' ? 'Listo para Iniciar' : 
                               contract.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-white">
                            {new Date(contract.createdAt).toLocaleDateString('es-ES')} {new Date(contract.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="p-4">
                            <Button size="sm" variant="outline" className="border-silver-500/20">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}