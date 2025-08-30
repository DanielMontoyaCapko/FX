import {
  BRAND,
  setFillRGB,
  setTextRGB,
  sectionHeading,
  kv,
  drawBrandHeader,
  drawFooter,
  eur,
} from "./pdfBrand";

export type AdminDashboardData = {
  fecha: string;
  periodo: string;
  // Métricas generales
  totalUsers: number;
  totalProducts: number;
  totalContracts: number;
  pendingKyc: number;
  rejectedKyc: number;
  // Estadísticas detalladas de usuarios
  userStats: {
    total: number;
    clients: number;
    partners: number;
    admins: number;
    verified: number;
    pending: number;
    byGrade: {
      bronze: number;
      silver: number;
      gold: number;
      platinum: number;
    };
  };
  // Estadísticas detalladas de KYC
  kycStats: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
    byCountry: Record<string, number>;
  };
  // Estadísticas detalladas de contratos
  contractStats: {
    total: number;
    active: number;
    ready: number;
    completed: number;
    totalAmount: number;
    averageAmount: number;
  };
  // Estadísticas detalladas de productos
  productStats: {
    total: number;
    active: number;
    inactive: number;
    averageRate: number;
    totalTermDays: number;
  };
  // KPIs financieros
  financialKpis?: {
    totalAUM: number;
    newCapitalMonth: number;
    withdrawnCapitalMonth: number;
    netCapitalGrowth: number;
    averageInvestment: number;
    activeClients: number;
    clientRetention: number;
    monthlyEvolution: Array<{
      month: string;
      aum: number;
      newCapital: number;
      withdrawals: number;
      retention: number;
    }>;
  };
  // Datos para gráficos
  kycChartData: Array<{ name: string; value: number; color: string }>;
  contractsChartData: Array<{ name: string; value: number; color: string }>;
  // Actividad reciente
  recentActivity: Array<{
    id: number;
    adminName: string;
    adminEmail: string;
    action: string;
    entityType: string;
    entityId: string;
    description: string;
    ipAddress: string;
    createdAt: string;
  }>;
};

