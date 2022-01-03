const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const { responseStrings } = require('../utils/constants');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.status(200).send({ data: articles });
    })
    .catch(next);
};

const addArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      Article.populate(article, { path: 'owner' })
        .then(() => {
          res.status(201).send(article);
        });
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  Article.findById(articleId)
    .orFail(new NotFoundError())
    .select('+owner')
    .then((article) => {
      if (article.owner._id.toString() !== userId) {
        throw new UnauthorizedError();
      }

      Article.findByIdAndDelete(articleId)
        .then(() => {
          res.status(200).send({ message: responseStrings.articleDeleted });
        });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  addArticle,
  deleteArticle,
};
