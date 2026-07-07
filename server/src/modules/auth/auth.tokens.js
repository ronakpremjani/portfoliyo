import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import env from '../../config/env.js';
import { UNAUTHORIZED } from '../../constants/http-status.js';
import { INVALID_TOKEN, TOKEN_EXPIRED } from '../../constants/messages.js';
import ApiError from '../../utils/ApiError.js';

const TOKEN_TYPES = Object.freeze({
  ACCESS: 'access',
  REFRESH: 'refresh',
});

const durationToMilliseconds = (duration) => {
  if (typeof duration === 'number') {
    return duration * 1000;
  }

  const match = /^(\d+)(ms|s|m|h|d)?$/.exec(duration);

  if (!match) {
    return 0;
  }

  const value = Number(match[1]);
  const unit = match[2] || 's';

  const multipliers = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * multipliers[unit];
};

const signToken = ({ admin, type, secret, expiresIn }) =>
  jwt.sign(
    {
      sub: admin.id,
      role: admin.role,
      type,
    },
    secret,
    {
      expiresIn,
      issuer: env.jwt.issuer,
      audience: env.jwt.audience,
    },
  );

const verifyToken = ({ token, secret, type }) => {
  try {
    const payload = jwt.verify(token, secret, {
      issuer: env.jwt.issuer,
      audience: env.jwt.audience,
    });

    if (payload.type !== type) {
      throw new ApiError(UNAUTHORIZED, INVALID_TOKEN);
    }

    return payload;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error.name === 'TokenExpiredError') {
      throw new ApiError(UNAUTHORIZED, TOKEN_EXPIRED);
    }

    throw new ApiError(UNAUTHORIZED, INVALID_TOKEN);
  }
};

export const generateAccessToken = (admin) =>
  signToken({
    admin,
    type: TOKEN_TYPES.ACCESS,
    secret: env.jwt.accessSecret,
    expiresIn: env.jwt.accessExpiresIn,
  });

export const generateRefreshToken = (admin) =>
  signToken({
    admin,
    type: TOKEN_TYPES.REFRESH,
    secret: env.jwt.refreshSecret,
    expiresIn: env.jwt.refreshExpiresIn,
  });

export const generateAuthTokens = (admin) => ({
  accessToken: generateAccessToken(admin),
  refreshToken: generateRefreshToken(admin),
});

export const verifyAccessToken = (token) =>
  verifyToken({
    token,
    secret: env.jwt.accessSecret,
    type: TOKEN_TYPES.ACCESS,
  });

export const verifyRefreshToken = (token) =>
  verifyToken({
    token,
    secret: env.jwt.refreshSecret,
    type: TOKEN_TYPES.REFRESH,
  });

export const decodeRefreshToken = (token) => {
  const payload = jwt.decode(token);

  if (!payload || payload.type !== TOKEN_TYPES.REFRESH) {
    return null;
  }

  return payload;
};

export const hashRefreshToken = async (refreshToken) =>
  bcrypt.hash(refreshToken, env.bcrypt.saltRounds);

export const compareRefreshToken = async (refreshToken, storedRefreshToken) =>
  bcrypt.compare(refreshToken, storedRefreshToken);

const getCookieOptions = (expiresIn) => {
  const options = {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.cookies.sameSite,
    maxAge: durationToMilliseconds(expiresIn),
  };

  if (env.cookies.domain) {
    options.domain = env.cookies.domain;
  }

  return options;
};

export const setAuthCookies = (res, tokens) => {
  res.cookie(
    env.cookies.accessTokenName,
    tokens.accessToken,
    getCookieOptions(env.jwt.accessExpiresIn),
  );
  res.cookie(
    env.cookies.refreshTokenName,
    tokens.refreshToken,
    getCookieOptions(env.jwt.refreshExpiresIn),
  );
};

export const clearAuthCookies = (res) => {
  const options = {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.cookies.sameSite,
  };

  if (env.cookies.domain) {
    options.domain = env.cookies.domain;
  }

  res.clearCookie(env.cookies.accessTokenName, options);
  res.clearCookie(env.cookies.refreshTokenName, options);
};

export const getAccessTokenFromRequest = (req) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader?.startsWith('Bearer ')) {
    return authorizationHeader.slice(7);
  }

  return req.cookies?.[env.cookies.accessTokenName];
};

export const getRefreshTokenFromRequest = (req) => req.cookies?.[env.cookies.refreshTokenName];
