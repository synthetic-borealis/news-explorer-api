const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { validateEmail } = require('../utils/validation-helpers');

const { login } = require('../controllers/users');

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail, 'email'),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = router;
