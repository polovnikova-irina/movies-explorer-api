const { StatusCode } = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.Unauthorized;
  }
}

module.exports = NotFoundError;
