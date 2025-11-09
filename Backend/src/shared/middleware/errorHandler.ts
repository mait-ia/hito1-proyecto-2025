import type { NextFunction, Request, Response } from 'express';

import { logger } from '../../config/logger.js';
import { HttpError } from '../errors/httpError.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Express requires 4 args
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  void _next;
  if (err instanceof HttpError) {
    logger.warn({ err }, 'Handled HTTP error');
    res.status(err.statusCode).json({
      error: err.message,
      details: err.details
    });
    return;
  }

  logger.error({ err }, 'Unhandled error');
  res.status(500).json({
    error: 'Internal server error'
  });
}

