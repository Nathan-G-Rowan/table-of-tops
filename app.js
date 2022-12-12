const express = require("express");
const {getCategories,getReviewById} = require("./controllers/app.controllers")
const {handle404Paths} = require("./controllers/error.controllers")

const app = express();

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);
app.all("*", handle404Paths);

module.exports = app;