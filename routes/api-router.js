const apiRouter = require("express").Router();
const reviewsRouter = require("./reviews-router");
const usersRouter = require("./users-router");
const {
  getEndpoints,
  getCategories,
  deleteCommentById,
} = require("../controllers/app.controllers");

apiRouter.get("/", getEndpoints);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.get("/categories", getCategories);
apiRouter.delete("/comments/:comment_id", deleteCommentById);

module.exports = apiRouter;
