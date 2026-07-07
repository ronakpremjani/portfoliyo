import { CREATED, OK } from '../../constants/http-status.js';
import {
  PROJECT_CREATED,
  PROJECT_DELETED,
  PROJECT_FEATURED,
  PROJECT_FETCHED,
  PROJECT_PUBLISHED,
  PROJECT_UPDATED,
  PROJECTS_FETCHED,
} from '../../constants/messages.js';
import ApiResponse from '../../utils/ApiResponse.js';
import {
  createProject,
  deleteProject,
  getProjectBySlug,
  getProjects,
  updateProject,
  updateProjectFeaturedStatus,
  updateProjectPublishStatus,
} from './project.service.js';

export const getProjectList = async (req, res) => {
  const result = await getProjects(req.query);

  return res.status(OK).json(new ApiResponse(OK, PROJECTS_FETCHED, result));
};

export const getProjectDetails = async (req, res) => {
  const project = await getProjectBySlug(req.params.slug);

  return res.status(OK).json(new ApiResponse(OK, PROJECT_FETCHED, { project }));
};

export const createProjectDetails = async (req, res) => {
  const project = await createProject(req.body);

  return res.status(CREATED).json(new ApiResponse(CREATED, PROJECT_CREATED, { project }));
};

export const updateProjectDetails = async (req, res) => {
  const project = await updateProject(req.params.id, req.body);

  return res.status(OK).json(new ApiResponse(OK, PROJECT_UPDATED, { project }));
};

export const deleteProjectDetails = async (req, res) => {
  const project = await deleteProject(req.params.id);

  return res.status(OK).json(new ApiResponse(OK, PROJECT_DELETED, { project }));
};

export const updateProjectPublishDetails = async (req, res) => {
  const project = await updateProjectPublishStatus(req.params.id, req.body.isPublished);

  return res.status(OK).json(new ApiResponse(OK, PROJECT_PUBLISHED, { project }));
};

export const updateProjectFeaturedDetails = async (req, res) => {
  const project = await updateProjectFeaturedStatus(req.params.id, req.body.featured);

  return res.status(OK).json(new ApiResponse(OK, PROJECT_FEATURED, { project }));
};
