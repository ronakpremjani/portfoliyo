import { body, param, query } from 'express-validator';

import {
  DESCRIPTION_REQUIRED,
  FIELD_TOO_LONG,
  INVALID_BOOLEAN,
  INVALID_NUMBER,
  INVALID_OBJECT_ID,
  INVALID_SORT,
  INVALID_STRING,
  SERVICE_UPDATE_REQUIRED,
  TITLE_MIN_LENGTH,
  TITLE_REQUIRED,
} from '../../constants/messages.js';
import validateRequest from '../../utils/validateRequest.js';

const sortValues = ['displayOrder', 'title', 'latest'];

const requiredTitle = body('title')
  .notEmpty()
  .withMessage(TITLE_REQUIRED)
  .bail()
  .isString()
  .withMessage(INVALID_STRING)
  .bail()
  .trim()
  .isLength({ min: 3, max: 120 })
  .withMessage(TITLE_MIN_LENGTH);

const optionalTitle = body('title')
  .optional()
  .isString()
  .withMessage(INVALID_STRING)
  .bail()
  .trim()
  .isLength({ min: 3, max: 120 })
  .withMessage(TITLE_MIN_LENGTH);

const requiredDescription = body('description')
  .notEmpty()
  .withMessage(DESCRIPTION_REQUIRED)
  .bail()
  .isString()
  .withMessage(INVALID_STRING)
  .bail()
  .trim()
  .isLength({ max: 5000 })
  .withMessage(FIELD_TOO_LONG);

const optionalDescription = body('description')
  .optional()
  .isString()
  .withMessage(INVALID_STRING)
  .bail()
  .trim()
  .isLength({ max: 5000 })
  .withMessage(FIELD_TOO_LONG);

const servicePayloadValidation = [
  body('icon')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ max: 500 })
    .withMessage(FIELD_TOO_LONG),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage(INVALID_NUMBER)
    .toInt(),
  body('isVisible').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
];

const idParamValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  validateRequest,
];

export const listServicesValidation = [
  query('sort').optional().isIn(sortValues).withMessage(INVALID_SORT),
  validateRequest,
];

export const serviceIdValidation = idParamValidation;

export const createServiceValidation = [
  requiredTitle,
  requiredDescription,
  ...servicePayloadValidation,
  validateRequest,
];

export const updateServiceValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error(SERVICE_UPDATE_REQUIRED);
    }

    return true;
  }),
  optionalTitle,
  optionalDescription,
  ...servicePayloadValidation,
  validateRequest,
];

export const deleteServiceValidation = idParamValidation;

export const updateServiceVisibilityValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  body('isVisible').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  validateRequest,
];
