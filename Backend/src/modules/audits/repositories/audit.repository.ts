import { randomUUID } from 'crypto';

import type { AuditRecordEntity } from '../audit.types.js';

export interface AuditRepository {
  append(record: Omit<AuditRecordEntity, 'id' | 'createdAt'>): Promise<AuditRecordEntity>;
  listBySession(sessionId: string): Promise<AuditRecordEntity[]>;
}

export class InMemoryAuditRepository implements AuditRepository {
  private readonly records = new Map<string, AuditRecordEntity>();

  async append(
    record: Omit<AuditRecordEntity, 'id' | 'createdAt'>
  ): Promise<AuditRecordEntity> {
    const id = randomUUID();
    const entry: AuditRecordEntity = {
      ...record,
      id,
      createdAt: new Date()
    };
    this.records.set(id, entry);
    return entry;
  }

  async listBySession(sessionId: string): Promise<AuditRecordEntity[]> {
    return Array.from(this.records.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }
}

