import { Router } from 'express';

import { ADMIN, SUPER_ADMIN } from '../../constants/roles.js';
import { authenticate, authorizeRoles } from '../auth/index.js';
import catchAsync from '../../utils/catchAsync.js';
import {
  createProjectDetails,
  deleteProjectDetails,
  getProjectDetails,
  getProjectList,
  updateProjectDetails,
  updateProjectFeaturedDetails,
  updateProjectPublishDetails,
} from './project.controller.js';
import {
  createProjectValidation,
  deleteProjectValidation,
  featureProjectValidation,
  listProjectsValidation,
  publishProjectValidation,
  slugParamValidation,
  updateProjectValidation,
} from './project.validation.js';

const router = Router();
const adminOnly = [authenticate, authorizeRoles(ADMIN, SUPER_ADMIN)];

router.get('/', listProjectsValidation, catchAsync(getProjectList));
router.post('/', ...adminOnly, createProjectValidation, catchAsync(createProjectDetails));
router.put('/:id', ...adminOnly, updateProjectValidation, catchAsync(updateProjectDetails));
router.delete('/:id', ...adminOnly, deleteProjectValidation, catchAsync(deleteProjectDetails));
router.patch('/:id/publish', ...adminOnly, publishProjectValidation, catchAsync(updateProjectPublishDetails));
router.patch('/:id/feature', ...adminOnly, featureProjectValidation, catchAsync(updateProjectFeaturedDetails));
router.get('/:slug', slugParamValidation, catchAsync(getProjectDetails));

export default router;
