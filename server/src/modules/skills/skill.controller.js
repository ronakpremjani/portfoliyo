import { CREATED, OK } from '../../constants/http-status.js';
import {
  SKILL_CREATED,
  SKILL_DELETED,
  SKILL_FETCHED,
  SKILL_UPDATED,
  SKILL_VISIBILITY_UPDATED,
  SKILLS_FETCHED,
} from '../../constants/messages.js';
import ApiResponse from '../../utils/ApiResponse.js';
import {
  createSkill,
  deleteSkill,
  getSkillById,
  getSkills,
  updateSkill,
  updateSkillVisibility,
} from './skill.service.js';

export const getSkillList = async (req, res) => {
  const skills = await getSkills(req.query);

  return res.status(OK).json(new ApiResponse(OK, SKILLS_FETCHED, { skills }));
};

export const getSkillDetails = async (req, res) => {
  const skill = await getSkillById(req.params.id);

  return res.status(OK).json(new ApiResponse(OK, SKILL_FETCHED, { skill }));
};

export const createSkillDetails = async (req, res) => {
  const skill = await createSkill(req.body);

  return res.status(CREATED).json(new ApiResponse(CREATED, SKILL_CREATED, { skill }));
};

export const updateSkillDetails = async (req, res) => {
  const skill = await updateSkill(req.params.id, req.body);

  return res.status(OK).json(new ApiResponse(OK, SKILL_UPDATED, { skill }));
};

export const deleteSkillDetails = async (req, res) => {
  const skill = await deleteSkill(req.params.id);

  return res.status(OK).json(new ApiResponse(OK, SKILL_DELETED, { skill }));
};

export const updateSkillVisibilityDetails = async (req, res) => {
  const skill = await updateSkillVisibility(req.params.id, req.body.isVisible);

  return res.status(OK).json(new ApiResponse(OK, SKILL_VISIBILITY_UPDATED, { skill }));
};
