const {
  fetchArticleById,
  selectArticles,
  fetchCommentsByArticleId,
  addCommentToArticle,
  updateVotesByArticleId,
  removeCommentById,
  fetchAllTopics,
  selectUsers,
} = require("../models/api.model");

const checkIfArticleExists = (article_id) => {
  return fetchArticleById(article_id).then((article) => {
    if (!article) {
      return Promise.reject({ status: 404, msg: "Article not found" });
    }
    return article;
  });
};

///////// ARTICLES ///////////

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then((article) => res.status(200).send({ article }))
    .catch(next);
};

exports.fetchArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;

  const validColumns = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
  ];
  const validOrderValues = ["asc", "desc"];

  // Validate sort_by column
  if (sort_by && !validColumns.includes(sort_by)) {
    return next({ status: 400, msg: "Bad Request: Invalid sort_by column" });
  }

  // Validate order value
  if (order && !validOrderValues.includes(order)) {
    return next({ status: 400, msg: "Bad Request: Invalid order value" });
  }

  selectArticles(req.query)
    .then((articles) => {
      if (articles.length === 0 && topic) {
        res.status(200).send({
          message: `No articles found for topic "${topic}".`,
          articles: [],
        });
      } else {
        res.status(200).send({ articles });
      }
    })
    .catch(next);
};

exports.patchVotesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (inc_votes === undefined || typeof inc_votes !== "number") {
    return next({ status: 400, msg: "Bad Request: Invalid inc_votes input" });
  }

  checkIfArticleExists(article_id)
    .then(() => updateVotesByArticleId(article_id, inc_votes))
    .then((article) => res.status(200).send({ article }))
    .catch(next);
};

///////// COMMENTS ///////////

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;

  checkIfArticleExists(article_id)
    .then(() => fetchCommentsByArticleId(article_id))
    .then((comments) => {
      const msg =
        comments.length === 0
          ? "No comments found for this article."
          : undefined;
      res.status(200).send({ comments, msg });
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

  checkIfArticleExists(article_id)
    .then(() => addCommentToArticle(article_id, username, body))
    .then((comment) => res.status(201).send({ comment }))
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;

  removeCommentById(comment_id)
    .then(() => res.status(204).send())
    .catch(next);
};

///////// TOPICS ///////////

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => res.status(200).send({ topics }))
    .catch(next);
};

///////// USERS ///////////

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => res.status(200).send({ users }))
    .catch(next);
};
