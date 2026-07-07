export const SUCCESS = 'Success';
export const SERVER_RUNNING = 'Server is running';
export const SERVER_STARTED = 'Server is running on port';
export const SERVER_CLOSING = 'received. Closing server.';
export const DATABASE_CONNECTED = 'MongoDB connected';
export const DATABASE_DISCONNECTED = 'MongoDB disconnected';
export const DATABASE_NOT_CONFIGURED = 'MONGO_URI is not configured. Database features are disabled.';
export const ROUTE_NOT_FOUND = 'Route not found';
export const SOMETHING_WENT_WRONG = 'Something went wrong';
export const VALIDATION_ERROR = 'Validation error';
export const INVALID_JSON_PAYLOAD = 'Invalid JSON payload';
export const MISSING_ENV_VARIABLE = 'Missing required environment variable';
export const INVALID_PORT = 'PORT must be a valid number between 1 and 65535';
export const INVALID_NODE_ENV = 'NODE_ENV must be one of';
export const CLIENT_URL_REQUIRED = 'CLIENT_URL must include at least one valid URL';
export const CLIENT_URL_INVALID = 'CLIENT_URL contains an invalid URL';
export const INVALID_SAME_SITE = 'COOKIE_SAME_SITE must be one of';
export const INVALID_SALT_ROUNDS = 'BCRYPT_SALT_ROUNDS must be a valid number between 10 and 15';
export const PRODUCTION_SECRET_REQUIRED = 'Production requires a secure value for';
export const LOGIN_SUCCESS = 'Login successful';
export const LOGOUT_SUCCESS = 'Logout successful';
export const TOKEN_REFRESHED = 'Token refreshed successfully';
export const ADMIN_PROFILE_FETCHED = 'Admin profile fetched successfully';
export const INVALID_CREDENTIALS = 'Invalid email or password';
export const ADMIN_INACTIVE = 'Admin account is inactive';
export const ADMIN_NOT_FOUND = 'Admin not found';
export const ACCESS_TOKEN_REQUIRED = 'Access token is required';
export const REFRESH_TOKEN_REQUIRED = 'Refresh token is required';
export const INVALID_TOKEN = 'Invalid token';
export const TOKEN_EXPIRED = 'Token has expired';
export const FORBIDDEN_RESOURCE = 'You do not have permission to access this resource';
export const EMAIL_REQUIRED = 'Email is required';
export const EMAIL_INVALID = 'Email must be valid';
export const PASSWORD_REQUIRED = 'Password is required';
export const PASSWORD_MIN_LENGTH = 'Password must be at least 8 characters';

export const MESSAGES = Object.freeze({
  SUCCESS,
  SERVER_RUNNING,
  SERVER_STARTED,
  SERVER_CLOSING,
  DATABASE_CONNECTED,
  DATABASE_DISCONNECTED,
  DATABASE_NOT_CONFIGURED,
  ROUTE_NOT_FOUND,
  SOMETHING_WENT_WRONG,
  VALIDATION_ERROR,
  INVALID_JSON_PAYLOAD,
  MISSING_ENV_VARIABLE,
  INVALID_PORT,
  INVALID_NODE_ENV,
  CLIENT_URL_REQUIRED,
  CLIENT_URL_INVALID,
  INVALID_SAME_SITE,
  INVALID_SALT_ROUNDS,
  PRODUCTION_SECRET_REQUIRED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  TOKEN_REFRESHED,
  ADMIN_PROFILE_FETCHED,
  INVALID_CREDENTIALS,
  ADMIN_INACTIVE,
  ADMIN_NOT_FOUND,
  ACCESS_TOKEN_REQUIRED,
  REFRESH_TOKEN_REQUIRED,
  INVALID_TOKEN,
  TOKEN_EXPIRED,
  FORBIDDEN_RESOURCE,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  PASSWORD_MIN_LENGTH,
});
