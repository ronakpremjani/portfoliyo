import { SERVER_RUNNING } from '../../constants/messages.js';

export const getHealthStatus = async () => ({
  message: SERVER_RUNNING,
});
