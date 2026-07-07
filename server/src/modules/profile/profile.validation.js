import { body } from 'express-validator';

import {
  EMAIL_INVALID,
  FIELD_TOO_LONG,
  INVALID_ARRAY,
  INVALID_OBJECT,
  INVALID_STRING,
  INVALID_URL,
  INVALID_YEARS_OF_EXPERIENCE,
  PROFILE_IMAGE_REQUIRED,
  PROFILE_UPDATE_REQUIRED,
  RESUME_REQUIRED,
} from '../../constants/messages.js';
import validateRequest from '../../utils/validateRequest.js';

const maxLength = (field, length) =>
  body(field).optional().trim().isLength({ max: length }).withMessage(FIELD_TOO_LONG);

const optionalString = (field) =>
  body(field).optional().isString().withMessage(INVALID_STRING).trim();

const optionalAssetPath = (field) =>
  body(field)
    .optional()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage(FIELD_TOO_LONG);

const optionalUrl = (field) =>
  body(field)
    .optional({ values: 'falsy' })
    .trim()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage(INVALID_URL);

const socialLinkValidators = [
  body('socialLinks').optional().isObject().withMessage(INVALID_OBJECT),
  optionalUrl('socialLinks.website'),
  optionalUrl('socialLinks.github'),
  optionalUrl('socialLinks.linkedin'),
  optionalUrl('socialLinks.twitter'),
  optionalUrl('socialLinks.instagram'),
  optionalUrl('socialLinks.facebook'),
  optionalUrl('socialLinks.youtube'),
  optionalUrl('socialLinks.dribbble'),
  optionalUrl('socialLinks.behance'),
];

const seoValidators = [
  body('seo').optional().isObject().withMessage(INVALID_OBJECT),
  maxLength('seo.metaTitle', 70),
  maxLength('seo.metaDescription', 170),
  body('seo.keywords').optional().isArray().withMessage(INVALID_ARRAY),
  body('seo.keywords.*')
    .optional()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ max: 60 })
    .withMessage(FIELD_TOO_LONG),
  optionalUrl('seo.canonicalUrl'),
  optionalAssetPath('seo.ogImage'),
];

export const updateProfileValidation = [
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error(PROFILE_UPDATE_REQUIRED);
    }

    return true;
  }),
  maxLength('firstName', 80),
  maxLength('lastName', 80),
  maxLength('title', 120),
  maxLength('tagline', 180),
  maxLength('bio', 5000),
  body('email').optional({ values: 'falsy' }).trim().isEmail().withMessage(EMAIL_INVALID),
  maxLength('phone', 30),
  maxLength('location', 160),
  maxLength('availability', 120),
  body('yearsOfExperience')
    .optional()
    .isFloat({ min: 0, max: 80 })
    .withMessage(INVALID_YEARS_OF_EXPERIENCE)
    .toFloat(),
  optionalAssetPath('profileImage'),
  optionalAssetPath('coverImage'),
  optionalAssetPath('resume'),
  ...socialLinkValidators,
  ...seoValidators,
  validateRequest,
];

export const updateProfileImageValidation = [
  body().custom((value) => {
    if (!value.profileImage && !value.coverImage) {
      throw new Error(PROFILE_IMAGE_REQUIRED);
    }

    return true;
  }),
  optionalAssetPath('profileImage'),
  optionalAssetPath('coverImage'),
  validateRequest,
];

export const updateProfileResumeValidation = [
  body('resume')
    .notEmpty()
    .withMessage(RESUME_REQUIRED)
    .bail()
    .isString()
    .withMessage(INVALID_STRING)
    .bail()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage(FIELD_TOO_LONG),
  validateRequest,
];
