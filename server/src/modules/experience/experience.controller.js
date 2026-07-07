import { CREATED, OK } from '../../constants/http-status.js';
import {
  EXPERIENCE_CREATED,
  EXPERIENCE_CURRENT_UPDATED,
  EXPERIENCE_DELETED,
  EXPERIENCE_FETCHED,
  EXPERIENCE_UPDATED,
  EXPERIENCES_FETCHED,
} from '../../constants/messages.js';
import ApiResponse from '../../utils/ApiResponse.js';
import {
  createExperience,
  deleteExperience,
  getExperienceById,
  getExperiences,
  updateCurrentExperienceStatus,
  updateExperience,
} from './experience.service.js';

export const getExperienceList = async (req, res) => {
  const experiences = await getExperiences(req.query);

  return res.status(OK).json(new ApiResponse(OK, EXPERIENCES_FETCHED, { experiences }));
};

export const getExperienceDetails = async (req, res) => {
  const experience = await getExperienceById(req.params.id);

  return res.status(OK).json(new ApiResponse(OK, EXPERIENCE_FETCHED, { experience }));
};

export const createExperienceDetails = async (req, res) => {
  const experience = await createExperience(req.body);

  return res.status(CREATED).json(new ApiResponse(CREATED, EXPERIENCE_CREATED, { experience }));
};

export const updateExperienceDetails = async (req, res) => {
  const experience = await updateExperience(req.params.id, req.body);

  return res.status(OK).json(new ApiResponse(OK, EXPERIENCE_UPDATED, { experience }));
};

export const deleteExperienceDetails = async (req, res) => {
  const experience = await deleteExperience(req.params.id);

  return res.status(OK).json(new ApiResponse(OK, EXPERIENCE_DELETED, { experience }));
};

export const updateCurrentExperienceDetails = async (req, res) => {
  const experience = await updateCurrentExperienceStatus(req.params.id, req.body.currentlyWorking);

  return res.status(OK).json(new ApiResponse(OK, EXPERIENCE_CURRENT_UPDATED, { experience }));
};
