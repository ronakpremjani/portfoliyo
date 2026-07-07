import env from '../config/env.js';
import logger from '../config/logger.js';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../constants/http-status.js';
import {
  INVALID_JSON_PAYLOAD,
  SOMETHING_WENT_WRONG,
  VALIDATION_ERROR,
} from '../constants/messages.js';
import ApiError from '../utils/ApiError.js';

const isJsonParseError = (error) => error instanceof SyntaxError && error.status === 400 && 'body' in error;

const isValidationError = (error) =>
  error.name === 'ValidationError' ||
  error.name === 'ZodError' ||
  Array.isArray(error.details) ||
  Array.isArray(error.issues);

const normalizeValidationErrors = (error) => {
  if (Array.isArray(error.errors)) {
    return error.errors;
  }

  if (error.errors && typeof error.errors === 'object') {
    return Object.values(error.errors).map((item) => ({
      field: item.path,
      message: item.message,
    }));
  }

  if (Array.isArray(error.issues)) {
    return error.issues.map((issue) => ({
      field: issue.path?.join('.'),
      message: issue.message,
    }));
  }

  if (Array.isArray(error.details)) {
    return error.details.map((detail) => ({
      field: detail.path?.join('.'),
      message: detail.message,
    }));
  }

  return [];
};

const normalizeError = (error) => {
  if (error instanceof ApiError) {
    return error;
  }

  if (isJsonParseError(error)) {
    return new ApiError(BAD_REQUEST, INVALID_JSON_PAYLOAD, [error.message]);
  }

  if (isValidationError(error)) {
    return new ApiError(BAD_REQUEST, VALIDATION_ERROR, normalizeValidationErrors(error));
  }

  return new ApiError(INTERNAL_SERVER_ERROR, SOMETHING_WENT_WRONG);
};

const errorHandler = (error, req, res, next) => {
  const apiError = normalizeError(error);

  logger.error(error.stack || error.message);

  const response = {
    success: false,
    message: apiError.message,
    errors: apiError.errors,
  };

  if (env.isDevelopment && error.stack) {
    response.stack = error.stack;
  }

  return res.status(apiError.statusCode).json(response);
};

export default errorHandler;
