const { responseStrings } = require('../utils/constants');

class EmailIsUsedError extends Error {
  constructor(message = responseStrings.emailIsUsed) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = EmailIsUsedError;
