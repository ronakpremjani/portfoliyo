import { body, param, query } from 'express-validator';

import {
  DESCRIPTION_REQUIRED,
  FIELD_TOO_LONG,
  INVALID_ARRAY,
  INVALID_BOOLEAN,
  INVALID_DATE,
  INVALID_NUMBER,
  INVALID_OBJECT_ID,
  INVALID_PROJECT_CATEGORY,
  INVALID_PROJECT_STATUS,
  INVALID_SLUG,
  INVALID_SORT,
  INVALID_STRING,
  INVALID_URL,
  PROJECT_UPDATE_REQUIRED,
  TITLE_MIN_LENGTH,
  TITLE_REQUIRED,
} from '../../constants/messages.js';
import validateRequest from '../../utils/validateRequest.js';
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from './project.model.js';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const sortValues = ['latest', 'oldest', 'displayOrder', 'title', 'featured'];

const requiredString = (field, message) =>
  body(field)
    .notEmpty()
    .withMessage(message)
    .bail()
    .isString()
    .withMessage(INVALID_STRING)
    .trim();

const optionalString = (field, maxLength) =>
  body(field)
    .optional()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ max: maxLength })
    .withMessage(FIELD_TOO_LONG);

const optionalUrl = (field) =>
  body(field)
    .optional({ values: 'falsy' })
    .trim()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage(INVALID_URL);

const optionalAssetPath = (field) =>
  body(field)
    .optional({ values: 'falsy' })
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ max: 500 })
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

const idParamValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  validateRequest,
];

const projectPayloadValidation = [
  optionalString('shortDescription', 240),
  optionalAssetPath('coverImage'),
  ...optionalStringArray('galleryImages'),
  ...optionalStringArray('technologies'),
  ...optionalStringArray('features'),
  optionalUrl('githubUrl'),
  optionalUrl('liveUrl'),
  optionalUrl('caseStudyUrl'),
  body('category')
    .optional()
    .isIn(PROJECT_CATEGORIES)
    .withMessage(INVALID_PROJECT_CATEGORY),
  body('status')
    .optional()
    .isIn(PROJECT_STATUSES)
    .withMessage(INVALID_PROJECT_STATUS),
  body('featured').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage(INVALID_NUMBER)
    .toInt(),
  body('isPublished').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  body('startDate').optional({ values: 'falsy' }).isISO8601().withMessage(INVALID_DATE).toDate(),
  body('endDate').optional({ values: 'falsy' }).isISO8601().withMessage(INVALID_DATE).toDate(),
];

export const listProjectsValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage(INVALID_NUMBER).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage(INVALID_NUMBER).toInt(),
  query('search').optional().trim().isLength({ max: 120 }).withMessage(FIELD_TOO_LONG),
  query('sort').optional().isIn(sortValues).withMessage(INVALID_SORT),
  query('featured').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  query('category').optional().isIn(PROJECT_CATEGORIES).withMessage(INVALID_PROJECT_CATEGORY),
  query('isPublished').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  query('published').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  validateRequest,
  (req, res, next) => {
    if (req.query.published !== undefined && req.query.isPublished === undefined) {
      req.query.isPublished = req.query.published;
    }

    next();
  },
];

export const slugParamValidation = [
  param('slug').matches(slugPattern).withMessage(INVALID_SLUG),
  validateRequest,
];

export const createProjectValidation = [
  requiredString('title', TITLE_REQUIRED).isLength({ min: 3, max: 140 }).withMessage(TITLE_MIN_LENGTH),
  body('slug').optional({ values: 'falsy' }).trim().matches(slugPattern).withMessage(INVALID_SLUG),
  requiredString('description', DESCRIPTION_REQUIRED)
    .isLength({ min: 10, max: 10000 })
    .withMessage(FIELD_TOO_LONG),
  ...projectPayloadValidation,
  validateRequest,
];

export const updateProjectValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error(PROJECT_UPDATE_REQUIRED);
    }

    return true;
  }),
  body('title').optional().isString().withMessage(INVALID_STRING).bail().trim().isLength({ min: 3, max: 140 }).withMessage(TITLE_MIN_LENGTH),
  body('slug').optional({ values: 'falsy' }).trim().matches(slugPattern).withMessage(INVALID_SLUG),
  body('description')
    .optional()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 10, max: 10000 })
    .withMessage(FIELD_TOO_LONG),
  ...projectPayloadValidation,
  validateRequest,
];

export const deleteProjectValidation = idParamValidation;

export const publishProjectValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  body('isPublished').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  validateRequest,
];

export const featureProjectValidation = [
  param('id').isMongoId().withMessage(INVALID_OBJECT_ID),
  body('featured').optional().isBoolean().withMessage(INVALID_BOOLEAN).toBoolean(),
  validateRequest,
];
