import mongoose from 'mongoose';

import { NOT_FOUND, SERVICE_UNAVAILABLE } from '../../constants/http-status.js';
import {
  DATABASE_CONNECTION_REQUIRED,
  PROFILE_NOT_FOUND,
} from '../../constants/messages.js';
import ApiError from '../../utils/ApiError.js';
import Profile from './profile.model.js';

const singletonQuery = Object.freeze({ singletonKey: 'profile' });

const profileFields = [
  'firstName',
  'lastName',
  'title',
  'tagline',
  'bio',
  'email',
  'phone',
  'location',
  'availability',
  'yearsOfExperience',
  'profileImage',
  'coverImage',
  'resume',
  'socialLinks',
  'seo',
];

const imageFields = ['profileImage', 'coverImage'];

const pickDefined = (payload, allowedFields) =>
  allowedFields.reduce((result, field) => {
    if (payload[field] !== undefined) {
      result[field] = payload[field];
    }

    return result;
  }, {});

const assertProfileExists = (profile) => {
  if (!profile) {
    throw new ApiError(NOT_FOUND, PROFILE_NOT_FOUND);
  }
};

const assertDatabaseConnected = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new ApiError(SERVICE_UNAVAILABLE, DATABASE_CONNECTION_REQUIRED);
  }
};

export const getProfile = async () => {
  assertDatabaseConnected();

  const profile = await Profile.findOne(singletonQuery);

  assertProfileExists(profile);

  return profile;
};

export const updateProfile = async (payload) => {
  assertDatabaseConnected();

  const profileData = pickDefined(payload, profileFields);

  return Profile.findOneAndUpdate(
    singletonQuery,
    {
      $set: profileData,
      $setOnInsert: singletonQuery,
    },
    {
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      upsert: true,
    },
  );
};

export const updateProfileImages = async (payload) => {
  assertDatabaseConnected();

  const imageData = pickDefined(payload, imageFields);

  return Profile.findOneAndUpdate(
    singletonQuery,
    {
      $set: imageData,
      $setOnInsert: singletonQuery,
    },
    {
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      upsert: true,
    },
  );
};

export const updateProfileResume = async (resume) => {
  assertDatabaseConnected();

  return Profile.findOneAndUpdate(
    singletonQuery,
    {
      $set: { resume },
      $setOnInsert: singletonQuery,
    },
    {
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      upsert: true,
    },
  );
};
