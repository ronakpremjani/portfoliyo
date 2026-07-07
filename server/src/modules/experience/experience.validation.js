import { body, param, query } from 'express-validator';

import {
  COMPANY_MIN_LENGTH,
  COMPANY_REQUIRED,
  EMPLOYMENT_TYPE_REQUIRED,
  END_DATE_AFTER_START_DATE,
  EXPERIENCE_UPDATE_REQUIRED,
  FIELD_TOO_LONG,
  INVALID_ARRAY,
  INVALID_BOOLEAN,
  INVALID_DATE,
  INVALID_NUMBER,
  INVALID_OBJECT_ID,
  INVALID_SORT,
  INVALID_STRING,
  POSITION_MIN_LENGTH,
  POSITION_REQUIRED,
  START_DATE_REQUIRED,
} from '../../constants/messages.js';
import validateRequest from '../../utils/validateRequest.js';

const sortValues = ['displayOrder', 'latest', 'oldest', 'company', 'current'];

const requiredString = (field, requiredMessage, lengthMessage) =>
  body(field)
    .notEmpty()
    .withMessage(requiredMessage)
    .bail()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage(lengthMessage);

const optionalString = (field, maxLength) =>
  body(field)
    .optional({ values: 'falsy' })
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ max: maxLength })
    .withMessage(FIELD_TOO_LONG);

const optionalStringArray = (field) => [
  body(field).optional().isArray().withMessage(INVALID_ARRAY),
  body(`${field}.*`)
    .optional()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ max: 120 })
    .withMessage(FIELD_TOO_LONG),
];

const dateOrderValidation = body('endDate').custom((endDate, { req }) => {
  if (!endDate || req.body.currentlyWorking) {
    return true;
  }

  const startDate = req.body.startDate;

  if (!startDate) {
    return true;
  }

  if (new Date(endDate) < new Date(startDate)) {
    throw new Error(END_DATE_AFTER_START_DATE);
  }

  return true;
});

const commonExperienceValidation = [
  optionalString('location', 160),
  body('currentlyWorking').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  optionalString('description', 5000),
  ...optionalStringArray('technologies'),
  optionalString('companyLogo', 500),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage(INVALID_NUMBER)
    .toInt(),
  dateOrderValidation,
];

const idParamValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  validateRequest,
];

export const listExperiencesValidation = [
  query('sort').optional().isIn(sortValues).withMessage(INVALID_SORT),
  query('currentlyWorking').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  validateRequest,
];

export const experienceIdValidation = idParamValidation;

export const createExperienceValidation = [
  requiredString('company', COMPANY_REQUIRED, COMPANY_MIN_LENGTH),
  requiredString('position', POSITION_REQUIRED, POSITION_MIN_LENGTH),
  body('employmentType')
    .notEmpty()
    .withMessage(EMPLOYMENT_TYPE_REQUIRED)
    .bail()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ max: 80 })
    .withMessage(FIELD_TOO_LONG),
  body('startDate').notEmpty().withMessage(START_DATE_REQUIRED).bail().isISO8601().withMessage(INVALID_DATE).toDate(),
  body('endDate').optional({ values: 'falsy' }).isISO8601().withMessage(INVALID_DATE).toDate(),
  ...commonExperienceValidation,
  validateRequest,
];

export const updateExperienceValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error(EXPERIENCE_UPDATE_REQUIRED);
    }

    return true;
  }),
  body('company')
    .optional()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage(COMPANY_MIN_LENGTH),
  body('position')
    .optional()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage(POSITION_MIN_LENGTH),
  body('employmentType')
    .optional()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ max: 80 })
    .withMessage(FIELD_TOO_LONG),
  body('startDate').optional().isISO8601().withMessage(INVALID_DATE).toDate(),
  body('endDate').optional({ values: 'falsy' }).isISO8601().withMessage(INVALID_DATE).toDate(),
  ...commonExperienceValidation,
  validateRequest,
];

export const deleteExperienceValidation = idParamValidation;

export const updateCurrentExperienceValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  body('currentlyWorking').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  validateRequest,
];
