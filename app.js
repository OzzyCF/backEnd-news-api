const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics");
const endpoints = require("./endpoints.json");

// Documentation route
app.get("/api", (req, res) => {
  res.status(200).send(endpoints);
});

app.get("/api/topics", getAllTopics);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
