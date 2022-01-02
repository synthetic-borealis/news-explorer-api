const { responseStrings } = require('../utils/constants');

const error = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: responseStrings.serverError });
  }
};

module.exports = error;
