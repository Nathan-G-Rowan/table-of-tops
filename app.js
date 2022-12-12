const express = require("express");
const {getCategories} = require("./controllers/app.controllers")
const {handle404Paths} = require("./controllers/error.controllers")

const app = express();

app.get("/api/categories", getCategories);

app.all("*", handle404Paths);

module.exports = app;