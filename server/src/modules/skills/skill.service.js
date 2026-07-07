import mongoose, { Types } from 'mongoose';

import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVICE_UNAVAILABLE,
} from '../../constants/http-status.js';
import {
  DATABASE_CONNECTION_REQUIRED,
  INVALID_OBJECT_ID,
  SKILL_NOT_FOUND,
} from '../../constants/messages.js';
import ApiError from '../../utils/ApiError.js';
import Skill from './skill.model.js';

const skillFields = [
  'name',
  'icon',
  'category',
  'proficiency',
  'displayOrder',
  'isVisible',
];

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

const assertSkillExists = (skill) => {
  if (!skill) {
    throw new ApiError(NOT_FOUND, SKILL_NOT_FOUND);
  }
};

const pickDefined = (payload, allowedFields) =>
  allowedFields.reduce((result, field) => {
    if (payload[field] !== undefined) {
      result[field] = payload[field];
    }

    return result;
  }, {});

const buildPublicQuery = (filters) => {
  const query = { isVisible: true };

  if (filters.category) {
    query.category = filters.category;
  }

  return query;
};

export const getSkills = async (filters) => {
  assertDatabaseConnected();

  return Skill.find(buildPublicQuery(filters)).sort({ displayOrder: 1, name: 1 });
};

export const getSkillById = async (skillId) => {
  assertDatabaseConnected();
  assertValidObjectId(skillId);

  const skill = await Skill.findOne({ _id: skillId, isVisible: true });

  assertSkillExists(skill);

  return skill;
};

export const createSkill = async (payload) => {
  assertDatabaseConnected();

  const skillData = pickDefined(payload, skillFields);

  return Skill.create(skillData);
};

export const updateSkill = async (skillId, payload) => {
  assertDatabaseConnected();
  assertValidObjectId(skillId);

  const skill = await Skill.findByIdAndUpdate(
    skillId,
    {
      $set: pickDefined(payload, skillFields),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  assertSkillExists(skill);

  return skill;
};

export const deleteSkill = async (skillId) => {
  assertDatabaseConnected();
  assertValidObjectId(skillId);

  const skill = await Skill.findByIdAndDelete(skillId);

  assertSkillExists(skill);

  return skill;
};

export const updateSkillVisibility = async (skillId, isVisible) => {
  assertDatabaseConnected();
  assertValidObjectId(skillId);

  const skill = await Skill.findById(skillId);

  assertSkillExists(skill);

  skill.isVisible = isVisible ?? !skill.isVisible;

  await skill.save({ validateModifiedOnly: true });

  return skill;
};
