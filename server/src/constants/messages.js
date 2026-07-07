export const SUCCESS = 'Success';
export const SERVER_RUNNING = 'Server is running';
export const SERVER_STARTED = 'Server is running on port';
export const SERVER_CLOSING = 'received. Closing server.';
export const DATABASE_CONNECTED = 'MongoDB connected';
export const DATABASE_DISCONNECTED = 'MongoDB disconnected';
export const DATABASE_NOT_CONFIGURED = 'MONGO_URI is not configured. Database features are disabled.';
export const DATABASE_CONNECTION_REQUIRED = 'Database connection is required for this resource';
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
export const PROFILE_FETCHED = 'Profile fetched successfully';
export const PROFILE_UPDATED = 'Profile updated successfully';
export const PROFILE_IMAGE_UPDATED = 'Profile image updated successfully';
export const PROFILE_RESUME_UPDATED = 'Profile resume updated successfully';
export const PROFILE_NOT_FOUND = 'Profile not found';
export const PROFILE_UPDATE_REQUIRED = 'At least one profile field is required';
export const PROFILE_IMAGE_REQUIRED = 'Profile image or cover image is required';
export const RESUME_REQUIRED = 'Resume is required';
export const INVALID_URL = 'Must be a valid URL';
export const INVALID_STRING = 'Must be a valid string';
export const INVALID_OBJECT = 'Must be a valid object';
export const INVALID_ARRAY = 'Must be a valid array';
export const INVALID_YEARS_OF_EXPERIENCE = 'Years of experience must be a non-negative number';
export const FIELD_TOO_LONG = 'Field exceeds maximum length';
export const PROJECTS_FETCHED = 'Projects fetched successfully';
export const PROJECT_FETCHED = 'Project fetched successfully';
export const PROJECT_CREATED = 'Project created successfully';
export const PROJECT_UPDATED = 'Project updated successfully';
export const PROJECT_DELETED = 'Project deleted successfully';
export const PROJECT_PUBLISHED = 'Project publication status updated successfully';
export const PROJECT_FEATURED = 'Project featured status updated successfully';
export const PROJECT_NOT_FOUND = 'Project not found';
export const PROJECT_UPDATE_REQUIRED = 'At least one project field is required';
export const TITLE_REQUIRED = 'Title is required';
export const TITLE_MIN_LENGTH = 'Title must be at least 3 characters';
export const DESCRIPTION_REQUIRED = 'Description is required';
export const INVALID_SLUG = 'Slug must contain only lowercase letters, numbers, and hyphens';
export const SLUG_ALREADY_EXISTS = 'Slug already exists';
export const INVALID_PROJECT_STATUS = 'Status must be Draft, Published, or Archived';
export const INVALID_PROJECT_CATEGORY = 'Category is invalid';
export const INVALID_BOOLEAN = 'Must be true or false';
export const INVALID_NUMBER = 'Must be a valid number';
export const INVALID_OBJECT_ID = 'Invalid id';
export const INVALID_DATE = 'Must be a valid date';
export const INVALID_SORT = 'Sort value is invalid';
export const SKILLS_FETCHED = 'Skills fetched successfully';
export const SKILL_FETCHED = 'Skill fetched successfully';
export const SKILL_CREATED = 'Skill created successfully';
export const SKILL_UPDATED = 'Skill updated successfully';
export const SKILL_DELETED = 'Skill deleted successfully';
export const SKILL_VISIBILITY_UPDATED = 'Skill visibility updated successfully';
export const SKILL_NOT_FOUND = 'Skill not found';
export const SKILL_UPDATE_REQUIRED = 'At least one skill field is required';
export const SKILL_NAME_REQUIRED = 'Skill name is required';
export const SKILL_NAME_MIN_LENGTH = 'Skill name must be at least 2 characters';
export const INVALID_SKILL_CATEGORY = 'Skill category is invalid';
export const INVALID_PROFICIENCY = 'Proficiency must be a number between 0 and 100';
export const EXPERIENCES_FETCHED = 'Experiences fetched successfully';
export const EXPERIENCE_FETCHED = 'Experience fetched successfully';
export const EXPERIENCE_CREATED = 'Experience created successfully';
export const EXPERIENCE_UPDATED = 'Experience updated successfully';
export const EXPERIENCE_DELETED = 'Experience deleted successfully';
export const EXPERIENCE_CURRENT_UPDATED = 'Current job status updated successfully';
export const EXPERIENCE_NOT_FOUND = 'Experience not found';
export const EXPERIENCE_UPDATE_REQUIRED = 'At least one experience field is required';
export const COMPANY_REQUIRED = 'Company is required';
export const COMPANY_MIN_LENGTH = 'Company must be at least 2 characters';
export const POSITION_REQUIRED = 'Position is required';
export const POSITION_MIN_LENGTH = 'Position must be at least 2 characters';
export const EMPLOYMENT_TYPE_REQUIRED = 'Employment type is required';
export const START_DATE_REQUIRED = 'Start date is required';
export const END_DATE_AFTER_START_DATE = 'End date must be after start date';
export const EDUCATION_FETCHED = 'Education entry fetched successfully';
export const EDUCATION_LIST_FETCHED = 'Education entries fetched successfully';
export const EDUCATION_CREATED = 'Education entry created successfully';
export const EDUCATION_UPDATED = 'Education entry updated successfully';
export const EDUCATION_DELETED = 'Education entry deleted successfully';
export const EDUCATION_NOT_FOUND = 'Education entry not found';
export const EDUCATION_UPDATE_REQUIRED = 'At least one education field is required';
export const INSTITUTION_REQUIRED = 'Institution is required';
export const INSTITUTION_MIN_LENGTH = 'Institution must be at least 2 characters';
export const DEGREE_REQUIRED = 'Degree is required';
export const DEGREE_MIN_LENGTH = 'Degree must be at least 2 characters';
export const FIELD_OF_STUDY_REQUIRED = 'Field of study is required';
export const FIELD_OF_STUDY_MIN_LENGTH = 'Field of study must be at least 2 characters';
export const SERVICES_FETCHED = 'Services fetched successfully';
export const SERVICE_FETCHED = 'Service fetched successfully';
export const SERVICE_CREATED = 'Service created successfully';
export const SERVICE_UPDATED = 'Service updated successfully';
export const SERVICE_DELETED = 'Service deleted successfully';
export const SERVICE_VISIBILITY_UPDATED = 'Service visibility updated successfully';
export const SERVICE_NOT_FOUND = 'Service not found';
export const SERVICE_UPDATE_REQUIRED = 'At least one service field is required';
export const CONTACT_MESSAGE_SUBMITTED = 'Contact message submitted successfully';
export const CONTACT_MESSAGES_FETCHED = 'Contact messages fetched successfully';
export const CONTACT_MESSAGE_READ_UPDATED = 'Contact message read status updated successfully';
export const CONTACT_MESSAGE_DELETED = 'Contact message deleted successfully';
export const CONTACT_MESSAGE_NOT_FOUND = 'Contact message not found';
export const CONTACT_NAME_REQUIRED = 'Name is required';
export const CONTACT_NAME_MIN_LENGTH = 'Name must be at least 2 characters';
export const CONTACT_SUBJECT_REQUIRED = 'Subject is required';
export const CONTACT_SUBJECT_MIN_LENGTH = 'Subject must be at least 3 characters';
export const CONTACT_MESSAGE_REQUIRED = 'Message is required';
export const CONTACT_MESSAGE_MIN_LENGTH = 'Message must be at least 10 characters';
export const INVALID_CONTACT_STATUS = 'Contact status is invalid';

