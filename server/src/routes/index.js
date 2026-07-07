import { Router } from 'express';

import authRoutes from '../modules/auth/index.js';
import healthRoutes from '../modules/health/health.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/v1/auth', authRoutes);

export default router;
