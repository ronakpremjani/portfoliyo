import { Router } from 'express';

import authRoutes from '../modules/auth/index.js';
import contactRoutes from '../modules/contact/index.js';
import educationRoutes from '../modules/education/index.js';
import experienceRoutes from '../modules/experience/index.js';
import healthRoutes from '../modules/health/health.routes.js';
import profileRoutes from '../modules/profile/index.js';
import projectRoutes from '../modules/projects/index.js';
import serviceRoutes from '../modules/services/index.js';
import skillRoutes from '../modules/skills/index.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/contact', contactRoutes);
router.use('/v1/auth', authRoutes);
router.use('/v1/profile', profileRoutes);
router.use('/v1/projects', projectRoutes);
router.use('/v1/services', serviceRoutes);
router.use('/v1/skills', skillRoutes);
router.use('/v1/experience', experienceRoutes);
router.use('/v1/education', educationRoutes);

export default router;
