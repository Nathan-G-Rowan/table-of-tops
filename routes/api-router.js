const apiRouter = require("express").Router();
const reviewsRouter = require("./reviews-router")
const {
  getEndpoints,
  getCategories,
  deleteCommentById,
  getUsers,
} = require("../controllers/app.controllers");

apiRouter.get("/", getEndpoints);
apiRouter.use("/reviews", reviewsRouter)

apiRouter.get("/categories", getCategories);
apiRouter.delete("/comments/:comment_id", deleteCommentById);
apiRouter.get("/users", getUsers);

module.exports = apiRouter;
