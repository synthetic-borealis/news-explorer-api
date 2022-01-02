const validator = require('validator');
const domainBlacklist = require('./domain-blacklist');
const { urlRegex } = require('./constants');
const { errorStrings } = require('./constants');

const isValidEmail = (email) => {
  if (validator.isEmail(email)) {
    const hostDomain = email.split('@')[1];
    return !domainBlacklist.includes(hostDomain);
  }
  return false;
};

const isValidURL = (url) => urlRegex.test(url);

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    const hostDomain = value.split('@')[1];
    if (domainBlacklist.includes(hostDomain)) {
      return helpers.message(errorStrings.blacklistedEmailProvider);
    }
    return value;
  }
  return helpers.error('string.email');
};

const validateUrl = (value, helpers) => (isValidURL(value) ? value : helpers.error('string.uri'));

module.exports = {
  isValidEmail,
  isValidURL,
  validateEmail,
  validateUrl,
};
