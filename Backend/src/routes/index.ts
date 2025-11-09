import type { Express } from 'express';
import { Router } from 'express';

import { healthRouter } from './health.routes.js';
import { auditRouter } from '../modules/audits/audit.routes.js';
import { interactionRouter } from '../modules/interactions/interaction.routes.js';
import { interviewRouter } from '../modules/interviews/interview.routes.js';
import { sessionRouter } from '../modules/sessions/session.routes.js';

export function registerRoutes(app: Express) {
  const apiRouter = Router();

  apiRouter.use('/health', healthRouter);
  apiRouter.use('/sessions', sessionRouter);
  apiRouter.use('/interviews', interviewRouter);
  apiRouter.use('/interactions', interactionRouter);
  apiRouter.use('/audits', auditRouter);

  app.use('/api/v1', apiRouter);
}

