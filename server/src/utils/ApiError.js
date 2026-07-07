import { INTERNAL_SERVER_ERROR } from '../constants/http-status.js';
import { SOMETHING_WENT_WRONG } from '../constants/messages.js';

class ApiError extends Error {
  constructor(
    statusCode = INTERNAL_SERVER_ERROR,
    message = SOMETHING_WENT_WRONG,
    errors = [],
    stack = '',
  ) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = Array.isArray(errors) ? errors : [errors];
    this.isOperational = true;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
