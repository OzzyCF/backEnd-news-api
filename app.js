const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics");
const endpoints = require("./endpoints.json");
const {
  getArticleById,
  fetchArticles,
  getArticleComments,
  postComment,
} = require("./controllers/articles");

// Use the built-in Express JSON parser middleware
app.use(express.json());

// Documentation route
app.get("/api", (req, res) => {
  res.status(200).send(endpoints);
});

//////// GET ////////////////
app.get("/api/topics", getAllTopics);
app.get("/api/articles", fetchArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getArticleComments);

////////POST //////////////////
app.post("/api/articles/:article_id/comments", postComment);

// ERROR HANDLING
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/index.js");

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Route Not Found" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
