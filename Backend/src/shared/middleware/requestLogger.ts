import type { NextFunction, Request, Response } from 'express';
import process from 'process';

import { logger } from '../../config/logger.js';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime.bigint();

  logger.debug({ method: req.method, url: req.url }, 'Incoming request');

  res.on('finish', () => {
    const elapsedMs =
      Number(process.hrtime.bigint() - start) / 1_000_000;

    logger.info(
      {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        durationMs: Number(elapsedMs.toFixed(2))
      },
      'Request completed'
    );
  });

  next();
}

