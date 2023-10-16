const { StatusCode } = require('constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.BadRequest;
  }
}

module.exports = BadRequestError;
