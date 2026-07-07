import { FORBIDDEN, UNAUTHORIZED } from '../../constants/http-status.js';
import {
  ACCESS_TOKEN_REQUIRED,
  FORBIDDEN_RESOURCE,
} from '../../constants/messages.js';
import ApiError from '../../utils/ApiError.js';
import catchAsync from '../../utils/catchAsync.js';
import { getAdminById } from './auth.service.js';
import { getAccessTokenFromRequest, verifyAccessToken } from './auth.tokens.js';

export const authenticate = catchAsync(async (req, res, next) => {
  const token = getAccessTokenFromRequest(req);

  if (!token) {
    throw new ApiError(UNAUTHORIZED, ACCESS_TOKEN_REQUIRED);
  }

  const payload = verifyAccessToken(token);
  const admin = await getAdminById(payload.sub);

  req.admin = admin;
  next();
});

export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      next(new ApiError(FORBIDDEN, FORBIDDEN_RESOURCE));
      return;
    }

    next();
  };
