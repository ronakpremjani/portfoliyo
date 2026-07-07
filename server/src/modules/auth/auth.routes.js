import { Router } from 'express';

import { ADMIN, SUPER_ADMIN } from '../../constants/roles.js';
import catchAsync from '../../utils/catchAsync.js';
import { login, logout, me, refresh } from './auth.controller.js';
import { authenticate, authorizeRoles } from './auth.middleware.js';
import { loginValidation } from './auth.validation.js';

const router = Router();

router.post('/login', loginValidation, catchAsync(login));
router.post('/logout', catchAsync(logout));
router.post('/refresh', catchAsync(refresh));
router.get('/me', authenticate, authorizeRoles(ADMIN, SUPER_ADMIN), catchAsync(me));

export default router;
