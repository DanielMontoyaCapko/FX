import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// SQLite users table
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  apellidos: text("apellidos"),
  telefono: text("telefono"),
  fechaNacimiento: text("fecha_nacimiento"),
  pais: text("pais"),
  direccion: text("direccion"),
  role: text("role").notNull().default("client"),
  sponsor: text("sponsor"),
  grade: text("grade").default("Bronze"),
  verificationStatus: text("verification_status").default("pending"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP").notNull(),
});

// SQLite KYC table
export const kyc = sqliteTable("kyc", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  fullName: text("full_name").notNull(),
  documentType: text("document_type").notNull(),
  documentNumber: text("document_number").notNull(),
  country: text("country").notNull(),
  status: text("status").default("pending"),
  documentsUrls: text("documents_urls"), // JSON string for array
  rejectionReason: text("rejection_reason"),
  reviewedBy: integer("reviewed_by").references(() => users.id),
  reviewedAt: text("reviewed_at"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP").notNull(),
});

// SQLite Products table
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  interestRate: text("interest_rate").notNull(),
  termDays: integer("term_days").notNull(),
  minAmount: text("min_amount").notNull(),
  maxAmount: text("max_amount").notNull(),
  status: text("status").default("active"),
  autoRenewal: integer("auto_renewal", { mode: "boolean" }).default(false),
  contractTemplate: text("contract_template"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
});

// SQLite Contracts table
export const contracts = sqliteTable("contracts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  productId: integer("product_id").notNull().references(() => products.id),
  amount: text("amount").notNull(),
  status: text("status").default("ready_to_start"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP").notNull(),
});

// SQLite Leads table
export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  type: text("type").notNull(),
  message: text("message"),
  source: text("source").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
});

// SQLite Calculator Results table
export const calculatorResults = sqliteTable("calculator_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  leadId: integer("lead_id").references(() => leads.id),
  amount: integer("amount").notNull(),
  years: integer("years").notNull(),
  compoundInterest: integer("compound_interest", { mode: "boolean" }).notNull(),
  finalAmount: integer("final_amount").notNull(),
  interestGenerated: integer("interest_generated").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
});

// SQLite Audit Logs table
export const auditLogs = sqliteTable("audit_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  adminId: integer("admin_id").notNull().references(() => users.id),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  oldValues: text("old_values"),
  newValues: text("new_values"),
  description: text("description"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
});

// SQLite Client Activity Logs table
export const clientActivityLogs = sqliteTable("client_activity_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  action: text("action").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
});

// Schemas for validation
export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertCalculatorResultSchema = createInsertSchema(calculatorResults).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["client", "partner", "admin"]).default("client"),
});

export const insertKycSchema = createInsertSchema(kyc).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  reviewedAt: true,
});

export const updateKycSchema = z.object({
  status: z.enum(["approved", "pending", "rejected"]),
  rejectionReason: z.string().optional(),
  reviewedBy: z.number().optional(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertContractSchema = createInsertSchema(contracts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAuditLogSchema = createInsertSchema(auditLogs).omit({
  id: true,
});

export const insertClientActivityLogSchema = createInsertSchema(clientActivityLogs).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertCalculatorResult = z.infer<typeof insertCalculatorResultSchema>;
export type CalculatorResult = typeof calculatorResults.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
export type InsertKyc = z.infer<typeof insertKycSchema>;
export type Kyc = typeof kyc.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertContract = z.infer<typeof insertContractSchema>;
export type Contract = typeof contracts.$inferSelect;
export type InsertAuditLog = z.infer<typeof insertAuditLogSchema>;
export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertClientActivityLog = z.infer<typeof insertClientActivityLogSchema>;
export type ClientActivityLog = typeof clientActivityLogs.$inferSelect;