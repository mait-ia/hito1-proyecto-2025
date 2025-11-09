export type InteractionStatus = 'pending' | 'completed' | 'flagged';

export interface InteractionEntity {
  id: string;
  sessionId: string;
  suggestion: string;
  output: string;
  intention: 'sugerencia' | 'confirmacion' | 'recordatorio' | 'cierreParcial';
  status: InteractionStatus;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  evidence?: {
    snippet?: string;
    timestamp?: string;
  };
}

