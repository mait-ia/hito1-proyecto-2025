import type { AuditRecordEntity } from './audit.types.js';
import type { AuditRepository } from './repositories/audit.repository.js';

interface AppendAuditInput {
  sessionId: string;
  action: string;
  payload: Record<string, unknown>;
  actor: {
    id: string;
    role: 'system' | 'advisor' | 'supervisor';
  };
}

export class AuditService {
  constructor(private readonly repository: AuditRepository) {}

  async appendRecord(input: AppendAuditInput): Promise<AuditRecordEntity> {
    return this.repository.append(input);
  }

  async listBySession(sessionId: string): Promise<AuditRecordEntity[]> {
    return this.repository.listBySession(sessionId);
  }
}

