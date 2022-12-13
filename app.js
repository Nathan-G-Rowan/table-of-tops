const express = require("express");
const {
  getCategories,

  getReviews,
  getReviewById,
  patchReview,

  getCommentsByReviewId,
  postComment,
} = require("./controllers/app.controllers");
const {
  handle404Paths,
  
  handleCustomError,
  handleSQLError,
  handle500Error,
} = require("./controllers/error.controllers");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);
app.patch("/api/reviews/:review_id", patchReview);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);
app.post("/api/reviews/:review_id/comments", postComment);

app.all("*", handle404Paths);

app.use(handleCustomError);
app.use(handleSQLError);
app.use(handle500Error);

module.exports = app;
