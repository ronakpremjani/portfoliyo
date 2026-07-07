import { Router } from 'express';

import { ADMIN, SUPER_ADMIN } from '../../constants/roles.js';
import { authenticate, authorizeRoles } from '../auth/index.js';
import catchAsync from '../../utils/catchAsync.js';
import {
  createSkillDetails,
  deleteSkillDetails,
  getSkillDetails,
  getSkillList,
  updateSkillDetails,
  updateSkillVisibilityDetails,
} from './skill.controller.js';
import {
  createSkillValidation,
  deleteSkillValidation,
  listSkillsValidation,
  skillIdValidation,
  updateSkillValidation,
  updateSkillVisibilityValidation,
} from './skill.validation.js';

const router = Router();
const adminOnly = [authenticate, authorizeRoles(ADMIN, SUPER_ADMIN)];

router.get('/', listSkillsValidation, catchAsync(getSkillList));
router.post('/', ...adminOnly, createSkillValidation, catchAsync(createSkillDetails));
router.get('/:id', skillIdValidation, catchAsync(getSkillDetails));
router.put('/:id', ...adminOnly, updateSkillValidation, catchAsync(updateSkillDetails));
router.delete('/:id', ...adminOnly, deleteSkillValidation, catchAsync(deleteSkillDetails));
router.patch('/:id/visibility', ...adminOnly, updateSkillVisibilityValidation, catchAsync(updateSkillVisibilityDetails));

export default router;
