import { randomUUID } from 'crypto';

import type { SessionEntity } from '../session.types.js';

export interface SessionRepository {
  create(payload: Partial<SessionEntity>): Promise<SessionEntity>;
  findById(id: string): Promise<SessionEntity | null>;
  update(
    id: string,
    payload: Partial<Omit<SessionEntity, 'id' | 'createdAt'>>
  ): Promise<SessionEntity>;
  listByAdvisor(advisorId: string): Promise<SessionEntity[]>;
}

export class InMemorySessionRepository implements SessionRepository {
  private readonly sessions = new Map<string, SessionEntity>();

  async create(payload: Partial<SessionEntity>): Promise<SessionEntity> {
    const id = randomUUID();
    const now = new Date();
    const session: SessionEntity = {
      id,
      advisorId: payload.advisorId ?? 'unassigned',
      clientId: payload.clientId ?? 'pending',
      createdAt: now,
      updatedAt: now,
      status: payload.status ?? 'draft',
      metadata: payload.metadata ?? {}
    };
    this.sessions.set(id, session);
    return session;
  }

  async findById(id: string): Promise<SessionEntity | null> {
    return this.sessions.get(id) ?? null;
  }

  async update(
    id: string,
    payload: Partial<Omit<SessionEntity, 'id' | 'createdAt'>>
  ): Promise<SessionEntity> {
    const existing = this.sessions.get(id);
    if (!existing) {
      throw new Error('Session not found');
    }
    const updated: SessionEntity = {
      ...existing,
      ...payload,
      updatedAt: new Date()
    };
    this.sessions.set(id, updated);
    return updated;
  }

  async listByAdvisor(advisorId: string): Promise<SessionEntity[]> {
    return Array.from(this.sessions.values()).filter(
      (session) => session.advisorId === advisorId
    );
  }
}

