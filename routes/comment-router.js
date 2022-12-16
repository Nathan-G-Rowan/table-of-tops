const commentRouter = require("express").Router();
const {
  deleteCommentById,
  patchCommentById,
} = require("../controllers/app.controllers");

commentRouter
  .route("/:comment_id")
  .delete(deleteCommentById)
  .patch(patchCommentById);

module.exports = commentRouter;
