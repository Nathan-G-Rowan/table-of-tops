const express = require("express");
const {
  getCategories,
  getReviews,
  getReviewById,
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

app.all("*", handle404Paths);

app.use(handleCustomError);
app.use(handleSQLError);
app.use(handle500Error);

module.exports = app;
