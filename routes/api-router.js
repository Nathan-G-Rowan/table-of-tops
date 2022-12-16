const apiRouter = require("express").Router();
const reviewRouter = require("./review-router");
const userRouter = require("./user-router");
const commentRouter = require("./comment-router");

const {
  getEndpoints,
  getCategories,
} = require("../controllers/app.controllers");

apiRouter.get("/", getEndpoints);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/comments", commentRouter);

apiRouter.get("/categories", getCategories);

module.exports = apiRouter;
