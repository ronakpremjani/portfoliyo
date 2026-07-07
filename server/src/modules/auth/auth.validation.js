import { body, validationResult } from 'express-validator';

import { BAD_REQUEST } from '../../constants/http-status.js';
import {
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED,
  VALIDATION_ERROR,
} from '../../constants/messages.js';
import ApiError from '../../utils/ApiError.js';

export const validateRequest = (req, res, next) => {
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

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage(EMAIL_REQUIRED)
    .bail()
    .isEmail()
    .withMessage(EMAIL_INVALID)
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage(PASSWORD_REQUIRED)
    .bail()
    .isLength({ min: 8 })
    .withMessage(PASSWORD_MIN_LENGTH),
  validateRequest,
];
