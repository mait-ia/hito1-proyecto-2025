import { Router } from 'express';

import { AuditController } from './audit.controller.js';
import { auditRepository } from './audit.registry.js';
import { AuditService } from './audit.service.js';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';

const service = new AuditService(auditRepository);
const controller = new AuditController(service);

export const auditRouter = Router();

auditRouter.post(
  '/',
  asyncHandler(async (req, res) => controller.append(req, res))
);

auditRouter.get(
  '/:sessionId',
  asyncHandler(async (req, res) => controller.listBySession(req, res))
);

