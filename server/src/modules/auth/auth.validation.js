import { body } from 'express-validator';

import {
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED,
} from '../../constants/messages.js';
import validateRequest from '../../utils/validateRequest.js';

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
