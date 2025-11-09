import type { Request, Response } from 'express';
import { z } from 'zod';

import type { InterviewService } from './interview.service.js';

const createInterviewSchema = z.object({
  advisorId: z.string().min(1)
});

export class InterviewController {
  constructor(private readonly service: InterviewService) {}

  async create(req: Request, res: Response) {
    const payload = createInterviewSchema.parse(req.body);
    const interview = await this.service.createInterview(payload);

    res.status(201).json({
      interviewId: interview.id,
      status: interview.status,
      createdAt: interview.createdAt.toISOString()
    });
  }
}

