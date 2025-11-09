import { randomUUID } from 'crypto';

import type { InterviewEntity } from '../interview.types.js';

export interface InterviewRepository {
  create(payload: { advisorId: string }): Promise<InterviewEntity>;
}

export class InMemoryInterviewRepository implements InterviewRepository {
  private readonly interviews = new Map<string, InterviewEntity>();

  async create(payload: { advisorId: string }): Promise<InterviewEntity> {
    const interview: InterviewEntity = {
      id: randomUUID(),
      advisorId: payload.advisorId,
      createdAt: new Date(),
      status: 'INIT'
    };

    this.interviews.set(interview.id, interview);
    return interview;
  }
}

