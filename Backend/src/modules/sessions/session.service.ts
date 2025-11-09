import type { SessionRepository } from './repositories/session.repository.js';
import type { SessionEntity, SessionStatus } from './session.types.js';

interface CreateSessionInput {
  advisorId: string;
  clientId: string;
  metadata?: Record<string, unknown>;
}

interface UpdateSessionStatusInput {
  sessionId: string;
  status: SessionStatus;
  metadata?: Record<string, unknown>;
}

export class SessionService {
  constructor(private readonly repository: SessionRepository) {}

  async createSession(input: CreateSessionInput): Promise<SessionEntity> {
    return this.repository.create({
      advisorId: input.advisorId,
      clientId: input.clientId,
      metadata: input.metadata,
      status: 'in_progress'
    });
  }

  async getSessionById(sessionId: string): Promise<SessionEntity | null> {
    return this.repository.findById(sessionId);
  }

  async updateSessionStatus(
    input: UpdateSessionStatusInput
  ): Promise<SessionEntity> {
    return this.repository.update(input.sessionId, {
      status: input.status,
      metadata: input.metadata
    });
  }
}

