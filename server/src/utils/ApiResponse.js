import { OK } from '../constants/http-status.js';
import { SUCCESS } from '../constants/messages.js';

class ApiResponse {
  constructor(statusCode = OK, message = SUCCESS, data) {
    this.success = statusCode < 400;
    this.message = message;

    if (data !== undefined) {
      this.data = data;
    }
  }
}

export default ApiResponse;
