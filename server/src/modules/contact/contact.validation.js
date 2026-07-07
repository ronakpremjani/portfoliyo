import { body, param, query } from 'express-validator';

import {
  CONTACT_MESSAGE_MIN_LENGTH,
  CONTACT_MESSAGE_REQUIRED,
  CONTACT_NAME_MIN_LENGTH,
  CONTACT_NAME_REQUIRED,
  CONTACT_SUBJECT_MIN_LENGTH,
  CONTACT_SUBJECT_REQUIRED,
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  INVALID_BOOLEAN,
  INVALID_CONTACT_STATUS,
  INVALID_OBJECT_ID,
  INVALID_SORT,
  INVALID_STRING,
} from '../../constants/messages.js';
import validateRequest from '../../utils/validateRequest.js';
import { CONTACT_STATUSES } from './contact.model.js';

const sortValues = ['latest', 'oldest'];

const idParamValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  validateRequest,
];

export const submitContactValidation = [
  body('name')
    .notEmpty()
    .withMessage(CONTACT_NAME_REQUIRED)
    .bail()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage(CONTACT_NAME_MIN_LENGTH),
  body('email')
    .trim()
    .notEmpty()
    .withMessage(EMAIL_REQUIRED)
    .bail()
    .isEmail()
    .withMessage(EMAIL_INVALID)
    .normalizeEmail(),
  body('subject')
    .notEmpty()
    .withMessage(CONTACT_SUBJECT_REQUIRED)
    .bail()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 3, max: 180 })
    .withMessage(CONTACT_SUBJECT_MIN_LENGTH),
  body('message')
    .notEmpty()
    .withMessage(CONTACT_MESSAGE_REQUIRED)
    .bail()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage(CONTACT_MESSAGE_MIN_LENGTH),
  validateRequest,
];

export const listContactMessagesValidation = [
  query('status').optional().isIn(CONTACT_STATUSES).withMessage(INVALID_CONTACT_STATUS),
  query('isRead').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  query('sort').optional().isIn(sortValues).withMessage(INVALID_SORT),
  validateRequest,
];

export const markContactMessageReadValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  body('isRead').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  validateRequest,
];

export const deleteContactMessageValidation = idParamValidation;
