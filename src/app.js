const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  errors,
} = require('celebrate');
const cors = require('cors');

const {
  requestLogger,
  errorLogger,
} = require('./middleware/logger');
const error = require('./middleware/error');
const auth = require('./middleware/auth');
const limiter = require('./middleware/limiter');

const routes = require('./routes');
const notFoundRoute = require('./middleware/not-found-route');

require('dotenv').config();

const { PORT = 4000 } = process.env;
const {
  dbUrl,
} = require('./utils/constants');

const app = express();

app.options('*', cors());
app.use(cors());

app.use(requestLogger);
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbUrl);

app.use(helmet());

routes.forEach((route) => {
  if (route.isProtected) {
    app.use(route.path, auth, route.handler);
  } else {
    app.use(route.path, route.handler);
  }
});
app.use(notFoundRoute);

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {});
