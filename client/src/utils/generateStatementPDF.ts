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

export type StatementData = {
  cliente: string;
  periodo: string;          // Ej. "Enero 2025"
  fecha: string;            // Ej. new Date().toLocaleDateString("es-ES")
  capitalInvertido: number; // 50000
  rentabilidadAnualPct: number; // 9.0
  mesesTranscurridos: number;   // 3
  mesesTotales: number;         // 12
  beneficioAcumulado: number;   // 1125
  valorTotalActual: number;     // 51125
  detalleMensual: { label: string; importe: number }[]; // Ej. [{label:"Enero 2025", importe:375}, ...]
  proyeccion: { beneficioTotal: number; valorFinal: number }; // Ej. {4500, 54500}
  // Nuevos campos para KPIs y métricas del dashboard
  kpis: {
    title: string;
    value: string;
    change: string;
    trending: "up" | "down";
  }[];
  productosActivos: {
    nombre: string;
    estado: string;
    cantidad: string;
    fechaInicio: string;
    rentabilidad: string;
  }[];
  productosCompletados: {
    nombre: string;
    estado: string;
    cantidad: string;
    fechaInicio: string;
    fechaFin: string;
    rentabilidadFinal: string;
  }[];
  transacciones: {
    fecha: string;
    tipo: string;
    descripcion: string;
    cantidad: number;
    estado: string;
  }[];
  actividadReciente: {
    action: string;
    createdAt: string;
  }[];
};

