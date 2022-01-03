require('dotenv').config();

const urlRegex = /^https?:\/{2}(www\.)?[a-z\0-9]{2,256}\.[a-z]{2,6}(\/[a-z0-9._~:/?%#[\]@!$&'()*+,;=]*)?/i;

const responseStrings = {
  // Error Messages
  badCredentials: 'Incorrect email or password',
  notFound: 'Requested resource not found',
  badRequest: 'Bad request',
  serverError: 'An error has occured on the server',
  unauthorized: 'Unauthorized action',
  emailIsUsed: 'The provided e-mail address is already in use',
  // Other Responses
  userCreated: 'User created',
  articleSaved: 'Article saved',
  articleDeleted: 'Article deleted',
};

const errorStrings = {
  invalidEmail: 'Not a valid e-mail address',
  blacklistedEmailProvider: 'Blacklisted e-mail provider',
};

const errorCodes = {
  mongoDuplicateKeyError: 11000,
};

const {
  NODE_ENV,
  JWT_SECRET,
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'newsexplorer',
} = process.env;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';
const dbUrl = NODE_ENV === 'production' ? `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}` : 'mongodb://localhost:27017/newsexplorer';

module.exports = {
  urlRegex,
  responseStrings,
  errorStrings,
  errorCodes,
  secretKey,
  dbUrl,
};
