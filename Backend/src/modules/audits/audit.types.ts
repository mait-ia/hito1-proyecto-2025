export interface AuditRecordEntity {
  id: string;
  sessionId: string;
  action: string;
  payload: Record<string, unknown>;
  createdAt: Date;
  actor: {
    id: string;
    role: 'system' | 'advisor' | 'supervisor';
  };
}

