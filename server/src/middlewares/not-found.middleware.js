import { NOT_FOUND } from '../constants/http-status.js';
import { ROUTE_NOT_FOUND } from '../constants/messages.js';
import ApiError from '../utils/ApiError.js';

const notFoundHandler = (req, res, next) => {
  next(new ApiError(NOT_FOUND, `${ROUTE_NOT_FOUND}: ${req.originalUrl}`));
};

export default notFoundHandler;
