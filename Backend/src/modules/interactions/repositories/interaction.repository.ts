import { randomUUID } from 'crypto';

import type { InteractionEntity } from '../interaction.types.js';

export interface InteractionRepository {
  create(payload: Omit<InteractionEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<InteractionEntity>;
  listBySession(sessionId: string): Promise<InteractionEntity[]>;
}

export class InMemoryInteractionRepository implements InteractionRepository {
  private readonly interactions = new Map<string, InteractionEntity>();

  async create(
    payload: Omit<InteractionEntity, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<InteractionEntity> {
    const id = randomUUID();
    const now = new Date();
    const record: InteractionEntity = {
      ...payload,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.interactions.set(id, record);
    return record;
  }

  async listBySession(sessionId: string): Promise<InteractionEntity[]> {
    return Array.from(this.interactions.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }
}

