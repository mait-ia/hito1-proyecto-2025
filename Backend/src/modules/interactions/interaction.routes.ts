import { Router } from 'express';

import { InteractionController } from './interaction.controller.js';
import { InteractionService } from './interaction.service.js';
import { InMemoryInteractionRepository } from './repositories/interaction.repository.js';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';

const repository = new InMemoryInteractionRepository();
const service = new InteractionService(repository);
const controller = new InteractionController(service);

export const interactionRouter = Router();

interactionRouter.post(
  '/',
  asyncHandler(async (req, res) => controller.record(req, res))
);

interactionRouter.get(
  '/:sessionId',
  asyncHandler(async (req, res) => controller.list(req, res))
);

