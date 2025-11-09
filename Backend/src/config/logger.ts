import pino from 'pino';

import { loadConfig } from './env.js';

const { logLevel, nodeEnv } = loadConfig();

export const logger = pino({
  level: logLevel,
  transport:
    nodeEnv === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard'
          }
        }
      : undefined
});

