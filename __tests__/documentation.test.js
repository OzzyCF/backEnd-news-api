const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const endpoints = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("/api endpoint tests", () => {
  // to nest later endpoints if needed.
  describe("GET /api", () => {
    it("should return 200 and a JSON of all the available endpoints of the api", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("GET /api");
          expect(body["GET /api"]).toHaveProperty("description");
          expect(body["GET /api"].description).toBe(
            "serves up a json representation of all the available endpoints of the api"
          );
        });
    });
    it("should ensure the returned documentation matches the structure of endpoints.json", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          const returnedEndpoints = Object.keys(body);
          const expectedEndpoints = Object.keys(endpoints);

          expect(returnedEndpoints).toEqual(expectedEndpoints);
        });
    });
  });
});
