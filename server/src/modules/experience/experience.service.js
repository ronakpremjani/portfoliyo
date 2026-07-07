import mongoose, { Types } from 'mongoose';

import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVICE_UNAVAILABLE,
} from '../../constants/http-status.js';
import {
  DATABASE_CONNECTION_REQUIRED,
  EXPERIENCE_NOT_FOUND,
  INVALID_OBJECT_ID,
} from '../../constants/messages.js';
import ApiError from '../../utils/ApiError.js';
import Experience from './experience.model.js';

const experienceFields = [
  'company',
  'position',
  'employmentType',
  'location',
  'startDate',
  'endDate',
  'currentlyWorking',
  'description',
  'technologies',
  'companyLogo',
  'displayOrder',
];

const sortOptions = Object.freeze({
  displayOrder: { displayOrder: 1, startDate: -1 },
  latest: { startDate: -1, createdAt: -1 },
  oldest: { startDate: 1, createdAt: 1 },
  company: { company: 1, startDate: -1 },
  current: { currentlyWorking: -1, displayOrder: 1, startDate: -1 },
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

const assertExperienceExists = (experience) => {
  if (!experience) {
    throw new ApiError(NOT_FOUND, EXPERIENCE_NOT_FOUND);
  }
};

const pickDefined = (payload, allowedFields) =>
  allowedFields.reduce((result, field) => {
    if (payload[field] !== undefined) {
      result[field] = payload[field];
    }

    return result;
  }, {});

const normalizeExperiencePayload = (payload) => {
  const experienceData = pickDefined(payload, experienceFields);

  if (experienceData.currentlyWorking === true) {
    experienceData.endDate = null;
  }

  return experienceData;
};

const buildQuery = (filters) => {
  const query = {};

  if (filters.currentlyWorking !== undefined) {
    query.currentlyWorking = filters.currentlyWorking;
  }

  return query;
};

const getSortOption = (sort) => sortOptions[sort] || sortOptions.displayOrder;

export const getExperiences = async (filters) => {
  assertDatabaseConnected();

  return Experience.find(buildQuery(filters)).sort(getSortOption(filters.sort));
};

export const getExperienceById = async (experienceId) => {
  assertDatabaseConnected();
  assertValidObjectId(experienceId);

  const experience = await Experience.findById(experienceId);

  assertExperienceExists(experience);

  return experience;
};

export const createExperience = async (payload) => {
  assertDatabaseConnected();

  return Experience.create(normalizeExperiencePayload(payload));
};

export const updateExperience = async (experienceId, payload) => {
  assertDatabaseConnected();
  assertValidObjectId(experienceId);

  const experience = await Experience.findByIdAndUpdate(
    experienceId,
    {
      $set: normalizeExperiencePayload(payload),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  assertExperienceExists(experience);

  return experience;
};

export const deleteExperience = async (experienceId) => {
  assertDatabaseConnected();
  assertValidObjectId(experienceId);

  const experience = await Experience.findByIdAndDelete(experienceId);

  assertExperienceExists(experience);

  return experience;
};

export const updateCurrentExperienceStatus = async (experienceId, currentlyWorking) => {
  assertDatabaseConnected();
  assertValidObjectId(experienceId);

  const experience = await Experience.findById(experienceId);

  assertExperienceExists(experience);

  experience.currentlyWorking = currentlyWorking ?? !experience.currentlyWorking;

  if (experience.currentlyWorking) {
    experience.endDate = null;
  }

  await experience.save({ validateModifiedOnly: true });

  return experience;
};
