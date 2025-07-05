import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertCalculatorResultSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead creation endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      res.json({ success: true, leadId: lead.id });
    } catch (error) {
      console.error("Error creating lead:", error);
      res.status(400).json({ success: false, error: "Invalid lead data" });
    }
  });

  // Calculator result endpoint
  app.post("/api/calculator-results", async (req, res) => {
    try {
      const resultData = insertCalculatorResultSchema.parse(req.body);
      const result = await storage.createCalculatorResult(resultData);
      res.json({ success: true, resultId: result.id });
    } catch (error) {
      console.error("Error saving calculator result:", error);
      res.status(400).json({ success: false, error: "Invalid calculator data" });
    }
  });

  // PDF generation endpoint for calculator results
  app.post("/api/generate-pdf", async (req, res) => {
    try {
      const { amount, years, compoundInterest, finalAmount, interestGenerated } = req.body;
      
      // In a real implementation, you would use a PDF library like puppeteer or jsPDF
      // For now, we'll return a mock PDF URL
      const pdfData = {
        filename: `investment-simulation-${Date.now()}.pdf`,
        url: `/api/download-pdf/${Date.now()}`, // Mock URL
        data: {
          amount,
          years,
          compoundInterest,
          finalAmount,
          interestGenerated,
          generatedAt: new Date().toISOString()
        }
      };
      
      res.json({ success: true, pdf: pdfData });
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ success: false, error: "Failed to generate PDF" });
    }
  });

  // Email notification endpoint for lead magnets
  app.post("/api/send-documents", async (req, res) => {
    try {
      const { leadId, email } = req.body;
      
      // In a real implementation, you would integrate with email service
      console.log(`Sending documents to ${email} for lead ${leadId}`);
      
      res.json({ success: true, message: "Documents sent successfully" });
    } catch (error) {
      console.error("Error sending documents:", error);
      res.status(500).json({ success: false, error: "Failed to send documents" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
