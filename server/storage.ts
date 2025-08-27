import { leads, calculatorResults, users, kyc, products, contracts, auditLogs, clientActivityLogs, type Lead, type InsertLead, type CalculatorResult, type InsertCalculatorResult, type User, type InsertUser, type Kyc, type InsertKyc, type Product, type InsertProduct, type Contract, type InsertContract, type AuditLog, type ClientActivityLog, type InsertClientActivityLog } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeadById(id: number): Promise<Lead | undefined>;
  createCalculatorResult(result: InsertCalculatorResult): Promise<CalculatorResult>;
  
  // User authentication methods
  createUser(userData: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
  
  // KYC methods
  createKyc(kycData: InsertKyc): Promise<Kyc>;
  getKycByUserId(userId: number): Promise<Kyc | undefined>;
  updateKyc(kycId: number, updates: any): Promise<Kyc>;
  
  // Admin methods
  getAllUsers(): Promise<User[]>;
  getAllKyc(): Promise<any[]>;
  getAllProducts(): Promise<Product[]>;
  getAllContracts(): Promise<any[]>;
  createProduct(productData: InsertProduct): Promise<Product>;
  updateUser(userId: number, updates: any): Promise<User>;
  deleteUser(userId: number): Promise<void>;
  updateProduct(productId: number, updates: any): Promise<Product>;
  deleteProduct(productId: number): Promise<void>;
  updateContractStatus(contractId: number, status: string): Promise<Contract>;
  
  // Audit logs
  getAuditLogs(): Promise<any[]>;
  
  // Client activity logs
  createClientActivityLog(activityData: InsertClientActivityLog): Promise<ClientActivityLog>;
  getClientActivityLogsByUserId(userId: number): Promise<ClientActivityLog[]>;
}

export class DatabaseStorage implements IStorage {
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async getLeadById(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async createCalculatorResult(insertResult: InsertCalculatorResult): Promise<CalculatorResult> {
    const [result] = await db.insert(calculatorResults).values(insertResult).returning();
    return result;
  }

  // User authentication methods
  async createUser(userData: InsertUser): Promise<User> {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const userToInsert = {
      ...userData,
      password: hashedPassword,
    };
    
    const [user] = await db.insert(users).values(userToInsert).returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // KYC methods
  async createKyc(kycData: InsertKyc): Promise<Kyc> {
    const [kycRecord] = await db.insert(kyc).values(kycData).returning();
    return kycRecord;
  }

  async getKycByUserId(userId: number): Promise<Kyc | undefined> {
    const [kycRecord] = await db.select().from(kyc).where(eq(kyc.userId, userId));
    return kycRecord;
  }

  async updateKyc(kycId: number, updates: any): Promise<Kyc> {
    const [updated] = await db
      .update(kyc)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(kyc.id, kycId))
      .returning();
    return updated;
  }

  // Admin methods
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getAllKyc(): Promise<any[]> {
    const result = await db
      .select({
        id: kyc.id,
        userId: kyc.userId,
        userName: users.name,
        userEmail: users.email,
        fullName: kyc.fullName,
        documentType: kyc.documentType,
        documentNumber: kyc.documentNumber,
        country: kyc.country,
        status: kyc.status,
        documentsUrls: kyc.documentsUrls,
        rejectionReason: kyc.rejectionReason,
        reviewedBy: kyc.reviewedBy,
        reviewedAt: kyc.reviewedAt,
        createdAt: kyc.createdAt,
      })
      .from(kyc)
      .leftJoin(users, eq(kyc.userId, users.id));
    
    return result;
  }

  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getAllContracts(): Promise<any[]> {
    const result = await db
      .select({
        id: contracts.id,
        userId: contracts.userId,
        userName: users.name,
        productId: contracts.productId,
        productName: products.name,
        amount: contracts.amount,
        status: contracts.status,
        createdAt: contracts.createdAt
      })
      .from(contracts)
      .leftJoin(users, eq(contracts.userId, users.id))
      .leftJoin(products, eq(contracts.productId, products.id));
    
    return result;
  }

  async createProduct(productData: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(productData).returning();
    return product;
  }

  async updateUser(userId: number, updates: any) {
    // Hash password if provided
    if (updates.password) {
      const saltRounds = 12;
      updates.password = await bcrypt.hash(updates.password, saltRounds);
    }
    
    const result = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return result[0];
  }

  async deleteUser(userId: number) {
    // Note: In a real app, you might want to soft delete or check for dependencies
    await db.delete(users).where(eq(users.id, userId));
  }

  async updateProduct(productId: number, updates: any) {
    const result = await db
      .update(products)
      .set(updates)
      .where(eq(products.id, productId))
      .returning();
    return result[0];
  }

  async deleteProduct(productId: number) {
    // Note: In a real app, you might want to check for dependencies (contracts)
    await db.delete(products).where(eq(products.id, productId));
  }

  async updateKycStatus(kycId: number, status: string) {
    const result = await db
      .update(kyc)
      .set({ status })
      .where(eq(kyc.id, kycId))
      .returning();
    return result[0];
  }

  async updateContractStatus(contractId: number, status: string) {
    const result = await db
      .update(contracts)
      .set({ status })
      .where(eq(contracts.id, contractId))
      .returning();
    return result[0];
  }

  async getAuditLogs(): Promise<any[]> {
    const result = await db
      .select({
        id: auditLogs.id,
        adminId: auditLogs.adminId,
        adminName: users.name,
        adminEmail: users.email,
        action: auditLogs.action,
        entityType: auditLogs.entityType,
        entityId: auditLogs.entityId,
        oldValues: auditLogs.oldValues,
        newValues: auditLogs.newValues,
        description: auditLogs.description,
        ipAddress: auditLogs.ipAddress,
        userAgent: auditLogs.userAgent,
        createdAt: auditLogs.createdAt,
      })
      .from(auditLogs)
      .leftJoin(users, eq(auditLogs.adminId, users.id))
      .orderBy(desc(auditLogs.createdAt));
    
    return result;
  }

  async createClientActivityLog(activityData: InsertClientActivityLog): Promise<ClientActivityLog> {
    const [activity] = await db.insert(clientActivityLogs).values(activityData).returning();
    return activity;
  }

  async getClientActivityLogsByUserId(userId: number): Promise<ClientActivityLog[]> {
    const result = await db
      .select()
      .from(clientActivityLogs)
      .where(eq(clientActivityLogs.userId, userId))
      .orderBy(desc(clientActivityLogs.createdAt));
    
    return result;
  }

  // Helper function to log client activity
  async logClientActivity(userId: number, action: string): Promise<void> {
    await this.createClientActivityLog({
      userId,
      action,
    });
  }
}

export const storage = new DatabaseStorage();
