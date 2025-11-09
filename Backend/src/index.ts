import process from 'process';

import { createServer } from './app.js';
import { loadConfig } from './config/env.js';
import { logger } from './config/logger.js';

async function bootstrap() {
  const config = loadConfig();
  const app = await createServer();

  app.listen(config.port, () => {
    logger.info(
      { port: config.port, environment: config.nodeEnv },
      'HTTP server listening',
    );
  });
}

bootstrap().catch((error) => {
  logger.error({ err: error }, 'Startup failure');
  process.exit(1);
});
