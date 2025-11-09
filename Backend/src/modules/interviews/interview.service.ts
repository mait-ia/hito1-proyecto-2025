import type { InterviewEntity } from './interview.types.js';
import type { InterviewRepository } from './repositories/interview.repository.js';
import type { AuditService } from '../audits/audit.service.js';

interface CreateInterviewInput {
  advisorId: string;
}

export class InterviewService {
  constructor(
    private readonly repository: InterviewRepository,
    private readonly auditService: AuditService
  ) {}

  async createInterview(input: CreateInterviewInput): Promise<InterviewEntity> {
    const interview = await this.repository.create({
      advisorId: input.advisorId
    });

    await this.auditService.appendRecord({
      sessionId: interview.id,
      action: 'onboarding.interview.created',
      payload: {
        advisorId: input.advisorId,
        status: interview.status,
        createdAt: interview.createdAt.toISOString()
      },
      actor: {
        id: input.advisorId,
        role: 'advisor'
      }
    });

    return interview;
  }
}

