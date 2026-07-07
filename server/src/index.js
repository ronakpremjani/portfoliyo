import { once } from 'node:events';
import { promisify } from 'node:util';

import { connectDatabase, disconnectDatabase } from './config/database.js';
import app from './app.js';
import env from './config/env.js';
import logger from './config/logger.js';
import { SERVER_CLOSING, SERVER_STARTED } from './constants/messages.js';

await connectDatabase();

const server = app.listen(env.port);

await once(server, 'listening');

logger.info(`${SERVER_STARTED} ${env.port}`);

const closeServer = promisify(server.close).bind(server);

const shutdown = async (signal) => {
  logger.info(`${signal} ${SERVER_CLOSING}`);

  try {
    await closeServer();
    await disconnectDatabase();
    process.exit(0);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});
