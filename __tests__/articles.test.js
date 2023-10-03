const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("/api/articles/:article_id", () => {
  describe("GET", () => {
    describe("Status 200", () => {
      it("should return an article with the correct structure", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(body.article).toMatchObject({
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
            });
          });
      });
    });

    describe("Status 404", () => {
      it("should return 404 if article_id does not exist", () => {
        return request(app)
          .get("/api/articles/9999")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Article not found");
          });
      });
    });

    describe("Status 400", () => {
      it("should return 400 for an invalid article_id format", () => {
        return request(app)
          .get("/api/articles/not-an-id")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid input");
          });
      });
    });
  });
});

describe("/api/articles", () => {
  describe("GET", () => {
    describe("Status 200", () => {
      it("should return all articles with the correct structure and without body", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            // Check if it's an array
            expect(body.articles).toBeInstanceOf(Array);
            // Check the structure of the first article
            expect(body.articles[0]).toMatchObject({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            });
            // Check for the absence of the body property
            expect(body.articles[0]).not.toHaveProperty("body");
          });
      });

      it("should return articles sorted by date in descending order", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            let sorted = true;

            body.articles.forEach((article, index, arr) => {
              // If it's not the first item and article date is greater than previous article date, then falsd
              if (
                index !== 0 &&
                article.created_at > arr[index - 1].created_at
              ) {
                sorted = false;
              }
            });

            expect(sorted).toBe(true);
          });
      });
    });
  });
});

describe("/api/articles/:article_id/comments", () => {
  describe("GET", () => {
    describe("Status 200", () => {
      it("should respond with an array of comments for the given article_id", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toBeInstanceOf(Array);
            expect(body.comments[0]).toHaveProperty("comment_id");
            expect(body.comments[0]).toHaveProperty("votes");
            expect(body.comments[0]).toHaveProperty("created_at");
            expect(body.comments[0]).toHaveProperty("author");
            expect(body.comments[0]).toHaveProperty("body");
            expect(body.comments[0]).toHaveProperty("article_id");
          });
      });

      it("comments are served with the most recent first", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            let sorted = true;

            body.comments.forEach((comment, index, arr) => {
              if (
                index !== 0 &&
                comment.created_at > arr[index - 1].created_at
              ) {
                sorted = false;
              }
            });

            expect(sorted).toBe(true);
          });
      });
    });

    describe("Status 400", () => {
      it("should respond with an error when given an invalid article_id", () => {
        return request(app)
          .get("/api/articles/not-a-valid-id/comments")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid input");
          });
      });
    });

    describe("Status 404", () => {
      it("should respond with an error when the article_id does not exist", () => {
        return request(app)
          .get("/api/articles/9999/comments")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Article not found");
          });
      });
    });
  });
  describe("POST", () => {
    describe("Status 201", () => {
      it("should add a comment to an article and return the posted comment", () => {
        const newComment = {
          username: "butter_bridge",
          body: "This is my comment!",
        };

        return request(app)
          .post("/api/articles/1/comments")
          .send(newComment)
          .expect(201)
          .then(({ body }) => {
            expect(body.comment).toHaveProperty("comment_id");
            expect(body.comment.author).toBe(newComment.username);
            expect(body.comment.body).toBe(newComment.body);
            expect(body.comment.article_id).toBe(1);
          });
      });
    });

    describe("Status 400", () => {
      it("should respond with an error if the comment body is missing", () => {
        const newComment = {
          username: "butter_bridge",
        };

        return request(app)
          .post("/api/articles/1/comments")
          .send(newComment)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid input"); // Or whatever error message you have set for this case.
          });
      });

      it("should respond with an error if the username is missing", () => {
        const newComment = {
          body: "This is my comment!",
        };

        return request(app)
          .post("/api/articles/1/comments")
          .send(newComment)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid input"); // Adjust as needed.
          });
      });
    });

    describe("Status 404", () => {
      it("should respond with an error if the article_id does not exist", () => {
        const newComment = {
          username: "butter_bridge",
          body: "This is my comment!",
        };

        return request(app)
          .post("/api/articles/9999/comments")
          .send(newComment)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Article not found");
          });
      });
    });
  });
});
