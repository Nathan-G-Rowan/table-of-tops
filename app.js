const express = require("express");
const {handle404Paths} = require("./controllers/error.controllers")

const app = express();

app.all("*", handle404Paths);

module.exports = app;