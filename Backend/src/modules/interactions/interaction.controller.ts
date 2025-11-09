import type { Request, Response } from 'express';
import { z } from 'zod';

import type { InteractionService } from './interaction.service.js';

const recordInteractionSchema = z.object({
  sessionId: z.string().min(1),
  suggestion: z.string().min(1),
  output: z.string().min(1),
  intention: z.enum(['sugerencia', 'confirmacion', 'recordatorio', 'cierreParcial']),
  status: z.enum(['pending', 'completed', 'flagged']),
  progress: z.number().min(0).max(1),
  evidence: z
    .object({
      snippet: z.string().optional(),
      timestamp: z.string().optional()
    })
    .optional()
});

export class InteractionController {
  constructor(private readonly service: InteractionService) {}

  async record(req: Request, res: Response) {
    const payload = recordInteractionSchema.parse(req.body);
    const interaction = await this.service.recordInteraction(payload);
    res.status(201).json(interaction);
  }

  async list(req: Request, res: Response) {
    const { sessionId } = req.params;
    const interactions = await this.service.getInteractionsForSession(sessionId);
    res.status(200).json(interactions);
  }
}