export async function generateStatementPDF(data: StatementData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "A4" });

  let y = await drawBrandHeader(doc, "Estado de Cuenta", data.periodo);
  y += 10;

  // Datos del cliente
  sectionHeading(doc, "Datos del cliente", y);
  y += 24;
  kv(doc, "Cliente", data.cliente, 40, y);
  kv(doc, "Fecha", data.fecha, 220, y);
  kv(doc, "Período", data.periodo, 400, y);
  y += 56;

  // Resumen de inversión
  sectionHeading(doc, "Resumen de inversión", y);
  y += 24;
  const progreso = Math.round((data.mesesTranscurridos / data.mesesTotales) * 100);
  kv(doc, "Capital Invertido", eur(data.capitalInvertido), 40, y);
  kv(doc, "Rentabilidad Anual", `${data.rentabilidadAnualPct.toFixed(1)}%`, 220, y);
  kv(doc, "Progreso", `${data.mesesTranscurridos} de ${data.mesesTotales} (${progreso}%)`, 400, y);
  y += 40;
  kv(doc, "Beneficio Acumulado", eur(data.beneficioAcumulado), 40, y);
  kv(doc, "Valor Total Actual", eur(data.valorTotalActual), 220, y);
  y += 56;

  // Detalle del período (tabla)
  sectionHeading(doc, "Detalle de rendimiento", y);
  y += 24;

  doc.setFontSize(10);
  setTextRGB(doc, [255, 255, 255]);
  setFillRGB(doc, BRAND.primary600);
  doc.rect(40, y - 12, 520, 24, "F");
  doc.text("Mes", 56, y + 2);
  doc.text("Importe", 320, y + 2);

  const rowH = 24;
  doc.setFontSize(11);
  setTextRGB(doc, [15, 23, 42]); // textDark
  data.detalleMensual.forEach((row, idx) => {
    const ry = y + rowH * (idx + 1);
    if (idx % 2 === 0) {
      setFillRGB(doc, [240, 253, 244]); // fila alterna
      doc.rect(40, ry - 16, 520, rowH, "F");
    }
    doc.text(row.label, 56, ry);
    doc.text(eur(row.importe), 320, ry);
  });

  y += rowH * data.detalleMensual.length + 40;

  // Proyección
  sectionHeading(doc, "Proyección a fin de año", y);
  y += 24;
  kv(doc, "Beneficio Total Estimado", eur(data.proyeccion.beneficioTotal), 40, y);
  kv(doc, "Valor Final Estimado", eur(data.proyeccion.valorFinal), 220, y);
  y += 56;

  // KPIs del Dashboard
  sectionHeading(doc, "Resumen Ejecutivo - KPIs", y);
  y += 24;
  
  // Crear tabla de KPIs
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
  
  data.kpis.forEach((kpi, idx) => {
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

  y += kpiRowH * data.kpis.length + 40;

  // Productos Activos
  if (data.productosActivos.length > 0) {
    sectionHeading(doc, "Productos Activos", y);
    y += 24;
    
    doc.setFontSize(10);
    setTextRGB(doc, [255, 255, 255]);
    setFillRGB(doc, BRAND.primary600);
    doc.rect(40, y - 12, 520, 24, "F");
    doc.text("Producto", 56, y + 2);
    doc.text("Estado", 200, y + 2);
    doc.text("Cantidad", 300, y + 2);
    doc.text("Rentabilidad", 420, y + 2);

    const prodRowH = 24;
    doc.setFontSize(10);
    setTextRGB(doc, [15, 23, 42]);
    
    data.productosActivos.forEach((prod, idx) => {
      const ry = y + prodRowH * (idx + 1);
      if (idx % 2 === 0) {
        setFillRGB(doc, [240, 253, 244]);
        doc.rect(40, ry - 16, 520, prodRowH, "F");
      }
      doc.text(prod.nombre, 56, ry);
      doc.text(prod.estado, 200, ry);
      doc.text(prod.cantidad, 300, ry);
      doc.text(prod.rentabilidad, 420, ry);
    });

    y += prodRowH * data.productosActivos.length + 40;
  }

  // Transacciones Recientes
  if (data.transacciones.length > 0) {
    sectionHeading(doc, "Transacciones Recientes", y);
    y += 24;
    
    doc.setFontSize(10);
    setTextRGB(doc, [255, 255, 255]);
    setFillRGB(doc, BRAND.primary600);
    doc.rect(40, y - 12, 520, 24, "F");
    doc.text("Fecha", 56, y + 2);
    doc.text("Tipo", 150, y + 2);
    doc.text("Descripción", 250, y + 2);
    doc.text("Cantidad", 400, y + 2);
    doc.text("Estado", 480, y + 2);

    const txRowH = 24;
    doc.setFontSize(9);
    setTextRGB(doc, [15, 23, 42]);
    
    data.transacciones.forEach((tx, idx) => {
      const ry = y + txRowH * (idx + 1);
      if (idx % 2 === 0) {
        setFillRGB(doc, [240, 253, 244]);
        doc.rect(40, ry - 16, 520, txRowH, "F");
      }
      doc.text(tx.fecha, 56, ry);
      doc.text(tx.tipo, 150, ry);
      doc.text(tx.descripcion, 250, ry);
      doc.text(eur(tx.cantidad), 400, ry);
      doc.text(tx.estado, 480, ry);
    });

    y += txRowH * data.transacciones.length + 40;
  }

  // Actividad Reciente
  if (data.actividadReciente.length > 0) {
    sectionHeading(doc, "Actividad Reciente", y);
    y += 24;
    
    doc.setFontSize(10);
    setTextRGB(doc, [255, 255, 255]);
    setFillRGB(doc, BRAND.primary600);
    doc.rect(40, y - 12, 520, 24, "F");
    doc.text("Acción", 56, y + 2);
    doc.text("Fecha", 350, y + 2);

    const actRowH = 24;
    doc.setFontSize(10);
    setTextRGB(doc, [15, 23, 42]);
    
    data.actividadReciente.forEach((act, idx) => {
      const ry = y + actRowH * (idx + 1);
      if (idx % 2 === 0) {
        setFillRGB(doc, [240, 253, 244]);
        doc.rect(40, ry - 16, 520, actRowH, "F");
      }
      doc.text(act.action, 56, ry);
      doc.text(act.createdAt, 350, ry);
    });

    y += actRowH * data.actividadReciente.length + 40;
  }

  // Información Adicional
  sectionHeading(doc, "Información Adicional", y);
  y += 24;
  kv(doc, "Documento generado", "Estado de cuenta completo del dashboard", 40, y);
  kv(doc, "Incluye", "KPIs, productos, transacciones y actividad", 220, y);
  y += 40;
  kv(doc, "Última actualización", data.fecha, 40, y);
  kv(doc, "Período de reporte", data.periodo, 220, y);

  drawFooter(doc);
  doc.save(`estado-cuenta-completo-nakama-${new Date().toISOString().slice(0, 10)}.pdf`);
}
