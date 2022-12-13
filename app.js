const express = require("express");
const {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsByReviewId,
} = require("./controllers/app.controllers");
const {
  handle404Paths,
  handleCustomError,
  handleSQLError,
  handle500Error,
} = require("./controllers/error.controllers");

const app = express();

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);

app.all("*", handle404Paths);

app.use(handleCustomError);
app.use(handleSQLError);
app.use(handle500Error);

module.exports = app;
