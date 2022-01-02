const validator = require('validator');
const domainBlacklist = require('./domain-blacklist');
const BlacklistedMailProviderError = require('../errors/blacklisted-mail-provider-err');

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    const hostDomain = value.split('@')[1];
    if (domainBlacklist.includes(hostDomain)) {
      return helpers.error('any.custom', { error: BlacklistedMailProviderError });
    }
    return value;
  }
  return helpers.error('strings.email');
};

module.exports = {
  validateEmail,
};
