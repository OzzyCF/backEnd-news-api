const db = require("../db/connection");

///////// ARTICLES ///////////

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

exports.updateVotesByArticleId = (article_id, inc_votes) => {
  if (!inc_votes) {
    return this.fetchArticleById(article_id); // If no votes are provided, return the article unchanged.
  }

  return db
    .query(
      `UPDATE articles
       SET votes = votes + $1
       WHERE article_id = $2
       RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return rows[0];
    });
};

///////// COMMENTS ///////////

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `
        SELECT comment_id, votes, created_at, author, body, article_id
        FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC
      `,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.addCommentToArticle = (article_id, username, body) => {
  return db
    .query(
      `
          INSERT INTO comments (article_id, author, body)
          VALUES ($1, $2, $3)
          RETURNING *;
        `,
      [article_id, username, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeCommentById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING comment_id;`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      return null;
    });
};

///////// TOPICS ///////////

exports.fetchAllTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => {
    return result.rows;
  });
};

///////// USERS ///////////

exports.selectUsers = () => {
  return db
    .query("SELECT username, name, avatar_url FROM users;")
    .then((result) => {
      return result.rows;
    });
};
