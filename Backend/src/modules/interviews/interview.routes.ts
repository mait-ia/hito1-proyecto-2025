import { Router } from 'express';

import { InterviewController } from './interview.controller.js';
import { InterviewService } from './interview.service.js';
import { InMemoryInterviewRepository } from './repositories/interview.repository.js';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';
import { auditRepository } from '../audits/audit.registry.js';
import { AuditService } from '../audits/audit.service.js';

const interviewRepository = new InMemoryInterviewRepository();
const auditService = new AuditService(auditRepository);
const interviewService = new InterviewService(interviewRepository, auditService);
const interviewController = new InterviewController(interviewService);

export const interviewRouter = Router();

interviewRouter.post(
  '/',
  asyncHandler(async (req, res) => interviewController.create(req, res))
);

