const { StatusCode } = require('../utils/constants');
const { ServerErrorMessage } = require('../utils/constants');

const handleError = ((err, req, res, next) => {
  const { statusCode = StatusCode.InternalServerError, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === StatusCode.InternalServerError
        ? ServerErrorMessage.InternalServerError
        : message,
    });
  next();
});

module.exports = handleError;
