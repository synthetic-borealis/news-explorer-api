const { errorStrings } = require('../utils/constants');

class BlacklistedMailProviderError extends Error {
  constructor(message = errorStrings.blacklistedEmailProvider) {
    super(message);
  }
}

module.exports = BlacklistedMailProviderError;
