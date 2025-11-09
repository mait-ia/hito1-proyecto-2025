import type { Request, Response } from 'express';
import { z } from 'zod';

import type { SessionService } from './session.service.js';
import { HttpError } from '../../shared/errors/httpError.js';

const createSessionSchema = z.object({
  advisorId: z.string().min(1),
  clientId: z.string().min(1),
  metadata: z.record(z.unknown()).optional()
});

const updateStatusSchema = z.object({
  status: z.enum(['draft', 'in_progress', 'completed', 'archived']),
  metadata: z.record(z.unknown()).optional()
});

export class SessionController {
  constructor(private readonly service: SessionService) {}

  async create(req: Request, res: Response) {
    const payload = createSessionSchema.parse(req.body);
    const session = await this.service.createSession(payload);
    res.status(201).json(session);
  }

  async getById(req: Request, res: Response) {
    const session = await this.service.getSessionById(req.params.sessionId);
    if (!session) {
      throw new HttpError(404, 'Session not found');
    }

    res.status(200).json(session);
  }

  async updateStatus(req: Request, res: Response) {
    const payload = updateStatusSchema.parse(req.body);
    const session = await this.service.updateSessionStatus({
      sessionId: req.params.sessionId,
      status: payload.status,
      metadata: payload.metadata
    });

    res.status(200).json(session);
  }
}

