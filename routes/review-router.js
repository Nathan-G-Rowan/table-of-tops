const reviewRouter = require("express").Router();
const {
  getReviews,
  getReviewById,
  patchReview,

  getCommentsByReviewId,
  postComment,
} = require("../controllers/app.controllers");

reviewRouter.get("/", getReviews);

reviewRouter.route("/:review_id").get(getReviewById).patch(patchReview);

reviewRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(postComment);

module.exports = reviewRouter;
