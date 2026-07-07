import { validationResult } from 'express-validator';

import { BAD_REQUEST } from '../constants/http-status.js';
import { VALIDATION_ERROR } from '../constants/messages.js';
import ApiError from './ApiError.js';

const validateRequest = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
    return;
  }

  const errors = result.array({ onlyFirstError: true }).map((error) => ({
    field: error.path,
    message: error.msg,
  }));

  next(new ApiError(BAD_REQUEST, VALIDATION_ERROR, errors));
};

export default validateRequest;
