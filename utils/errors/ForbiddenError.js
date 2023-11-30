const { StatusCode } = require('../constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.Forbidden;
  }
}

module.exports = ForbiddenError;
