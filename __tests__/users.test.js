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

describe("/api/users", () => {
  describe("GET", () => {
    describe("Status 200", () => {
      it("should return all users with the correct properties", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body }) => {
            // Check if it's an array
            expect(body.users).toBeInstanceOf(Array);
            // Check the properties of the first user object as a sample
            expect(body.users[0]).toHaveProperty("username");
            expect(body.users[0]).toHaveProperty("name");
            expect(body.users[0]).toHaveProperty("avatar_url");
          });
      });
    });
    describe("Status 404", () => {
      it("should return 404 for non-existent user", () => {
        return request(app)
          .get("/api/users/nonExistentUser123")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Route Not Found");
          });
      });

      it("should return 404 for invalid request body", () => {
        return request(app)
          .post("/api/users")
          .send({ invalidField: "value" })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Route Not Found");
          });
      });
    });
  });
});
