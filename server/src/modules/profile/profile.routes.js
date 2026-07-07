import { Router } from 'express';

import { ADMIN, SUPER_ADMIN } from '../../constants/roles.js';
import { authenticate, authorizeRoles } from '../auth/index.js';
import catchAsync from '../../utils/catchAsync.js';
import {
  getPublicProfile,
  updateProfileDetails,
  updateProfileImageAssets,
  updateProfileResumeAsset,
} from './profile.controller.js';
import {
  updateProfileImageValidation,
  updateProfileResumeValidation,
  updateProfileValidation,
} from './profile.validation.js';

const router = Router();
const adminOnly = [authenticate, authorizeRoles(ADMIN, SUPER_ADMIN)];

router.get('/', catchAsync(getPublicProfile));
router.put('/', ...adminOnly, updateProfileValidation, catchAsync(updateProfileDetails));
router.post('/image', ...adminOnly, updateProfileImageValidation, catchAsync(updateProfileImageAssets));
router.post('/resume', ...adminOnly, updateProfileResumeValidation, catchAsync(updateProfileResumeAsset));

export default router;
