import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
  Download,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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
  status: "approved" | "pending" | "rejected";
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
    pendingKyc: 0,
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

  // Dialog states
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showKycDialog, setShowKycDialog] = useState(false);
  const [showContractDialog, setShowContractDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [editingKyc, setEditingKyc] = useState<KycData | null>(null);
  const [editingContract, setEditingContract] = useState<any>(null);

  // Form states
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
    sponsor: "",
    grade: "Bronze",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    interestRate: "",
    termDays: "",
    minAmount: "",
    maxAmount: "",
    status: "active",
    autoRenewal: false,
    contractTemplate: "",
  });

  useEffect(() => {
    if (user?.role !== "admin") {
      setLocation("/login");
      return;
    }
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        setLocation("/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [usersRes, kycRes, productsRes, contractsRes] = await Promise.all([
        fetch("/api/admin/users", { headers }),
        fetch("/api/admin/kyc", { headers }),
        fetch("/api/admin/products", { headers }),
        fetch("/api/admin/contracts", { headers }),
      ]);

      const usersData = await usersRes.json();
      const kycData = await kycRes.json();
      const productsData = await productsRes.json();
      const contractsData = await contractsRes.json();

      setUsers(usersData.users || []);
      setKyc(kycData.kyc || []);
      setProducts(productsData.products || []);
      setContracts(contractsData.contracts || []);

      setStats({
        totalUsers: usersData.users?.length || 0,
        totalProducts: productsData.products?.length || 0,
        totalContracts: contractsData.contracts?.length || 0,
        pendingKyc: kycData.kyc?.filter((k: KycData) => k.status === "pending").length || 0,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  // Chart data
  const kycChartData = [
    { name: "Aprobados", value: kyc.filter((k) => k.status === "approved").length, color: "#22c55e" },
    { name: "Pendientes", value: kyc.filter((k) => k.status === "pending").length, color: "#f59e0b" },
    { name: "Rechazados", value: kyc.filter((k) => k.status === "rejected").length, color: "#ef4444" },
  ];

  const contractsChartData = [
    { name: "Activos", value: contracts.filter((c) => c.status === "active").length, color: "#22c55e" },
    { name: "Listos", value: contracts.filter((c) => c.status === "ready_to_start").length, color: "#f59e0b" },
    { name: "Completados", value: contracts.filter((c) => c.status === "completed").length, color: "#3b82f6" },
  ];

  // Filter functions
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.id.toString().includes(userSearch)
  );

  const filteredKyc = kyc.filter((k) => {
    const matchesSearch =
      k.fullName.toLowerCase().includes(kycSearch.toLowerCase()) ||
      k.documentNumber.toLowerCase().includes(kycSearch.toLowerCase()) ||
      k.id.toString().includes(kycSearch);
    const matchesFilter = kycFilter === "all" || k.status === kycFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCreateUser = async () => {
    try {
      if (!newUser.name || !newUser.email) {
        alert("Por favor complete todos los campos obligatorios");
        return;
      }
      if (!editingUser && (!newUser.password || newUser.password.length < 6)) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
      }

      const token = localStorage.getItem("token");
      let url = "/api/register";
      let method = "POST";
      let body: any = { ...newUser };

      if (editingUser) {
        url = `/api/admin/users/${editingUser.id}`;
        method = "PUT";
        if (!newUser.password) {
          const { password, ...rest } = body;
          body = rest;
        }
      }

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(editingUser ? "Usuario actualizado exitosamente" : "Usuario creado exitosamente");
        handleCloseUserDialog();
        await loadDashboardData();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "No se pudo procesar el usuario"}`);
      }
    } catch (error) {
      console.error("Error creating/updating user:", error);
      alert("Error de conexión al procesar usuario");
    }
  };

  const handleCreateProduct = async () => {
    try {
      if (
        !newProduct.name ||
        !newProduct.interestRate ||
        !newProduct.termDays ||
        !newProduct.minAmount ||
        !newProduct.maxAmount
      ) {
        alert("Por favor complete todos los campos obligatorios");
        return;
      }
      if (isNaN(parseInt(newProduct.termDays)) || parseInt(newProduct.termDays) <= 0) {
        alert("El plazo debe ser un número válido mayor a 0");
        return;
      }

      const token = localStorage.getItem("token");
      let url = "/api/admin/products";
      let method = "POST";

      if (editingProduct) {
        url = `/api/admin/products/${editingProduct.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ ...newProduct, termDays: parseInt(newProduct.termDays as any) }),
      });

      if (response.ok) {
        alert(editingProduct ? "Producto actualizado exitosamente" : "Producto creado exitosamente");
        handleCloseProductDialog();
        await loadDashboardData();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "No se pudo procesar el producto"}`);
      }
    } catch (error) {
      console.error("Error creating/updating product:", error);
      alert("Error de conexión al procesar producto");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("¿Está seguro de que desea eliminar este usuario?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        alert("Usuario eliminado exitosamente");
        await loadDashboardData();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "No se pudo eliminar el usuario"}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error de conexión al eliminar usuario");
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm("¿Está seguro de que desea eliminar este producto?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        alert("Producto eliminado exitosamente");
        await loadDashboardData();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "No se pudo eliminar el producto"}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error de conexión al eliminar producto");
    }
  };

  const handleEditUser = (u: UserData) => {
    setEditingUser(u);
    setNewUser({
      name: u.name,
      email: u.email,
      password: "",
      role: u.role,
      sponsor: u.sponsor || "",
      grade: u.grade,
    });
    setShowUserDialog(true);
  };

  const handleEditProduct = (p: ProductData) => {
    setEditingProduct(p);
    setNewProduct({
      name: p.name,
      interestRate: p.interestRate,
      termDays: p.termDays.toString(),
      minAmount: p.minAmount,
      maxAmount: p.maxAmount,
      status: p.status,
      autoRenewal: p.autoRenewal,
      contractTemplate: p.contractTemplate || "",
    });
    setShowProductDialog(true);
  };

  const handleUpdateKycStatus = async (kycId: number, newStatus: "approved" | "pending" | "rejected") => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/kyc/${kycId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        alert(
          `Estado KYC actualizado a ${
            newStatus === "approved" ? "Aprobado" : newStatus === "rejected" ? "Rechazado" : "Pendiente"
          }`
        );
        await loadDashboardData();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "No se pudo actualizar el estado KYC"}`);
      }
    } catch (error) {
      console.error("Error updating KYC status:", error);
      alert("Error de conexión al actualizar estado KYC");
    }
  };

  const handleUpdateContractStatus = async (
    contractId: number,
    newStatus: "active" | "ready_to_start" | "completed" | "cancelled"
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/contracts/${contractId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const statusText = {
          active: "Activo",
          ready_to_start: "Listo para Iniciar",
          completed: "Completado",
          cancelled: "Cancelado",
        };
        alert(`Estado del contrato actualizado a ${statusText[newStatus]}`);
        await loadDashboardData();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "No se pudo actualizar el estado del contrato"}`);
      }
    } catch (error) {
      console.error("Error updating contract:", error);
      alert("Error de conexión al actualizar estado del contrato");
    }
  };

  const handleCloseUserDialog = () => {
    setShowUserDialog(false);
    setEditingUser(null);
    setNewUser({ name: "", email: "", password: "", role: "client", sponsor: "", grade: "Bronze" });
  };

  const handleCloseProductDialog = () => {
    setShowProductDialog(false);
    setEditingProduct(null);
    setNewProduct({
      name: "",
      interestRate: "",
      termDays: "",
      minAmount: "",
      maxAmount: "",
      status: "active",
      autoRenewal: false,
      contractTemplate: "",
    });
  };

  const handleEditKyc = (k: KycData) => {
    setEditingKyc(k);
    setShowKycDialog(true);
  };
  const handleCloseKycDialog = () => {
    setShowKycDialog(false);
    setEditingKyc(null);
  };

  const handleUpdateKycForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKyc) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/kyc/${editingKyc.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status: editingKyc.status }),
      });

      if (response.ok) {
        alert(
          `Estado KYC actualizado a ${
            editingKyc.status === "approved" ? "Aprobado" : editingKyc.status === "rejected" ? "Rechazado" : "Pendiente"
          }`
        );
        handleCloseKycDialog();
        await loadDashboardData();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "No se pudo actualizar el estado KYC"}`);
      }
    } catch (error) {
      console.error("Error updating KYC:", error);
      alert("Error de conexión al actualizar KYC");
    }
  };

  const handleEditContract = (c: any) => {
    setEditingContract(c);
    setShowContractDialog(true);
  };
  const handleCloseContractDialog = () => {
    setShowContractDialog(false);
    setEditingContract(null);
  };
  const handleUpdateContractForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContract) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/contracts/${editingContract.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status: editingContract.status }),
      });

      if (response.ok) {
        const statusText = {
          active: "Activo",
          ready_to_start: "Listo para Iniciar",
          completed: "Completado",
          cancelled: "Cancelado",
        } as const;
        alert(`Estado del contrato actualizado a ${statusText[editingContract.status as keyof typeof statusText]}`);
        handleCloseContractDialog();
        await loadDashboardData();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "No se pudo actualizar el estado del contrato"}`);
      }
    } catch (error) {
      console.error("Error updating contract:", error);
      alert("Error de conexión al actualizar contrato");
    }
  };

  if (loading) {
    return (
      <div
        className={[
          "relative min-h-screen flex items-center justify-center",
          "bg-gradient-to-br from-black via-[#0A1713] to-[#0E2A1F]",
          "before:pointer-events-none before:absolute before:inset-0",
          "before:bg-[radial-gradient(80%_60%_at_110%_-10%,rgba(16,185,129,0.18),transparent),radial-gradient(60%_40%_at_-20%_110%,rgba(16,185,129,0.12),transparent)]",
        ].join(" ")}
      >
        <div className="text-emerald-50 text-xl">Cargando panel de administración...</div>
      </div>
    );
  }

  return (
    <div
      className={[
        "relative min-h-screen text-white",
        "bg-gradient-to-br from-black via-[#0A1713] to-[#0E2A1F]",
        "before:pointer-events-none before:absolute before:inset-0",
        "before:bg-[radial-gradient(80%_60%_at_110%_-10%,rgba(16,185,129,0.18),transparent),radial-gradient(60%_40%_at_-20%_110%,rgba(16,185,129,0.12),transparent)]",
      ].join(" ")}
    >
      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 h-full w-64 z-40 p-6",
          "bg-black/40 backdrop-blur-sm",
          "border-r border-emerald-500/15",
          "shadow-[0_0_0_1px_rgba(16,185,129,0.08),_0_20px_60px_-20px_rgba(16,185,129,0.25)]",
        ].join(" ")}
      >
        <div className="flex items-center space-x-3 mb-8">
          <img src={logoImg} alt="Nakama&Partners" className="h-10 w-auto drop-shadow-[0_0_14px_rgba(16,185,129,0.35)]" />
          <div>
            <h2 className="text-xl font-bold text-emerald-50">Admin Panel</h2>
            <p className="text-emerald-200/80 text-sm">{user?.name}</p>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: BarChart3 },
            { id: "usuarios", label: "Usuarios", icon: Users },
            { id: "kyc", label: "KYC", icon: FileCheck },
            { id: "productos", label: "Productos", icon: Package },
            { id: "contratos", label: "Contratos", icon: FileText },
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
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-emerald-500/20 text-emerald-50 hover:bg-emerald-900/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold text-emerald-50 mb-8">Panel de Administración</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Usuarios Totales", value: stats.totalUsers, icon: Users },
                { label: "Productos Totales", value: stats.totalProducts, icon: Package },
                { label: "Contratos Totales", value: stats.totalContracts, icon: FileText },
                { label: "KYC Pendientes", value: stats.pendingKyc, icon: FileCheck, warn: true },
              ].map(({ label, value, icon: Icon, warn }, i) => (
                <Card
                  key={i}
                  className="bg-black/40 border border-emerald-500/15 rounded-2xl shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_20px_60px_-20px_rgba(16,185,129,0.25)]"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-200/80 text-sm font-medium">{label}</p>
                        <p className="text-emerald-50 text-3xl font-bold">{value}</p>
                      </div>
                      <Icon className={`w-8 h-8 ${warn ? "text-amber-400" : "text-emerald-400"}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-emerald-50">Estado KYC</CardTitle>
                  <CardDescription className="text-emerald-200/80">Distribución de estados</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={kycChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {kycChartData.map((entry, index) => (
                          <Cell key={`cell-kyc-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-emerald-50">Estado Contratos</CardTitle>
                  <CardDescription className="text-emerald-200/80">Distribución de estados</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={contractsChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {contractsChartData.map((entry, index) => (
                          <Cell key={`cell-ct-${index}`} fill={entry.color} />
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
              <h1 className="text-3xl font-bold text-emerald-50">Gestión de Usuarios</h1>
              <Button
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
                onClick={() => {
                  setEditingUser(null);
                  setNewUser({ name: "", email: "", password: "", role: "client", sponsor: "", grade: "Bronze" });
                  setShowUserDialog(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Usuario
              </Button>

              <Dialog open={showUserDialog} onOpenChange={handleCloseUserDialog}>
                <DialogContent className="bg-black/40 border border-emerald-500/15 text-emerald-50">
                  <DialogHeader>
                    <DialogTitle>{editingUser ? "Editar Usuario" : "Agregar Nuevo Usuario"}</DialogTitle>
                    <DialogDescription className="text-emerald-200/80">
                      {editingUser ? "Modifique los datos del usuario" : "Complete los datos para crear un nuevo usuario"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nombre
                      </Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="col-span-3 bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="col-span-3 bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Contraseña
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="col-span-3 bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Rol
                      </Label>
                      <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                        <SelectTrigger className="col-span-3 bg-black/50 border-emerald-500/20 text-emerald-50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black/40 border-emerald-500/15 text-emerald-50">
                          <SelectItem value="client">Cliente</SelectItem>
                          <SelectItem value="partner">Asesor</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sponsor" className="text-right">
                        Patrocinador
                      </Label>
                      <Input
                        id="sponsor"
                        value={newUser.sponsor}
                        onChange={(e) => setNewUser({ ...newUser, sponsor: e.target.value })}
                        className="col-span-3 bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                        placeholder="Opcional"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleCreateUser}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
                    >
                      {editingUser ? "Actualizar Usuario" : "Crear Usuario"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-200/80 w-4 h-4" />
                <Input
                  placeholder="Buscar por ID, nombre o email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="pl-10 bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                />
              </div>
            </div>

            {/* Users Table */}
            <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-emerald-500/15">
                      <tr>
                        {[
                          "ID",
                          "Nombre",
                          "Email",
                          "Rol",
                          "Patrocinador",
                          "Grado",
                          "Estado",
                          "Fecha",
                          "Acciones",
                        ].map((h) => (
                          <th key={h} className="text-left p-4 text-emerald-200/80 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="border-b border-emerald-500/10">
                          <td className="p-4 text-emerald-50">{u.id}</td>
                          <td className="p-4 text-emerald-50">{u.name}</td>
                          <td className="p-4 text-emerald-50">{u.email}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                u.role === "admin" ? "destructive" : u.role === "partner" ? "default" : "secondary"
                              }
                              className={
                                u.role === "admin"
                                  ? "bg-red-500 text-white"
                                  : u.role === "partner"
                                  ? "bg-emerald-500 text-black"
                                  : "bg-emerald-900/30 text-emerald-200"
                              }
                            >
                              {u.role === "admin" ? "Administrador" : u.role === "partner" ? "Asesor" : "Usuario"}
                            </Badge>
                          </td>
                          <td className="p-4 text-emerald-50">{u.sponsor || "-"}</td>
                          <td className="p-4 text-emerald-50">{u.grade}</td>
                          <td className="p-4">
                            <Badge
                              variant={u.verificationStatus === "verified" ? "default" : "secondary"}
                              className={
                                u.verificationStatus === "verified"
                                  ? "bg-emerald-500 text-black"
                                  : "bg-emerald-900/30 text-emerald-200"
                              }
                            >
                              {u.verificationStatus === "verified" ? "Verificado" : "Pendiente"}
                            </Badge>
                          </td>
                          <td className="p-4 text-emerald-50">
                            {new Date(u.createdAt).toLocaleDateString("es-ES")}
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-emerald-500/20 text-emerald-50">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-emerald-500/20 text-emerald-50"
                                onClick={() => handleEditUser(u)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/20 text-red-400"
                                onClick={() => handleDeleteUser(u.id)}
                              >
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
            <h1 className="text-3xl font-bold text-emerald-50 mb-6">Gestión KYC</h1>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-200/80 w-4 h-4" />
                <Input
                  placeholder="Buscar por ID, nombre o número de documento..."
                  value={kycSearch}
                  onChange={(e) => setKycSearch(e.target.value)}
                  className="pl-10 bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                />
              </div>
              <Select value={kycFilter} onValueChange={setKycFilter}>
                <SelectTrigger className="w-48 bg-black/50 border-emerald-500/20 text-emerald-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/40 border-emerald-500/15 text-emerald-50">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="approved">Aprobados</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="rejected">Rechazados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* KYC Table */}
            <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-emerald-500/15">
                      <tr>
                        {["ID", "Nombre", "Tipo Doc", "Número", "País", "Estado", "Fecha", "Acciones"].map((h) => (
                          <th key={h} className="text-left p-4 text-emerald-200/80 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredKyc.map((record) => (
                        <tr key={record.id} className="border-b border-emerald-500/10">
                          <td className="p-4 text-emerald-50">{record.id}</td>
                          <td className="p-4 text-emerald-50">{record.fullName}</td>
                          <td className="p-4 text-emerald-50">{record.documentType.toUpperCase()}</td>
                          <td className="p-4 text-emerald-50">{record.documentNumber}</td>
                          <td className="p-4 text-emerald-50">{record.country}</td>
                          <td className="p-4">
                            <Badge
                              className={
                                record.status === "approved"
                                  ? "bg-emerald-500 text-black"
                                  : record.status === "pending"
                                  ? "bg-amber-500 text-black"
                                  : "bg-red-500 text-white"
                              }
                            >
                              {record.status === "approved"
                                ? "Aprobado"
                                : record.status === "pending"
                                ? "Pendiente"
                                : "Rechazado"}
                            </Badge>
                          </td>
                          <td className="p-4 text-emerald-50">
                            {new Date(record.createdAt).toLocaleDateString("es-ES")}
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-emerald-500/20 text-emerald-50">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-emerald-500/20 text-emerald-50"
                                onClick={() => handleEditKyc(record)}
                              >
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
              <h1 className="text-3xl font-bold text-emerald-50">Gestión de Productos</h1>
              <Button
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
                onClick={() => {
                  setEditingProduct(null);
                  setNewProduct({
                    name: "",
                    interestRate: "",
                    termDays: "",
                    minAmount: "",
                    maxAmount: "",
                    status: "active",
                    autoRenewal: false,
                    contractTemplate: "",
                  });
                  setShowProductDialog(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Producto
              </Button>

              <Dialog open={showProductDialog} onOpenChange={handleCloseProductDialog}>
                <DialogContent className="bg-black/40 border border-emerald-500/15 text-emerald-50 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}</DialogTitle>
                    <DialogDescription className="text-emerald-200/80">
                      {editingProduct
                        ? "Modifique los datos del producto financiero"
                        : "Complete los datos para crear un nuevo producto financiero"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                    {[
                      { id: "productName", label: "Nombre", value: newProduct.name, key: "name" },
                      { id: "interestRate", label: "Tasa (%)", value: newProduct.interestRate, key: "interestRate", placeholder: "9.00" },
                      { id: "termDays", label: "Plazo (días)", value: newProduct.termDays, key: "termDays", type: "number", placeholder: "365" },
                      { id: "minAmount", label: "Monto Mín (€)", value: newProduct.minAmount, key: "minAmount", placeholder: "50000" },
                      { id: "maxAmount", label: "Monto Máx (€)", value: newProduct.maxAmount, key: "maxAmount", placeholder: "1000000" },
                    ].map((f) => (
                      <div key={f.id} className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={f.id} className="text-right">
                          {f.label}
                        </Label>
                        <Input
                          id={f.id}
                          type={(f as any).type || "text"}
                          value={(newProduct as any)[f.key]}
                          onChange={(e) => setNewProduct({ ...newProduct, [f.key]: e.target.value } as any)}
                          className="col-span-3 bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                          placeholder={(f as any).placeholder}
                        />
                      </div>
                    ))}

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="productStatus" className="text-right">
                        Estado
                      </Label>
                      <Select value={newProduct.status} onValueChange={(value) => setNewProduct({ ...newProduct, status: value })}>
                        <SelectTrigger className="col-span-3 bg-black/50 border-emerald-500/20 text-emerald-50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black/40 border-emerald-500/15 text-emerald-50">
                          <SelectItem value="active">Activo</SelectItem>
                          <SelectItem value="inactive">Inactivo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="autoRenewal" className="text-right">
                        Auto Renovación
                      </Label>
                      <div className="col-span-3">
                        <Switch
                          id="autoRenewal"
                          checked={newProduct.autoRenewal}
                          onCheckedChange={(checked) => setNewProduct({ ...newProduct, autoRenewal: checked })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="contractTemplate" className="text-right mt-2">
                        Template Contrato
                      </Label>
                      <Textarea
                        id="contractTemplate"
                        value={newProduct.contractTemplate}
                        onChange={(e) => setNewProduct({ ...newProduct, contractTemplate: e.target.value })}
                        className="col-span-3 bg-black/50 border-emerald-500/20 text-emerald-50 placeholder:text-emerald-200/60"
                        placeholder="Template del contrato..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleCreateProduct}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
                    >
                      {editingProduct ? "Actualizar Producto" : "Crear Producto"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Products Table */}
            <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-emerald-500/15">
                      <tr>
                        {[
                          "ID",
                          "Nombre",
                          "Tasa",
                          "Plazo",
                          "Monto Min",
                          "Monto Max",
                          "Estado",
                          "Auto Renovación",
                          "Contrato",
                          "Acciones",
                        ].map((h) => (
                          <th key={h} className="text-left p-4 text-emerald-200/80 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-emerald-500/10">
                          <td className="p-4 text-emerald-50">{product.id}</td>
                          <td className="p-4 text-emerald-50">{product.name}</td>
                          <td className="p-4 text-emerald-50">{product.interestRate}%</td>
                          <td className="p-4 text-emerald-50">{product.termDays} días</td>
                          <td className="p-4 text-emerald-50">€{parseInt(product.minAmount).toLocaleString()}</td>
                          <td className="p-4 text-emerald-50">€{parseInt(product.maxAmount).toLocaleString()}</td>
                          <td className="p-4">
                            <Badge
                              className={product.status === "active" ? "bg-emerald-500 text-black" : "bg-emerald-900/30 text-emerald-200"}
                            >
                              {product.status === "active" ? "Activo" : "Inactivo"}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge className={product.autoRenewal ? "bg-emerald-500 text-black" : "bg-emerald-900/30 text-emerald-200"}>
                              {product.autoRenewal ? "Sí" : "No"}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Button size="sm" variant="outline" className="border-emerald-500/20 text-emerald-50">
                              <Download className="w-4 h-4" />
                            </Button>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-emerald-500/20 text-emerald-50">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-emerald-500/20 text-emerald-50"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/20 text-red-400"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
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
            <h1 className="text-3xl font-bold text-emerald-50 mb-6">Gestión de Contratos</h1>

            {/* Contracts Table */}
            <Card className="bg-black/40 border border-emerald-500/15 rounded-2xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-emerald-500/15">
                      <tr>
                        {["ID", "Usuario", "Producto", "Monto", "Estado", "Fecha", "Acciones"].map((h) => (
                          <th key={h} className="text-left p-4 text-emerald-200/80 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {contracts.map((contract) => (
                        <tr key={contract.id} className="border-b border-emerald-500/10">
                          <td className="p-4 text-emerald-50">{contract.id}</td>
                          <td className="p-4 text-emerald-50">{contract.userName}</td>
                          <td className="p-4 text-emerald-50">{contract.productName}</td>
                          <td className="p-4 text-emerald-50">€{parseInt(contract.amount).toLocaleString()}</td>
                          <td className="p-4">
                            <Badge
                              className={
                                contract.status === "active"
                                  ? "bg-emerald-500 text-black"
                                  : contract.status === "ready_to_start"
                                  ? "bg-amber-500 text-black"
                                  : contract.status === "completed"
                                  ? "bg-blue-500 text-white"
                                  : "bg-emerald-900/30 text-emerald-200"
                              }
                            >
                              {contract.status === "active"
                                ? "Activo"
                                : contract.status === "ready_to_start"
                                ? "Listo para Iniciar"
                                : contract.status === "completed"
                                ? "Completado"
                                : contract.status === "cancelled"
                                ? "Cancelado"
                                : contract.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-emerald-50">
                            {new Date(contract.createdAt).toLocaleDateString("es-ES")}{" "}
                            {new Date(contract.createdAt).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-emerald-500/20 text-emerald-50">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-emerald-500/20 text-emerald-50"
                                onClick={() => handleEditContract(contract)}
                              >
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

        {/* KYC Edit Dialog */}
        <Dialog open={showKycDialog} onOpenChange={handleCloseKycDialog}>
          <DialogContent className="bg-black/40 border border-emerald-500/15 text-emerald-50">
            <DialogHeader>
              <DialogTitle>Editar Estado KYC</DialogTitle>
              <DialogDescription className="text-emerald-200/80">
                Modificar el estado de verificación KYC para {editingKyc?.fullName}
              </DialogDescription>
            </DialogHeader>
            {editingKyc && (
              <form onSubmit={handleUpdateKycForm}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Usuario</Label>
                    <div className="col-span-3 text-emerald-200/90">{editingKyc.fullName}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Documento</Label>
                    <div className="col-span-3 text-emerald-200/90">
                      {editingKyc.documentType.toUpperCase()} - {editingKyc.documentNumber}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">País</Label>
                    <div className="col-span-3 text-emerald-200/90">{editingKyc.country}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="kycStatus" className="text-right">
                      Estado
                    </Label>
                    <Select
                      value={editingKyc.status}
                      onValueChange={(value: "approved" | "pending" | "rejected") =>
                        setEditingKyc({ ...editingKyc, status: value })
                      }
                    >
                      <SelectTrigger className="col-span-3 bg-black/50 border-emerald-500/20 text-emerald-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/40 border-emerald-500/15 text-emerald-50">
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="approved">Aprobado</SelectItem>
                        <SelectItem value="rejected">Rechazado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={handleCloseKycDialog} className="border-emerald-500/20">
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white">
                    Actualizar Estado
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Contract Edit Dialog */}
        <Dialog open={showContractDialog} onOpenChange={handleCloseContractDialog}>
          <DialogContent className="bg-black/40 border border-emerald-500/15 text-emerald-50">
            <DialogHeader>
              <DialogTitle>Editar Estado de Contrato</DialogTitle>
              <DialogDescription className="text-emerald-200/80">
                Modificar el estado del contrato para {editingContract?.userName}
              </DialogDescription>
            </DialogHeader>
            {editingContract && (
              <form onSubmit={handleUpdateContractForm}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">ID</Label>
                    <div className="col-span-3 text-emerald-200/90">{editingContract.id}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Usuario</Label>
                    <div className="col-span-3 text-emerald-200/90">{editingContract.userName}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Producto</Label>
                    <div className="col-span-3 text-emerald-200/90">{editingContract.productName}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Monto</Label>
                    <div className="col-span-3 text-emerald-200/90">€{parseInt(editingContract.amount).toLocaleString()}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Fecha Creación</Label>
                    <div className="col-span-3 text-emerald-200/90">
                      {new Date(editingContract.createdAt).toLocaleDateString("es-ES")}{" "}
                      {new Date(editingContract.createdAt).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contractStatus" className="text-right">
                      Estado
                    </Label>
                    <Select
                      value={editingContract.status}
                      onValueChange={(value: "active" | "ready_to_start" | "completed" | "cancelled") =>
                        setEditingContract({ ...editingContract, status: value })
                      }
                    >
                      <SelectTrigger className="col-span-3 bg-black/50 border-emerald-500/20 text-emerald-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/40 border-emerald-500/15 text-emerald-50">
                        <SelectItem value="ready_to_start">Listo para Iniciar</SelectItem>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="completed">Completado</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={handleCloseContractDialog} className="border-emerald-500/20">
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white">
                    Actualizar Estado
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
