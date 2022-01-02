const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  // celebrate,
  // Joi,
  // Segments,
  errors,
} = require('celebrate');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const {
  requestLogger,
  errorLogger,
} = require('./middleware/logger');
const error = require('./middleware/error');

// Routes
const notFoundRoute = require('./routes/not-found-route');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

app.options('*', cors());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // per 15 minutes
  max: 100,
});

app.use(requestLogger);
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/newsexplorer');

app.use(helmet());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});
app.use(notFoundRoute);

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {});
