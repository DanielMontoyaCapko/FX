import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertCalculatorResultSchema, loginSchema, registerSchema } from "@shared/schema";
import { generateToken, authMiddleware, requireRole, type AuthRequest } from "./auth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/register", async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists with this email" });
      }

      const user = await storage.createUser(userData);
      const token = generateToken(user.id, user.email, user.name, user.role);

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid registration data", details: error.errors });
      }
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isValidPassword = await storage.validatePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = generateToken(user.id, user.email, user.name, user.role);

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid login data", details: error.errors });
      }
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Get current user info (protected route)
  app.get("/api/me", authMiddleware, async (req: AuthRequest, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  });
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

  // Admin routes (require admin role)
  app.get("/api/admin/users", authMiddleware, requireRole('admin'), async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json({ success: true, users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.get("/api/admin/kyc", authMiddleware, requireRole('admin'), async (req, res) => {
    try {
      const kyc = await storage.getAllKyc();
      res.json({ success: true, kyc });
    } catch (error) {
      console.error("Error fetching KYC:", error);
      res.status(500).json({ error: "Failed to fetch KYC records" });
    }
  });

  app.get("/api/admin/products", authMiddleware, requireRole('admin'), async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json({ success: true, products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/admin/contracts", authMiddleware, requireRole('admin'), async (req, res) => {
    try {
      const contracts = await storage.getAllContracts();
      res.json({ success: true, contracts });
    } catch (error) {
      console.error("Error fetching contracts:", error);
      res.status(500).json({ error: "Failed to fetch contracts" });
    }
  });

  app.post("/api/admin/products", authMiddleware, requireRole('admin'), async (req, res) => {
    try {
      const productData = req.body;
      const product = await storage.createProduct(productData);
      res.json({ success: true, product });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
