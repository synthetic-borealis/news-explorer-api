const signupRoute = require('./signup');
const signinRoute = require('./signin');
const usersRoute = require('./users');
const articlesRoute = require('./articles');

module.exports = [
  {
    path: '/signup',
    handler: signupRoute,
    isProtected: false,
  },
  {
    path: '/signin',
    handler: signinRoute,
    isProtected: false,
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
