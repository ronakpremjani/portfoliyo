import mongoose from 'mongoose';

import env from './env.js';
import logger from './logger.js';
import {
  DATABASE_CONNECTED,
  DATABASE_DISCONNECTED,
  DATABASE_NOT_CONFIGURED,
} from '../constants/messages.js';

mongoose.set('strictQuery', true);
mongoose.set('bufferCommands', false);

export const connectDatabase = async () => {
  if (!env.mongoUri) {
    logger.warn(DATABASE_NOT_CONFIGURED);
    return null;
  }

  const connection = await mongoose.connect(env.mongoUri);
  logger.info(`${DATABASE_CONNECTED}: ${connection.connection.host}`);

  return connection;
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.disconnect();
  logger.info(DATABASE_DISCONNECTED);
};
