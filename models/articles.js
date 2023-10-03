const db = require("../db/connection");

exports.fetchArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return rows[0];
    });
};

exports.selectArticles = (queryParams) => {
  let query = `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, 
           articles.created_at, articles.votes, articles.article_img_url,
           COUNT(comments.article_id) ::integer AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id`;

  const values = [];

  if (queryParams.topic) {
    query += ` WHERE articles.topic = $${values.length + 1}`;
    values.push(queryParams.topic);
  }

  if (queryParams.votes) {
    if (values.length > 0) {
      query += ` AND articles.votes >= $${values.length + 1}`;
    } else {
      query += ` WHERE articles.votes >= $${values.length + 1}`;
    }
    values.push(queryParams.votes);
  }

  query += `
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`;

  return db.query(query, values).then(({ rows }) => {
    return rows;
  });
};
