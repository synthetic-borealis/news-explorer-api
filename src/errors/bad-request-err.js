const { messageStrings } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message = messageStrings.badRequest) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
