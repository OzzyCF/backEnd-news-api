const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");

afterAll(() => {
  db.end();
});

describe("GET /api/topics", () => {
  test("should respond with an array of topics", async () => {
    const response = await request(app).get("/api/topics");
    expect(response.statusCode).toBe(200);
    expect(response.body.topics).toBeArray();
    expect(response.body.topics[0]).toContainKeys(["slug", "description"]);
  });
});
