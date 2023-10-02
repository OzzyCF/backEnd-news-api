const db = require("../db/connection");

exports.fetchAllTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => {
    console.log("Data from the database:", result.rows);
    return result.rows;
  });
};
