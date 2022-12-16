const express = require("express");
const {
  handle404Paths,

  handleCustomError,
  handleSQLError,
  handle500Error,
} = require("./controllers/error.controllers");

const apiRouter = require("./routes/api-router")

const app = express();
app.use(express.json());

app.use("/api", apiRouter)

app.all("*", handle404Paths);

app.use(handleCustomError);
app.use(handleSQLError);
app.use(handle500Error);

module.exports = app;
