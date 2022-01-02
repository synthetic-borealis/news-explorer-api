const { responseStrings } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message = responseStrings.badRequest) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
