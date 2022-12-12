const app = require("../app");
const db = require("../db/connection");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("undefined paths", () => {
  test("404: Path not Found", () => {
    return request(app)
      .get("/beApi")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Path not Found!");
      });
  });
});
