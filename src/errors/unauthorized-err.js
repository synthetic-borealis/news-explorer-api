const { responseStrings } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message = responseStrings.unauthorized) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = UnauthorizedError;
