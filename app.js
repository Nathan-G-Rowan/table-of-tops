const express = require("express");
const {getCategories} = require("./controllers/app.controllers")

const app = express();

app.get("/ap/categories", getCategories);

module.exports = app;