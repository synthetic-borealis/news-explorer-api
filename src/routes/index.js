const signupRoute = require('./signup');
const signinRoute = require('./signin');
const usersRoute = require('./users');
const articlesRoute = require('./articles');

module.exports = [
  {
    path: '/signup',
    handler: signupRoute,
  },
  {
    path: '/signin',
    handler: signinRoute,
  },
  {
    path: '/users',
    handler: usersRoute,
    isProtected: true,
  },
  {
    path: '/articles',
    handler: articlesRoute,
    isProtected: true,
  },
];
