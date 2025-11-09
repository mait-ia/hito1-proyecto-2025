export type SessionStatus = 'draft' | 'in_progress' | 'completed' | 'archived';

export interface SessionEntity {
  id: string;
  advisorId: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
  status: SessionStatus;
  metadata?: Record<string, unknown>;
}

