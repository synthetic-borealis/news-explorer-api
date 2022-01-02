const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { validateEmail } = require('../utils/validation-helpers');

const { createUser } = require('../controllers/users');

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail, 'email'),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

module.exports = router;
