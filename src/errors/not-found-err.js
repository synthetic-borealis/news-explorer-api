const { responseStrings } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message = responseStrings.notFound) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
