import { OK } from '../../constants/http-status.js';
import {
  ADMIN_PROFILE_FETCHED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  TOKEN_REFRESHED,
} from '../../constants/messages.js';
import ApiResponse from '../../utils/ApiResponse.js';
import {
  clearAuthCookies,
  getRefreshTokenFromRequest,
  setAuthCookies,
} from './auth.tokens.js';
import {
  getCurrentAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
} from './auth.service.js';

export const login = async (req, res) => {
  const result = await loginAdmin(req.body);

  setAuthCookies(res, result.tokens);

  return res.status(OK).json(new ApiResponse(OK, LOGIN_SUCCESS, { admin: result.admin }));
};

export const logout = async (req, res) => {
  await logoutAdmin(getRefreshTokenFromRequest(req));

  clearAuthCookies(res);

  return res.status(OK).json(new ApiResponse(OK, LOGOUT_SUCCESS));
};

export const refresh = async (req, res) => {
  const result = await refreshAdminToken(getRefreshTokenFromRequest(req));

  setAuthCookies(res, result.tokens);

  return res.status(OK).json(new ApiResponse(OK, TOKEN_REFRESHED, { admin: result.admin }));
};

export const me = async (req, res) => {
  const admin = await getCurrentAdmin(req.admin);

  return res.status(OK).json(new ApiResponse(OK, ADMIN_PROFILE_FETCHED, { admin }));
};
