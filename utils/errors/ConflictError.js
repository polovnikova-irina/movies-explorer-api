const { StatusCode } = require('constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.Conflict;
  }
}

module.exports = ConflictError;
