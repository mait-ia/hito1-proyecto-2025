import { Router } from 'express';

import { InMemorySessionRepository } from './repositories/session.repository.js';
import { SessionController } from './session.controller.js';
import { SessionService } from './session.service.js';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';

const repository = new InMemorySessionRepository();
const service = new SessionService(repository);
const controller = new SessionController(service);

export const sessionRouter = Router();

sessionRouter.post(
  '/',
  asyncHandler(async (req, res) => controller.create(req, res))
);

sessionRouter.get(
  '/:sessionId',
  asyncHandler(async (req, res) => controller.getById(req, res))
);

sessionRouter.patch(
  '/:sessionId/status',
  asyncHandler(async (req, res) => controller.updateStatus(req, res))
);

