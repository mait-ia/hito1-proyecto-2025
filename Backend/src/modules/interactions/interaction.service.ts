import type { InteractionEntity } from './interaction.types.js';
import type { InteractionRepository } from './repositories/interaction.repository.js';

interface RecordInteractionInput {
  sessionId: string;
  suggestion: string;
  output: string;
  intention: 'sugerencia' | 'confirmacion' | 'recordatorio' | 'cierreParcial';
  status: 'pending' | 'completed' | 'flagged';
  progress: number;
  evidence?: {
    snippet?: string;
    timestamp?: string;
  };
}

export class InteractionService {
  constructor(private readonly repository: InteractionRepository) {}

  async recordInteraction(input: RecordInteractionInput): Promise<InteractionEntity> {
    return this.repository.create({
      ...input
    });
  }

  async getInteractionsForSession(sessionId: string): Promise<InteractionEntity[]> {
    return this.repository.listBySession(sessionId);
  }
}

