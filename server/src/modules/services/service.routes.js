import { Router } from 'express';

import { ADMIN, SUPER_ADMIN } from '../../constants/roles.js';
import { authenticate, authorizeRoles } from '../auth/index.js';
import catchAsync from '../../utils/catchAsync.js';
import {
  createServiceDetails,
  deleteServiceDetails,
  getServiceDetails,
  getServiceList,
  updateServiceDetails,
  updateServiceVisibilityDetails,
} from './service.controller.js';
import {
  createServiceValidation,
  deleteServiceValidation,
  listServicesValidation,
  serviceIdValidation,
  updateServiceValidation,
  updateServiceVisibilityValidation,
} from './service.validation.js';

const router = Router();
const adminOnly = [authenticate, authorizeRoles(ADMIN, SUPER_ADMIN)];

router.get('/', listServicesValidation, catchAsync(getServiceList));
router.post('/', ...adminOnly, createServiceValidation, catchAsync(createServiceDetails));
router.get('/:id', serviceIdValidation, catchAsync(getServiceDetails));
router.put('/:id', ...adminOnly, updateServiceValidation, catchAsync(updateServiceDetails));
router.delete('/:id', ...adminOnly, deleteServiceValidation, catchAsync(deleteServiceDetails));
router.patch('/:id/visibility', ...adminOnly, updateServiceVisibilityValidation, catchAsync(updateServiceVisibilityDetails));

export default router;
