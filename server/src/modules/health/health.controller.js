import { getHealthStatus } from './health.service.js';
import { OK } from '../../constants/http-status.js';
import ApiResponse from '../../utils/ApiResponse.js';

export const getHealth = async (req, res) => {
  const healthStatus = await getHealthStatus();

  return res.status(OK).json(new ApiResponse(OK, healthStatus.message));
};
