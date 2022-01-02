const validator = require('validator');
const domainBlacklist = require('./domain-blacklist');
const { urlRegex } = require('./constants');
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

const isValidEmail = (email) => {
  if (validator.isEmail(email)) {
    const hostDomain = email.split('@')[1];
    return !domainBlacklist.includes(hostDomain);
  }
  return false;
};

const isValidURL = (url) => urlRegex.test(url);

module.exports = {
  validateEmail,
  isValidEmail,
  isValidURL,
};
