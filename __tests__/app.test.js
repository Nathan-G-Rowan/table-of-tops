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

describe("GET /api/categories", () => {
  test("200: retrieves categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)

      .then(({ body: { categories } }) => {
        expect(categories).toHaveLength(4);

        categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe.only("GET /api/reviews", () => {
  test("200: retrieves list of reviews from database", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body: { reviews } }) => {
        expect(reviews).toHaveLength(13);
      });
  });
  test("200: retrieved reviews contain a comment_count representing the number of comments that reference that review", () => {
    return request(app)
      .get("/api/reviews")
      .then(({ body: { reviews } }) => {
        reviews.forEach((review) => {
          const id = review.review_id;
          const commentCount = review.comment_count;
          if (id == 2 || id == 3) expect(commentCount == 3);
          else expect(commentCount == 0);
        });
      });
  });
  test("200: reviews are sorted by newest first", () => {
    return request(app)
      .get("/api/reviews")
      .then(({ body: { reviews } }) => {
        expect(reviews[0].created_at).toBe("2021-01-25T11:16:54.963Z");
        expect(reviews[reviews.length - 1].created_at).toBe(
          "1970-01-10T02:08:38.400Z"
        );
      });
  });
});
