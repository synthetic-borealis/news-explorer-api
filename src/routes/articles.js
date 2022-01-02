const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { validateUrl } = require('../utils/validation-helpers');

const {
  getArticles,
  addArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateUrl, 'URL'),
    image: Joi.string().required().custom(validateUrl, 'URL'),
  }),
}), addArticle);
router.delete('/:articleId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    articleId: Joi.string().hex().required().length(24),
  }),
}), deleteArticle);

module.exports = router;
