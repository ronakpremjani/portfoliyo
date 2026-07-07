import { Router } from 'express';

import { ADMIN, SUPER_ADMIN } from '../../constants/roles.js';
import { authenticate, authorizeRoles } from '../auth/index.js';
import catchAsync from '../../utils/catchAsync.js';
import {
  createExperienceDetails,
  deleteExperienceDetails,
  getExperienceDetails,
  getExperienceList,
  updateCurrentExperienceDetails,
  updateExperienceDetails,
} from './experience.controller.js';
import {
  createExperienceValidation,
  deleteExperienceValidation,
  experienceIdValidation,
  listExperiencesValidation,
  updateCurrentExperienceValidation,
  updateExperienceValidation,
} from './experience.validation.js';

const router = Router();
const adminOnly = [authenticate, authorizeRoles(ADMIN, SUPER_ADMIN)];

router.get('/', listExperiencesValidation, catchAsync(getExperienceList));
router.post('/', ...adminOnly, createExperienceValidation, catchAsync(createExperienceDetails));
router.get('/:id', experienceIdValidation, catchAsync(getExperienceDetails));
router.put('/:id', ...adminOnly, updateExperienceValidation, catchAsync(updateExperienceDetails));
router.delete('/:id', ...adminOnly, deleteExperienceValidation, catchAsync(deleteExperienceDetails));
router.patch('/:id/current', ...adminOnly, updateCurrentExperienceValidation, catchAsync(updateCurrentExperienceDetails));

export default router;
