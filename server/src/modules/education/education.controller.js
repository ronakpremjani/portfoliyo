import { CREATED, OK } from '../../constants/http-status.js';
import {
  EDUCATION_CREATED,
  EDUCATION_DELETED,
  EDUCATION_FETCHED,
  EDUCATION_LIST_FETCHED,
  EDUCATION_UPDATED,
} from '../../constants/messages.js';
import ApiResponse from '../../utils/ApiResponse.js';
import {
  createEducation,
  deleteEducation,
  getEducationById,
  getEducationList,
  updateEducation,
} from './education.service.js';

export const getEducationEntries = async (req, res) => {
  const education = await getEducationList(req.query);

  return res.status(OK).json(new ApiResponse(OK, EDUCATION_LIST_FETCHED, { education }));
};

export const getEducationDetails = async (req, res) => {
  const education = await getEducationById(req.params.id);

  return res.status(OK).json(new ApiResponse(OK, EDUCATION_FETCHED, { education }));
};

export const createEducationDetails = async (req, res) => {
  const education = await createEducation(req.body);

  return res.status(CREATED).json(new ApiResponse(CREATED, EDUCATION_CREATED, { education }));
};

export const updateEducationDetails = async (req, res) => {
  const education = await updateEducation(req.params.id, req.body);

  return res.status(OK).json(new ApiResponse(OK, EDUCATION_UPDATED, { education }));
};

export const deleteEducationDetails = async (req, res) => {
  const education = await deleteEducation(req.params.id);

  return res.status(OK).json(new ApiResponse(OK, EDUCATION_DELETED, { education }));
};
