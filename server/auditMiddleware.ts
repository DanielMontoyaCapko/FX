import { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { auditLogs, users } from '@shared/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// Helper function to extract user ID from token
async function extractAdminFromRequest(req: Request): Promise<number | null> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    // Check if user is admin
    const admin = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1);
    if (admin.length > 0 && admin[0].role === 'admin') {
      return admin[0].id;
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

// Helper function to format entity for audit
function formatEntityForAudit(entity: any): string {
  try {
    // Remove sensitive fields like passwords
    const sanitized = { ...entity };
    delete sanitized.password;
    return JSON.stringify(sanitized);
  } catch (error) {
    return String(entity);
  }
}

// Main audit middleware function
export function createAuditMiddleware(action: 'CREATE' | 'UPDATE' | 'DELETE', entityType: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Store original data for comparison (for UPDATE operations)
    if (action === 'UPDATE' && req.params.id) {
      try {
        // Store old values in request for later use
        req.auditContext = {
          entityId: req.params.id,
          entityType,
          action
        };
      } catch (error) {
        console.error('Error setting up audit context:', error);
      }
    }

    // Store original res.json to intercept response
    const originalJson = res.json;
    
    res.json = function(body: any) {
      // Log the audit entry after successful operation
      logAuditEntry(req, res, body, action, entityType);
      
      // Call original res.json
      return originalJson.call(this, body);
    };

    next();
  };
}

// Function to log audit entry
async function logAuditEntry(
  req: Request, 
  res: Response, 
  responseBody: any, 
  action: 'CREATE' | 'UPDATE' | 'DELETE',
  entityType: string
) {
  try {
    // Only log successful operations (2xx status codes)
    if (res.statusCode < 200 || res.statusCode >= 300) {
      return;
    }

    const adminId = await extractAdminFromRequest(req);
    if (!adminId) {
      return; // Not an admin or invalid token
    }

    let entityId = '';
    let oldValues = null;
    let newValues = null;
    let description = '';

    // Extract entity ID and values based on action
    if (action === 'CREATE') {
      const created = responseBody?.success ? 
        (responseBody[entityType.toLowerCase()] || responseBody.data) : null;
      if (created) {
        entityId = String(created.id || created.userId || 'unknown');
        newValues = formatEntityForAudit(created);
        description = `Created ${entityType.toLowerCase()} with ID ${entityId}`;
      }
    } else if (action === 'UPDATE') {
      entityId = req.params.id || String(responseBody?.id || 'unknown');
      
      // Try to get old values from audit context
      const oldData = req.auditContext?.oldValues;
      if (oldData) {
        oldValues = formatEntityForAudit(oldData);
      }
      
      const updated = responseBody?.success ? 
        (responseBody[entityType.toLowerCase()] || responseBody.data) : null;
      if (updated) {
        newValues = formatEntityForAudit(updated);
      }
      
      description = `Updated ${entityType.toLowerCase()} with ID ${entityId}`;
    } else if (action === 'DELETE') {
      entityId = req.params.id || 'unknown';
      description = `Deleted ${entityType.toLowerCase()} with ID ${entityId}`;
    }

    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress || '';
    const userAgent = req.get('User-Agent') || '';

    // Insert audit log
    await db.insert(auditLogs).values({
      adminId,
      action,
      entityType,
      entityId,
      oldValues,
      newValues,
      description,
      ipAddress,
      userAgent
    });

  } catch (error) {
    console.error('Error logging audit entry:', error);
    // Don't throw error to avoid breaking the main operation
  }
}

// Export named imports for specific entity types
export const auditUser = {
  create: createAuditMiddleware('CREATE', 'users'),
  update: createAuditMiddleware('UPDATE', 'users'),
  delete: createAuditMiddleware('DELETE', 'users')
};

export const auditKyc = {
  create: createAuditMiddleware('CREATE', 'kyc'),
  update: createAuditMiddleware('UPDATE', 'kyc'),
  delete: createAuditMiddleware('DELETE', 'kyc')
};

export const auditProduct = {
  create: createAuditMiddleware('CREATE', 'products'),
  update: createAuditMiddleware('UPDATE', 'products'),
  delete: createAuditMiddleware('DELETE', 'products')
};

export const auditContract = {
  create: createAuditMiddleware('CREATE', 'contracts'),
  update: createAuditMiddleware('UPDATE', 'contracts'),
  delete: createAuditMiddleware('DELETE', 'contracts')
};

// Extend Request interface to include audit context
declare global {
  namespace Express {
    interface Request {
      auditContext?: {
        entityId: string;
        entityType: string;
        action: string;
        oldValues?: any;
      };
    }
  }
}