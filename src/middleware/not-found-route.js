const NotFoundError = require('../errors/not-found-err');

const notFoundRoute = (req, res, next) => {
  next(new NotFoundError());
};

module.exports = notFoundRoute;