export const MESSAGES = Object.freeze({
  SUCCESS,
  SERVER_RUNNING,
  SERVER_STARTED,
  SERVER_CLOSING,
  DATABASE_CONNECTED,
  DATABASE_DISCONNECTED,
  DATABASE_NOT_CONFIGURED,
  DATABASE_CONNECTION_REQUIRED,
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
  PROFILE_FETCHED,
  PROFILE_UPDATED,
  PROFILE_IMAGE_UPDATED,
  PROFILE_RESUME_UPDATED,
  PROFILE_NOT_FOUND,
  PROFILE_UPDATE_REQUIRED,
  PROFILE_IMAGE_REQUIRED,
  RESUME_REQUIRED,
  INVALID_URL,
  INVALID_STRING,
  INVALID_OBJECT,
  INVALID_ARRAY,
  INVALID_YEARS_OF_EXPERIENCE,
  FIELD_TOO_LONG,
  PROJECTS_FETCHED,
  PROJECT_FETCHED,
  PROJECT_CREATED,
  PROJECT_UPDATED,
  PROJECT_DELETED,
  PROJECT_PUBLISHED,
  PROJECT_FEATURED,
  PROJECT_NOT_FOUND,
  PROJECT_UPDATE_REQUIRED,
  TITLE_REQUIRED,
  TITLE_MIN_LENGTH,
  DESCRIPTION_REQUIRED,
  INVALID_SLUG,
  SLUG_ALREADY_EXISTS,
  INVALID_PROJECT_STATUS,
  INVALID_PROJECT_CATEGORY,
  INVALID_BOOLEAN,
  INVALID_NUMBER,
  INVALID_OBJECT_ID,
  INVALID_DATE,
  INVALID_SORT,
  SKILLS_FETCHED,
  SKILL_FETCHED,
  SKILL_CREATED,
  SKILL_UPDATED,
  SKILL_DELETED,
  SKILL_VISIBILITY_UPDATED,
  SKILL_NOT_FOUND,
  SKILL_UPDATE_REQUIRED,
  SKILL_NAME_REQUIRED,
  SKILL_NAME_MIN_LENGTH,
  INVALID_SKILL_CATEGORY,
  INVALID_PROFICIENCY,
  EXPERIENCES_FETCHED,
  EXPERIENCE_FETCHED,
  EXPERIENCE_CREATED,
  EXPERIENCE_UPDATED,
  EXPERIENCE_DELETED,
  EXPERIENCE_CURRENT_UPDATED,
  EXPERIENCE_NOT_FOUND,
  EXPERIENCE_UPDATE_REQUIRED,
  COMPANY_REQUIRED,
  COMPANY_MIN_LENGTH,
  POSITION_REQUIRED,
  POSITION_MIN_LENGTH,
  EMPLOYMENT_TYPE_REQUIRED,
  START_DATE_REQUIRED,
  END_DATE_AFTER_START_DATE,
  EDUCATION_FETCHED,
  EDUCATION_LIST_FETCHED,
  EDUCATION_CREATED,
  EDUCATION_UPDATED,
  EDUCATION_DELETED,
  EDUCATION_NOT_FOUND,
  EDUCATION_UPDATE_REQUIRED,
  INSTITUTION_REQUIRED,
  INSTITUTION_MIN_LENGTH,
  DEGREE_REQUIRED,
  DEGREE_MIN_LENGTH,
  FIELD_OF_STUDY_REQUIRED,
  FIELD_OF_STUDY_MIN_LENGTH,
  SERVICES_FETCHED,
  SERVICE_FETCHED,
  SERVICE_CREATED,
  SERVICE_UPDATED,
  SERVICE_DELETED,
  SERVICE_VISIBILITY_UPDATED,
  SERVICE_NOT_FOUND,
  SERVICE_UPDATE_REQUIRED,
  CONTACT_MESSAGE_SUBMITTED,
  CONTACT_MESSAGES_FETCHED,
  CONTACT_MESSAGE_READ_UPDATED,
  CONTACT_MESSAGE_DELETED,
  CONTACT_MESSAGE_NOT_FOUND,
  CONTACT_NAME_REQUIRED,
  CONTACT_NAME_MIN_LENGTH,
  CONTACT_SUBJECT_REQUIRED,
  CONTACT_SUBJECT_MIN_LENGTH,
  CONTACT_MESSAGE_REQUIRED,
  CONTACT_MESSAGE_MIN_LENGTH,
  INVALID_CONTACT_STATUS,
});
