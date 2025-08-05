import { leads, calculatorResults, users, kyc, products, contracts, type Lead, type InsertLead, type CalculatorResult, type InsertCalculatorResult, type User, type InsertUser, type Kyc, type InsertKyc, type Product, type InsertProduct, type Contract, type InsertContract } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
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
  
  // Admin methods
  getAllUsers(): Promise<User[]>;
  getAllKyc(): Promise<Kyc[]>;
  getAllProducts(): Promise<Product[]>;
  getAllContracts(): Promise<any[]>;
  createProduct(productData: InsertProduct): Promise<Product>;
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

  // Admin methods
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getAllKyc(): Promise<Kyc[]> {
    return await db.select().from(kyc);
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
}

export const storage = new DatabaseStorage();
