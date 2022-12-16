const reviewRouter = require("express").Router();
const {
  getReviews,
  getReviewById,
  patchReview,
  postReview,

  getCommentsByReviewId,
  postComment,
} = require("../controllers/app.controllers");

reviewRouter.route("/").get(getReviews).post(postReview);

reviewRouter.route("/:review_id").get(getReviewById).patch(patchReview);

reviewRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(postComment);

module.exports = reviewRouter;
