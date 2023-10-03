const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics");
const endpoints = require("./endpoints.json");
const { getArticleById } = require("./controllers/articles");

// Documentation route
app.get("/api", (req, res) => {
  res.status(200).send(endpoints);
});

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:article_id", getArticleById);

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
