import { Router } from 'express';

import { getHealth } from './health.controller.js';
import catchAsync from '../../utils/catchAsync.js';

const router = Router();

router.get('/', catchAsync(getHealth));

export default router;
