import { Router } from 'express';

import { ADMIN, SUPER_ADMIN } from '../../constants/roles.js';
import { authenticate, authorizeRoles } from '../auth/index.js';
import catchAsync from '../../utils/catchAsync.js';
import {
  deleteContactMessageDetails,
  getContactMessageList,
  markContactMessageAsRead,
  submitContactMessage,
} from './contact.controller.js';
import {
  deleteContactMessageValidation,
  listContactMessagesValidation,
  markContactMessageReadValidation,
  submitContactValidation,
} from './contact.validation.js';

const router = Router();
const adminOnly = [authenticate, authorizeRoles(ADMIN, SUPER_ADMIN)];

router.post('/', submitContactValidation, catchAsync(submitContactMessage));
router.get('/', ...adminOnly, listContactMessagesValidation, catchAsync(getContactMessageList));
router.patch('/:id/read', ...adminOnly, markContactMessageReadValidation, catchAsync(markContactMessageAsRead));
router.delete('/:id', ...adminOnly, deleteContactMessageValidation, catchAsync(deleteContactMessageDetails));

export default router;
