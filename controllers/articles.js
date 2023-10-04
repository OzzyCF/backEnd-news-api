const {
  fetchArticleById,
  selectArticles,
  fetchCommentsByArticleId,
  addCommentToArticle,
  updateVotesByArticleId,
} = require("../models/articles");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.fetchArticles = (req, res, next) => {
  selectArticles(req.query)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then((article) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return fetchCommentsByArticleId(article_id);
    })
    .then((comments) => {
      if (comments.length === 0) {
        res.status(200).send({
          message: "No comments found for this article.",
          comments: [],
        });
      } else {
        res.status(200).send({ comments });
      }
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  const allowedKeys = ["username", "body"];
  const reqKeys = Object.keys(req.body);
  if (!reqKeys.every((key) => allowedKeys.includes(key))) {
    return next({ status: 400, msg: "Bad Request: Invalid input properties" });
  }

  fetchArticleById(article_id)
    .then((article) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return addCommentToArticle(article_id, username, body);
    })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchVotesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  // Validate the inc_votes input
  if (inc_votes === undefined) {
    return next({ status: 400, msg: "Bad Request: inc_votes is required" });
  }

  if (typeof inc_votes !== "number") {
    return next({ status: 400, msg: "Bad Request: Invalid inc_votes input" });
  }

  fetchArticleById(article_id)
    .then((article) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return updateVotesByArticleId(article_id, inc_votes);
    })
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
