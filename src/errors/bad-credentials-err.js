const { responseStrings } = require('../utils/constants');

class BadCredentialsError extends Error {
  constructor(message = responseStrings.badCredentials) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = BadCredentialsError;
