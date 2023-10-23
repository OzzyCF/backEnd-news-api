const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");
const cors = require("cors");

// Controllers
const {
  getArticleById,
  fetchArticles,
  getArticleComments,
  postComment,
  patchVotesByArticleId,
  deleteComment,
  getAllTopics,
  getUsers,
} = require("./controllers/api.controller");

// Error handlers
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/index.js");

// Middleware
app.use(cors());
app.use(express.json()); // Built-in Express JSON parser

// Routes
app.get("/api", (req, res) => res.status(200).send(endpoints)); // Documentation route

// GET Routes
app.get("/api/topics", getAllTopics);
app.get("/api/articles", fetchArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.get("/api/users", getUsers);

// POST Routes
app.post("/api/articles/:article_id/comments", postComment);

// PATCH Routes
app.patch("/api/articles/:article_id", patchVotesByArticleId);

// DELETE Routes
app.delete("/api/comments/:comment_id", deleteComment);

// Handle unmatched routes
app.all("*", (req, res) => res.status(404).send({ msg: "Route Not Found" }));

// Error handling
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
