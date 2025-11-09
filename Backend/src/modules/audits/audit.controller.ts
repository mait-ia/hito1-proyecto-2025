import type { Request, Response } from 'express';
import { z } from 'zod';

import type { AuditService } from './audit.service.js';

const appendRecordSchema = z.object({
  sessionId: z.string().min(1),
  action: z.string().min(1),
  payload: z.record(z.unknown()).default({}),
  actor: z.object({
    id: z.string().min(1),
    role: z.enum(['system', 'advisor', 'supervisor'])
  })
});

export class AuditController {
  constructor(private readonly service: AuditService) {}

  async append(req: Request, res: Response) {
    const payload = appendRecordSchema.parse(req.body);
    const record = await this.service.appendRecord(payload);
    res.status(201).json(record);
  }

  async listBySession(req: Request, res: Response) {
    const { sessionId } = req.params;
    const records = await this.service.listBySession(sessionId);
    res.status(200).json(records);
  }
}

