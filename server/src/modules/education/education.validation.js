import { body, param, query } from 'express-validator';

import {
  DEGREE_MIN_LENGTH,
  DEGREE_REQUIRED,
  EDUCATION_UPDATE_REQUIRED,
  END_DATE_AFTER_START_DATE,
  FIELD_OF_STUDY_MIN_LENGTH,
  FIELD_OF_STUDY_REQUIRED,
  FIELD_TOO_LONG,
  INSTITUTION_MIN_LENGTH,
  INSTITUTION_REQUIRED,
  INVALID_DATE,
  INVALID_NUMBER,
  INVALID_OBJECT_ID,
  INVALID_SORT,
  INVALID_STRING,
  START_DATE_REQUIRED,
} from '../../constants/messages.js';
import validateRequest from '../../utils/validateRequest.js';

const sortValues = ['displayOrder', 'latest', 'oldest', 'institution'];

const requiredString = (field, requiredMessage, lengthMessage) =>
  body(field)
    .notEmpty()
    .withMessage(requiredMessage)
    .bail()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 2, max: 140 })
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

const dateOrderValidation = body('endDate').custom((endDate, { req }) => {
  if (!endDate) {
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

const commonEducationValidation = [
  body('endDate').optional({ values: 'falsy' }).isISO8601().withMessage(INVALID_DATE).toDate(),
  optionalString('grade', 80),
  optionalString('description', 5000),
  optionalString('logo', 500),
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

export const listEducationValidation = [
  query('sort').optional().isIn(sortValues).withMessage(INVALID_SORT),
  validateRequest,
];

export const educationIdValidation = idParamValidation;

export const createEducationValidation = [
  requiredString('institution', INSTITUTION_REQUIRED, INSTITUTION_MIN_LENGTH),
  requiredString('degree', DEGREE_REQUIRED, DEGREE_MIN_LENGTH),
  requiredString('fieldOfStudy', FIELD_OF_STUDY_REQUIRED, FIELD_OF_STUDY_MIN_LENGTH),
  body('startDate').notEmpty().withMessage(START_DATE_REQUIRED).bail().isISO8601().withMessage(INVALID_DATE).toDate(),
  ...commonEducationValidation,
  validateRequest,
];

export const updateEducationValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error(EDUCATION_UPDATE_REQUIRED);
    }

    return true;
  }),
  body('institution')
    .optional()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 2, max: 140 })
    .withMessage(INSTITUTION_MIN_LENGTH),
  body('degree')
    .optional()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 2, max: 140 })
    .withMessage(DEGREE_MIN_LENGTH),
  body('fieldOfStudy')
    .optional()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 2, max: 140 })
    .withMessage(FIELD_OF_STUDY_MIN_LENGTH),
  body('startDate').optional().isISO8601().withMessage(INVALID_DATE).toDate(),
  ...commonEducationValidation,
  validateRequest,
];

export const deleteEducationValidation = idParamValidation;
