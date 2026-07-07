import { Types } from 'mongoose';

import {
  ADMIN_INACTIVE,
  ADMIN_NOT_FOUND,
  INVALID_CREDENTIALS,
  INVALID_TOKEN,
  REFRESH_TOKEN_REQUIRED,
} from '../../constants/messages.js';
import { UNAUTHORIZED } from '../../constants/http-status.js';
import ApiError from '../../utils/ApiError.js';
import Admin from './admin.model.js';
import {
  compareRefreshToken,
  decodeRefreshToken,
  generateAuthTokens,
  hashRefreshToken,
  verifyRefreshToken,
} from './auth.tokens.js';

const adminSelectFields = 'name email role isActive lastLogin createdAt updatedAt';

const sanitizeAdmin = (admin) => ({
  id: admin.id,
  name: admin.name,
  email: admin.email,
  role: admin.role,
  isActive: admin.isActive,
  lastLogin: admin.lastLogin,
  createdAt: admin.createdAt,
  updatedAt: admin.updatedAt,
});

const assertActiveAdmin = (admin) => {
  if (!admin) {
    throw new ApiError(UNAUTHORIZED, ADMIN_NOT_FOUND);
  }

  if (!admin.isActive) {
    throw new ApiError(UNAUTHORIZED, ADMIN_INACTIVE);
  }
};

export const loginAdmin = async ({ email, password }) => {
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(UNAUTHORIZED, INVALID_CREDENTIALS);
  }

  assertActiveAdmin(admin);

  const tokens = generateAuthTokens(admin);

  admin.refreshToken = await hashRefreshToken(tokens.refreshToken);
  admin.lastLogin = new Date();
  await admin.save();

  return {
    admin: sanitizeAdmin(admin),
    tokens,
  };
};

export const refreshAdminToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(UNAUTHORIZED, REFRESH_TOKEN_REQUIRED);
  }

  const payload = verifyRefreshToken(refreshToken);

  if (!Types.ObjectId.isValid(payload.sub)) {
    throw new ApiError(UNAUTHORIZED, INVALID_TOKEN);
  }

  const admin = await Admin.findById(payload.sub).select(`+refreshToken ${adminSelectFields}`);

  assertActiveAdmin(admin);

  const isRefreshTokenValid =
    admin.refreshToken && (await compareRefreshToken(refreshToken, admin.refreshToken));

  if (!isRefreshTokenValid) {
    admin.refreshToken = null;
    await admin.save({ validateModifiedOnly: true });
    throw new ApiError(UNAUTHORIZED, INVALID_TOKEN);
  }

  const tokens = generateAuthTokens(admin);

  admin.refreshToken = await hashRefreshToken(tokens.refreshToken);
  await admin.save({ validateModifiedOnly: true });

  return {
    admin: sanitizeAdmin(admin),
    tokens,
  };
};

export const logoutAdmin = async (refreshToken) => {
  if (!refreshToken) {
    return;
  }

  const decodedToken = decodeRefreshToken(refreshToken);

  if (!decodedToken || !Types.ObjectId.isValid(decodedToken.sub)) {
    return;
  }

  const admin = await Admin.findById(decodedToken.sub).select('+refreshToken');

  if (!admin?.refreshToken || !(await compareRefreshToken(refreshToken, admin.refreshToken))) {
    return;
  }

  admin.refreshToken = null;
  await admin.save({ validateModifiedOnly: true });
};

export const getAdminById = async (adminId) => {
  if (!Types.ObjectId.isValid(adminId)) {
    throw new ApiError(UNAUTHORIZED, INVALID_TOKEN);
  }

  const admin = await Admin.findById(adminId).select(adminSelectFields);

  assertActiveAdmin(admin);

  return admin;
};

export const getCurrentAdmin = async (admin) => {
  return sanitizeAdmin(admin);
};
