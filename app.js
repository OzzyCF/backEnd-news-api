const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics");

app.get("/api/topics", getAllTopics);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