export async function generateAdminStatementPDF(data: AdminDashboardData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "A4" });

  let y = await drawBrandHeader(doc, "Reporte Administrativo", data.periodo);
  y += 10;

  // Información general del reporte
  sectionHeading(doc, "Información del Reporte", y);
  y += 24;
  kv(doc, "Fecha de Generación", data.fecha, 40, y);
  kv(doc, "Período", data.periodo, 220, y);
  kv(doc, "Tipo de Reporte", "Dashboard Administrativo", 400, y);
  y += 56;

  // Métricas generales
  sectionHeading(doc, "Resumen Ejecutivo - KPIs Generales", y);
  y += 24;
  
  // Crear tabla de KPIs generales
  doc.setFontSize(10);
  setTextRGB(doc, [255, 255, 255]);
  setFillRGB(doc, BRAND.primary600);
  doc.rect(40, y - 12, 520, 24, "F");
  doc.text("Métrica", 56, y + 2);
  doc.text("Valor", 200, y + 2);
  doc.text("Estado", 350, y + 2);
  doc.text("Tendencia", 450, y + 2);

  const kpiRowH = 28;
  doc.setFontSize(11);
  setTextRGB(doc, [15, 23, 42]);
  
  const generalKpis = [
    { title: "Usuarios Totales", value: data.totalUsers.toString(), change: "Sistema completo", trending: "up" },
    { title: "Productos Activos", value: data.totalProducts.toString(), change: "Catálogo disponible", trending: "up" },
    { title: "Contratos Totales", value: data.totalContracts.toString(), change: "Operaciones activas", trending: "up" },
    { title: "KYC Pendientes", value: data.pendingKyc.toString(), change: "Requieren revisión", trending: "down" },
    { title: "KYC Rechazados", value: data.rejectedKyc.toString(), change: "No aprobados", trending: "down" }
  ];
  
  generalKpis.forEach((kpi, idx) => {
    const ry = y + kpiRowH * (idx + 1);
    if (idx % 2 === 0) {
      setFillRGB(doc, [240, 253, 244]);
      doc.rect(40, ry - 16, 520, kpiRowH, "F");
    }
    doc.text(kpi.title, 56, ry);
    doc.text(kpi.value, 200, ry);
    doc.text(kpi.change, 350, ry);
    doc.text(kpi.trending === "up" ? "↗" : "↘", 450, ry);
  });

  y += kpiRowH * generalKpis.length + 40;

  // Distribución de KYC
  sectionHeading(doc, "Estado de Verificaciones KYC", y);
  y += 24;
  
  doc.setFontSize(10);
  setTextRGB(doc, [255, 255, 255]);
  setFillRGB(doc, BRAND.primary600);
  doc.rect(40, y - 12, 520, 24, "F");
  doc.text("Estado", 56, y + 2);
  doc.text("Cantidad", 320, y + 2);
  doc.text("Porcentaje", 420, y + 2);

  const rowH = 24;
  doc.setFontSize(11);
  setTextRGB(doc, [15, 23, 42]);
  
  const kycData = [
    { name: "Aprobados", value: data.kycStats.approved },
    { name: "Pendientes", value: data.kycStats.pending },
    { name: "Rechazados", value: data.kycStats.rejected }
  ];
  
  const totalKyc = data.kycStats.total;
  kycData.forEach((row, idx) => {
    const ry = y + rowH * (idx + 1);
    if (idx % 2 === 0) {
      setFillRGB(doc, [240, 253, 244]);
      doc.rect(40, ry - 16, 520, rowH, "F");
    }
    const percentage = totalKyc > 0 ? ((row.value / totalKyc) * 100).toFixed(1) : "0.0";
    doc.text(row.name, 56, ry);
    doc.text(row.value.toString(), 320, ry);
    doc.text(`${percentage}%`, 420, ry);
  });

  y += rowH * kycData.length + 40;

  // Distribución de Contratos
  sectionHeading(doc, "Estado de Contratos", y);
  y += 24;
  
  doc.setFontSize(10);
  setTextRGB(doc, [255, 255, 255]);
  setFillRGB(doc, BRAND.primary600);
  doc.rect(40, y - 12, 520, 24, "F");
  doc.text("Estado", 56, y + 2);
  doc.text("Cantidad", 320, y + 2);
  doc.text("Porcentaje", 420, y + 2);

  doc.setFontSize(11);
  setTextRGB(doc, [15, 23, 42]);
  
  const contractData = [
    { name: "Activos", value: data.contractStats.active },
    { name: "Listos para Iniciar", value: data.contractStats.ready },
    { name: "Completados", value: data.contractStats.completed }
  ];
  
  const totalContracts = data.contractStats.total;
  contractData.forEach((row, idx) => {
    const ry = y + rowH * (idx + 1);
    if (idx % 2 === 0) {
      setFillRGB(doc, [240, 253, 244]);
      doc.rect(40, ry - 16, 520, rowH, "F");
    }
    const percentage = totalContracts > 0 ? ((row.value / totalContracts) * 100).toFixed(1) : "0.0";
    doc.text(row.name, 56, ry);
    doc.text(row.value.toString(), 320, ry);
    doc.text(`${percentage}%`, 420, ry);
  });

  y += rowH * contractData.length + 40;

  // KPIs Financieros (si están disponibles)
  if (data.financialKpis) {
    // Verificar si necesitamos una nueva página
    if (y > 650) {
      doc.addPage();
      y = 40;
    }

    sectionHeading(doc, "KPIs Financieros", y);
    y += 24;
    kv(doc, "Capital Total Gestionado", eur(data.financialKpis.totalAUM), 40, y);
    kv(doc, "Clientes Activos", data.financialKpis.activeClients.toString(), 220, y);
    kv(doc, "Inversión Promedio", eur(data.financialKpis.averageInvestment), 400, y);
    y += 40;
    kv(doc, "Nuevo Capital del Mes", eur(data.financialKpis.newCapitalMonth), 40, y);
    kv(doc, "Capital Retirado del Mes", eur(data.financialKpis.withdrawnCapitalMonth), 220, y);
    kv(doc, "Crecimiento Neto", eur(data.financialKpis.netCapitalGrowth), 400, y);
    y += 40;
    kv(doc, "Retención de Clientes", `${data.financialKpis.clientRetention.toFixed(1)}%`, 40, y);
    y += 56;

    // Evolución mensual (últimos 6 meses)
    if (data.financialKpis.monthlyEvolution && data.financialKpis.monthlyEvolution.length > 0) {
      sectionHeading(doc, "Evolución Mensual", y);
      y += 24;

      doc.setFontSize(9);
      setTextRGB(doc, [255, 255, 255]);
      setFillRGB(doc, BRAND.primary600);
      doc.rect(40, y - 12, 520, 24, "F");
      doc.text("Mes", 56, y + 2);
      doc.text("AUM", 156, y + 2);
      doc.text("Nuevo Capital", 256, y + 2);
      doc.text("Retiros", 356, y + 2);
      doc.text("Retención %", 456, y + 2);

      doc.setFontSize(10);
      setTextRGB(doc, [15, 23, 42]);
      
      data.financialKpis.monthlyEvolution.slice(-6).forEach((row, idx) => {
        const ry = y + rowH * (idx + 1);
        if (idx % 2 === 0) {
          setFillRGB(doc, [240, 253, 244]);
          doc.rect(40, ry - 16, 520, rowH, "F");
        }
        doc.text(row.month, 56, ry);
        doc.text(eur(row.aum), 156, ry);
        doc.text(eur(row.newCapital), 256, ry);
        doc.text(eur(row.withdrawals), 356, ry);
        doc.text(`${row.retention.toFixed(1)}%`, 456, ry);
      });

      y += rowH * Math.min(6, data.financialKpis.monthlyEvolution.length) + 40;
    }
  }

  // Estadísticas detalladas de usuarios
  sectionHeading(doc, "Análisis de Usuarios", y);
  y += 24;
  
  doc.setFontSize(10);
  setTextRGB(doc, [255, 255, 255]);
  setFillRGB(doc, BRAND.primary600);
  doc.rect(40, y - 12, 520, 24, "F");
  doc.text("Categoría", 56, y + 2);
  doc.text("Cantidad", 200, y + 2);
  doc.text("Porcentaje", 300, y + 2);
  doc.text("Estado", 400, y + 2);

  doc.setFontSize(10);
  setTextRGB(doc, [15, 23, 42]);
  
  const userData = [
    { name: "Clientes", value: data.userStats.clients, percentage: ((data.userStats.clients / data.userStats.total) * 100).toFixed(1), status: "Activos" },
    { name: "Partners", value: data.userStats.partners, percentage: ((data.userStats.partners / data.userStats.total) * 100).toFixed(1), status: "Asesores" },
    { name: "Administradores", value: data.userStats.admins, percentage: ((data.userStats.admins / data.userStats.total) * 100).toFixed(1), status: "Sistema" },
    { name: "Verificados", value: data.userStats.verified, percentage: ((data.userStats.verified / data.userStats.total) * 100).toFixed(1), status: "KYC OK" },
    { name: "Pendientes", value: data.userStats.pending, percentage: ((data.userStats.pending / data.userStats.total) * 100).toFixed(1), status: "KYC Pendiente" }
  ];
  
  userData.forEach((row, idx) => {
    const ry = y + rowH * (idx + 1);
    if (idx % 2 === 0) {
      setFillRGB(doc, [240, 253, 244]);
      doc.rect(40, ry - 16, 520, rowH, "F");
    }
    doc.text(row.name, 56, ry);
    doc.text(row.value.toString(), 200, ry);
    doc.text(`${row.percentage}%`, 300, ry);
    doc.text(row.status, 400, ry);
  });

  y += rowH * userData.length + 40;

  // Distribución por grados
  sectionHeading(doc, "Distribución por Grados", y);
  y += 24;
  
  doc.setFontSize(10);
  setTextRGB(doc, [255, 255, 255]);
  setFillRGB(doc, BRAND.primary600);
  doc.rect(40, y - 12, 520, 24, "F");
  doc.text("Grado", 56, y + 2);
  doc.text("Cantidad", 200, y + 2);
  doc.text("Porcentaje", 300, y + 2);

  doc.setFontSize(10);
  setTextRGB(doc, [15, 23, 42]);
  
  const gradeData = [
    { name: "Bronze", value: data.userStats.byGrade.bronze, percentage: ((data.userStats.byGrade.bronze / data.userStats.total) * 100).toFixed(1) },
    { name: "Silver", value: data.userStats.byGrade.silver, percentage: ((data.userStats.byGrade.silver / data.userStats.total) * 100).toFixed(1) },
    { name: "Gold", value: data.userStats.byGrade.gold, percentage: ((data.userStats.byGrade.gold / data.userStats.total) * 100).toFixed(1) },
    { name: "Platinum", value: data.userStats.byGrade.platinum, percentage: ((data.userStats.byGrade.platinum / data.userStats.total) * 100).toFixed(1) }
  ];
  
  gradeData.forEach((row, idx) => {
    const ry = y + rowH * (idx + 1);
    if (idx % 2 === 0) {
      setFillRGB(doc, [240, 253, 244]);
      doc.rect(40, ry - 16, 520, rowH, "F");
    }
    doc.text(row.name, 56, ry);
    doc.text(row.value.toString(), 200, ry);
    doc.text(`${row.percentage}%`, 300, ry);
  });

  y += rowH * gradeData.length + 40;

  // Análisis de Productos
  sectionHeading(doc, "Análisis de Productos", y);
  y += 24;
  
  doc.setFontSize(10);
  setTextRGB(doc, [255, 255, 255]);
  setFillRGB(doc, BRAND.primary600);
  doc.rect(40, y - 12, 520, 24, "F");
  doc.text("Métrica", 56, y + 2);
  doc.text("Valor", 200, y + 2);
  doc.text("Estado", 350, y + 2);

  doc.setFontSize(10);
  setTextRGB(doc, [15, 23, 42]);
  
  const productData = [
    { name: "Total Productos", value: data.productStats.total.toString(), status: "Catálogo completo" },
    { name: "Productos Activos", value: data.productStats.active.toString(), status: "Disponibles" },
    { name: "Productos Inactivos", value: data.productStats.inactive.toString(), status: "No disponibles" },
    { name: "Tasa Promedio", value: `${data.productStats.averageRate.toFixed(2)}%`, status: "Rentabilidad media" },
    { name: "Plazo Promedio", value: `${Math.round(data.productStats.totalTermDays / data.productStats.total)} días`, status: "Duración media" }
  ];
  
  productData.forEach((row, idx) => {
    const ry = y + rowH * (idx + 1);
    if (idx % 2 === 0) {
      setFillRGB(doc, [240, 253, 244]);
      doc.rect(40, ry - 16, 520, rowH, "F");
    }
    doc.text(row.name, 56, ry);
    doc.text(row.value, 200, ry);
    doc.text(row.status, 350, ry);
  });

  y += rowH * productData.length + 40;

  // Análisis de Contratos
  sectionHeading(doc, "Análisis de Contratos", y);
  y += 24;
  
  doc.setFontSize(10);
  setTextRGB(doc, [255, 255, 255]);
  setFillRGB(doc, BRAND.primary600);
  doc.rect(40, y - 12, 520, 24, "F");
  doc.text("Métrica", 56, y + 2);
  doc.text("Valor", 200, y + 2);
  doc.text("Estado", 350, y + 2);

  doc.setFontSize(10);
  setTextRGB(doc, [15, 23, 42]);
  
  const contractAnalysisData = [
    { name: "Total Contratos", value: data.contractStats.total.toString(), status: "Operaciones totales" },
    { name: "Capital Total", value: eur(data.contractStats.totalAmount), status: "Volumen gestionado" },
    { name: "Inversión Promedio", value: eur(data.contractStats.averageAmount), status: "Ticket medio" },
    { name: "Contratos Activos", value: data.contractStats.active.toString(), status: "En ejecución" },
    { name: "Listos para Iniciar", value: data.contractStats.ready.toString(), status: "Pendientes" }
  ];
  
  contractAnalysisData.forEach((row, idx) => {
    const ry = y + rowH * (idx + 1);
    if (idx % 2 === 0) {
      setFillRGB(doc, [240, 253, 244]);
      doc.rect(40, ry - 16, 520, rowH, "F");
    }
    doc.text(row.name, 56, ry);
    doc.text(row.value, 200, ry);
    doc.text(row.status, 350, ry);
  });

  y += rowH * contractAnalysisData.length + 40;

  // Actividad Reciente
  if (data.recentActivity && data.recentActivity.length > 0) {
    sectionHeading(doc, "Actividad Reciente del Sistema", y);
    y += 24;
    
    doc.setFontSize(9);
    setTextRGB(doc, [255, 255, 255]);
    setFillRGB(doc, BRAND.primary600);
    doc.rect(40, y - 12, 520, 24, "F");
    doc.text("Acción", 56, y + 2);
    doc.text("Entidad", 200, y + 2);
    doc.text("Administrador", 300, y + 2);
    doc.text("Fecha", 400, y + 2);

    doc.setFontSize(9);
    setTextRGB(doc, [15, 23, 42]);
    
    data.recentActivity.slice(0, 8).forEach((activity, idx) => {
      const ry = y + rowH * (idx + 1);
      if (idx % 2 === 0) {
        setFillRGB(doc, [240, 253, 244]);
        doc.rect(40, ry - 16, 520, rowH, "F");
      }
      doc.text(activity.action, 56, ry);
      doc.text(`${activity.entityType} ${activity.entityId}`, 200, ry);
      doc.text(activity.adminName || "Sistema", 300, ry);
      doc.text(new Date(activity.createdAt).toLocaleDateString("es-ES"), 400, ry);
    });

    y += rowH * Math.min(8, data.recentActivity.length) + 40;
  }

  // Información Adicional
  sectionHeading(doc, "Información Adicional", y);
  y += 24;
  kv(doc, "Documento generado", "Reporte administrativo completo del dashboard", 40, y);
  kv(doc, "Incluye", "KPIs, usuarios, productos, contratos y actividad", 220, y);
  y += 40;
  kv(doc, "Última actualización", data.fecha, 40, y);
  kv(doc, "Período de reporte", data.periodo, 220, y);

  drawFooter(doc);
  doc.save(`reporte-admin-completo-nakama-${new Date().toISOString().slice(0, 10)}.pdf`);
}