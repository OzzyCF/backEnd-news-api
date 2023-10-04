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

describe("/api/comments", () => {
  describe("DELETE", () => {
    describe("Status 204", () => {
      it("should delete a comment by its comment_id and return no content", () => {
        const commentToDeleteId = 1;
        return request(app)
          .delete(`/api/comments/${commentToDeleteId}`)
          .expect(204)
          .then(() => {
            return request(app)
              .get(`/api/comments/${commentToDeleteId}`)
              .expect(404);
          });
      });
    });

    describe("Status 404", () => {
      it("should return an error if the comment_id does not exist", () => {
        const nonExistentCommentId = 9999;
        return request(app)
          .delete(`/api/comments/${nonExistentCommentId}`)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Comment not found");
          });
      });
    });

    describe("Status 400", () => {
      it("should return an error if the comment_id is invalid", () => {
        const invalidCommentId = "invalid"; // Invalid format for comment_id
        return request(app)
          .delete(`/api/comments/${invalidCommentId}`)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid input");
          });
      });
    });
  });
});
