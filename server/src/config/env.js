import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

import {
  CLIENT_URL_INVALID,
  CLIENT_URL_REQUIRED,
  INVALID_NODE_ENV,
  INVALID_PORT,
  INVALID_SALT_ROUNDS,
  INVALID_SAME_SITE,
  MISSING_ENV_VARIABLE,
  PRODUCTION_SECRET_REQUIRED,
} from '../constants/messages.js';

const envPath = fileURLToPath(new URL('../../.env', import.meta.url));

dotenv.config({ path: envPath });

const DEFAULT_ENV = Object.freeze({
  NODE_ENV: 'development',
  PORT: '5000',
  CLIENT_URL: 'http://localhost:5173',
  MONGO_URI: '',
  JWT_ACCESS_SECRET: 'development-access-token-secret-change-me',
  JWT_REFRESH_SECRET: 'development-refresh-token-secret-change-me',
  JWT_ACCESS_EXPIRES_IN: '15m',
  JWT_REFRESH_EXPIRES_IN: '7d',
  JWT_ISSUER: 'portfolio-cms',
  JWT_AUDIENCE: 'portfolio-cms-admin',
  ACCESS_TOKEN_COOKIE_NAME: 'accessToken',
  REFRESH_TOKEN_COOKIE_NAME: 'refreshToken',
  COOKIE_SAME_SITE: 'lax',
  COOKIE_DOMAIN: '',
  BCRYPT_SALT_ROUNDS: '12',
});

const allowedNodeEnvs = ['development', 'production', 'test'];
const allowedSameSiteValues = ['strict', 'lax', 'none'];

const getEnvValue = (key) => {
  const value = process.env[key] ?? DEFAULT_ENV[key];

  if (value === undefined || value === '') {
    throw new Error(`${MISSING_ENV_VARIABLE}: ${key}`);
  }

  return value;
};

const getOptionalEnvValue = (key) => process.env[key] ?? DEFAULT_ENV[key] ?? '';

const parsePort = (value) => {
  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(INVALID_PORT);
  }

  return port;
};

const parseClientUrls = (value) => {
  const urls = value
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean);

  if (urls.length === 0) {
    throw new Error(CLIENT_URL_REQUIRED);
  }

  urls.forEach((url) => {
    try {
      new URL(url);
    } catch {
      throw new Error(`${CLIENT_URL_INVALID}: ${url}`);
    }
  });

  return urls;
};

const parseSameSite = (value) => {
  const sameSite = value.toLowerCase();

  if (!allowedSameSiteValues.includes(sameSite)) {
    throw new Error(`${INVALID_SAME_SITE}: ${allowedSameSiteValues.join(', ')}`);
  }

  return sameSite;
};

const parseSaltRounds = (value) => {
  const saltRounds = Number(value);

  if (!Number.isInteger(saltRounds) || saltRounds < 10 || saltRounds > 15) {
    throw new Error(INVALID_SALT_ROUNDS);
  }

  return saltRounds;
};

const parseTokenDuration = (value) => {
  if (/^\d+$/.test(value)) {
    return Number(value);
  }

  return value;
};

const nodeEnv = getEnvValue('NODE_ENV');

if (!allowedNodeEnvs.includes(nodeEnv)) {
  throw new Error(`${INVALID_NODE_ENV}: ${allowedNodeEnvs.join(', ')}`);
}

const requireProductionValue = (key, value) => {
  if (nodeEnv === 'production' && (!value || value === DEFAULT_ENV[key])) {
    throw new Error(`${PRODUCTION_SECRET_REQUIRED}: ${key}`);
  }
};

const mongoUri = getOptionalEnvValue('MONGO_URI');
const jwtAccessSecret = getEnvValue('JWT_ACCESS_SECRET');
const jwtRefreshSecret = getEnvValue('JWT_REFRESH_SECRET');

requireProductionValue('MONGO_URI', mongoUri);
requireProductionValue('JWT_ACCESS_SECRET', jwtAccessSecret);
requireProductionValue('JWT_REFRESH_SECRET', jwtRefreshSecret);

const clientUrls = parseClientUrls(getEnvValue('CLIENT_URL'));

const env = {
  nodeEnv,
  port: parsePort(getEnvValue('PORT')),
  clientUrl: clientUrls[0],
  clientUrls,
  mongoUri,
  jwt: {
    accessSecret: jwtAccessSecret,
    refreshSecret: jwtRefreshSecret,
    accessExpiresIn: parseTokenDuration(getEnvValue('JWT_ACCESS_EXPIRES_IN')),
    refreshExpiresIn: parseTokenDuration(getEnvValue('JWT_REFRESH_EXPIRES_IN')),
    issuer: getEnvValue('JWT_ISSUER'),
    audience: getEnvValue('JWT_AUDIENCE'),
  },
  cookies: {
    accessTokenName: getEnvValue('ACCESS_TOKEN_COOKIE_NAME'),
    refreshTokenName: getEnvValue('REFRESH_TOKEN_COOKIE_NAME'),
    sameSite: parseSameSite(getEnvValue('COOKIE_SAME_SITE')),
    domain: getOptionalEnvValue('COOKIE_DOMAIN'),
  },
  bcrypt: {
    saltRounds: parseSaltRounds(getEnvValue('BCRYPT_SALT_ROUNDS')),
  },
  isDevelopment: nodeEnv === 'development',
  isProduction: nodeEnv === 'production',
  isTest: nodeEnv === 'test',
};

export default env;
