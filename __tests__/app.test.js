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
        expect(msg).toBe("path not found");
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

describe("GET /api/reviews", () => {
  test("200: retrieves list of reviews from database", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body: { reviews } }) => {
        expect(reviews).toHaveLength(13);

        reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              designer: expect.any(String),
              comment_count: expect.any(Number),
            })
          );

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
        expect(reviews).toBeSortedBy(reviews.created_at, {
          descending: true,
          coerce: true,
        });
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("200: retrieves reviews from valid id", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body: { review } }) => {
        expect(review).toEqual(
          expect.objectContaining({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            designer: expect.any(String),
          })
        );
      });
  });
  test("400: review id is not of a correct type", () => {
    return request(app)
      .get("/api/reviews/sponge")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("bad request");
      });
  });
  test("404: review id not found", () => {
    return request(app)
      .get("/api/reviews/-1")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("not found");
      });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  test("200: retrieves list of comments from specified review", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toHaveLength(3);

        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(Date),
              author: expect.any(String),
              body: expect.any(String),
              review_id: expect.any(Number),
            })
          );
        });
      });
  });
});
