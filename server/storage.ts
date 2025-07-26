import { leads, calculatorResults, users, type Lead, type InsertLead, type CalculatorResult, type InsertCalculatorResult, type User, type InsertUser } from "@shared/schema";
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
}

export const storage = new DatabaseStorage();
