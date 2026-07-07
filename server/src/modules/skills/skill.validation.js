import { body, param, query } from 'express-validator';

import {
  FIELD_TOO_LONG,
  INVALID_BOOLEAN,
  INVALID_NUMBER,
  INVALID_OBJECT_ID,
  INVALID_PROFICIENCY,
  INVALID_SKILL_CATEGORY,
  INVALID_STRING,
  SKILL_NAME_MIN_LENGTH,
  SKILL_NAME_REQUIRED,
  SKILL_UPDATE_REQUIRED,
} from '../../constants/messages.js';
import validateRequest from '../../utils/validateRequest.js';
import { SKILL_CATEGORIES } from './skill.model.js';

const requiredSkillName = body('name')
  .notEmpty()
  .withMessage(SKILL_NAME_REQUIRED)
  .bail()
  .isString()
  .withMessage(INVALID_STRING)
  .bail()
  .trim()
  .isLength({ min: 2, max: 80 })
  .withMessage(SKILL_NAME_MIN_LENGTH);

const optionalSkillName = body('name')
  .optional()
  .isString()
  .withMessage(INVALID_STRING)
  .bail()
  .trim()
  .isLength({ min: 2, max: 80 })
  .withMessage(SKILL_NAME_MIN_LENGTH);

const skillPayloadValidation = [
  body('icon')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ max: 500 })
    .withMessage(FIELD_TOO_LONG),
  body('category').isIn(SKILL_CATEGORIES).withMessage(INVALID_SKILL_CATEGORY),
  body('proficiency')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage(INVALID_PROFICIENCY)
    .toFloat(),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage(INVALID_NUMBER)
    .toInt(),
  body('isVisible').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
];

const optionalSkillPayloadValidation = [
  body('icon')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ max: 500 })
    .withMessage(FIELD_TOO_LONG),
  body('category').optional().isIn(SKILL_CATEGORIES).withMessage(INVALID_SKILL_CATEGORY),
  body('proficiency')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage(INVALID_PROFICIENCY)
    .toFloat(),
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

export const listSkillsValidation = [
  query('category').optional().isIn(SKILL_CATEGORIES).withMessage(INVALID_SKILL_CATEGORY),
  validateRequest,
];

export const skillIdValidation = idParamValidation;

export const createSkillValidation = [
  requiredSkillName,
  ...skillPayloadValidation,
  validateRequest,
];

export const updateSkillValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error(SKILL_UPDATE_REQUIRED);
    }

    return true;
  }),
  optionalSkillName,
  ...optionalSkillPayloadValidation,
  validateRequest,
];

export const deleteSkillValidation = idParamValidation;

export const updateSkillVisibilityValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  body('isVisible').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  validateRequest,
];
