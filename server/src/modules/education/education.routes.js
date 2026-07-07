import { Router } from 'express';

import { ADMIN, SUPER_ADMIN } from '../../constants/roles.js';
import { authenticate, authorizeRoles } from '../auth/index.js';
import catchAsync from '../../utils/catchAsync.js';
import {
  createEducationDetails,
  deleteEducationDetails,
  getEducationDetails,
  getEducationEntries,
  updateEducationDetails,
} from './education.controller.js';
import {
  createEducationValidation,
  deleteEducationValidation,
  educationIdValidation,
  listEducationValidation,
  updateEducationValidation,
} from './education.validation.js';

const router = Router();
const adminOnly = [authenticate, authorizeRoles(ADMIN, SUPER_ADMIN)];

router.get('/', listEducationValidation, catchAsync(getEducationEntries));
router.post('/', ...adminOnly, createEducationValidation, catchAsync(createEducationDetails));
router.get('/:id', educationIdValidation, catchAsync(getEducationDetails));
router.put('/:id', ...adminOnly, updateEducationValidation, catchAsync(updateEducationDetails));
router.delete('/:id', ...adminOnly, deleteEducationValidation, catchAsync(deleteEducationDetails));

export default router;
