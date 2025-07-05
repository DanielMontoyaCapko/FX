import { leads, calculatorResults, type Lead, type InsertLead, type CalculatorResult, type InsertCalculatorResult } from "@shared/schema";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeadById(id: number): Promise<Lead | undefined>;
  createCalculatorResult(result: InsertCalculatorResult): Promise<CalculatorResult>;
}

export class MemStorage implements IStorage {
  private leads: Map<number, Lead>;
  private calculatorResults: Map<number, CalculatorResult>;
  private currentLeadId: number;
  private currentResultId: number;

  constructor() {
    this.leads = new Map();
    this.calculatorResults = new Map();
    this.currentLeadId = 1;
    this.currentResultId = 1;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const lead: Lead = { 
      ...insertLead, 
      id,
      createdAt: new Date()
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeadById(id: number): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async createCalculatorResult(insertResult: InsertCalculatorResult): Promise<CalculatorResult> {
    const id = this.currentResultId++;
    const result: CalculatorResult = {
      ...insertResult,
      id,
      createdAt: new Date()
    };
    this.calculatorResults.set(id, result);
    return result;
  }
}

export const storage = new MemStorage();
