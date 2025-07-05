import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  type: text("type").notNull(), // 'Asesor Financiero' | 'Inversor Particular'
  message: text("message"),
  source: text("source").notNull(), // 'download', 'contact', 'advisor'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const calculatorResults = pgTable("calculator_results", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id),
  amount: integer("amount").notNull(),
  years: integer("years").notNull(),
  compoundInterest: boolean("compound_interest").notNull(),
  finalAmount: integer("final_amount").notNull(),
  interestGenerated: integer("interest_generated").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertCalculatorResultSchema = createInsertSchema(calculatorResults).omit({
  id: true,
  createdAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertCalculatorResult = z.infer<typeof insertCalculatorResultSchema>;
export type CalculatorResult = typeof calculatorResults.$inferSelect;
