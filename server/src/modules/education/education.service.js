import mongoose, { Types } from 'mongoose';

import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVICE_UNAVAILABLE,
} from '../../constants/http-status.js';
import {
  DATABASE_CONNECTION_REQUIRED,
  EDUCATION_NOT_FOUND,
  INVALID_OBJECT_ID,
} from '../../constants/messages.js';
import ApiError from '../../utils/ApiError.js';
import Education from './education.model.js';

const educationFields = [
  'institution',
  'degree',
  'fieldOfStudy',
  'startDate',
  'endDate',
  'grade',
  'description',
  'logo',
  'displayOrder',
];

const sortOptions = Object.freeze({
  displayOrder: { displayOrder: 1, startDate: -1 },
  latest: { startDate: -1, createdAt: -1 },
  oldest: { startDate: 1, createdAt: 1 },
  institution: { institution: 1, startDate: -1 },
});

const assertDatabaseConnected = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new ApiError(SERVICE_UNAVAILABLE, DATABASE_CONNECTION_REQUIRED);
  }
};

const assertValidObjectId = (id) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(BAD_REQUEST, INVALID_OBJECT_ID);
  }
};

const assertEducationExists = (education) => {
  if (!education) {
    throw new ApiError(NOT_FOUND, EDUCATION_NOT_FOUND);
  }
};

const pickDefined = (payload, allowedFields) =>
  allowedFields.reduce((result, field) => {
    if (payload[field] !== undefined) {
      result[field] = payload[field];
    }

    return result;
  }, {});

const getSortOption = (sort) => sortOptions[sort] || sortOptions.displayOrder;

export const getEducationList = async (filters) => {
  assertDatabaseConnected();

  return Education.find({}).sort(getSortOption(filters.sort));
};

export const getEducationById = async (educationId) => {
  assertDatabaseConnected();
  assertValidObjectId(educationId);

  const education = await Education.findById(educationId);

  assertEducationExists(education);

  return education;
};

export const createEducation = async (payload) => {
  assertDatabaseConnected();

  return Education.create(pickDefined(payload, educationFields));
};

export const updateEducation = async (educationId, payload) => {
  assertDatabaseConnected();
  assertValidObjectId(educationId);

  const education = await Education.findByIdAndUpdate(
    educationId,
    {
      $set: pickDefined(payload, educationFields),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  assertEducationExists(education);

  return education;
};

export const deleteEducation = async (educationId) => {
  assertDatabaseConnected();
  assertValidObjectId(educationId);

  const education = await Education.findByIdAndDelete(educationId);

  assertEducationExists(education);

  return education;
};
