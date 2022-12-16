const reviewsRouter = require("express").Router();
const {
  getReviews,
  getReviewById,
  patchReview,

  getCommentsByReviewId,
  postComment,
} = require("../controllers/app.controllers");

reviewsRouter.get("/", getReviews);

reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReview);

reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(postComment);

module.exports = reviewsRouter;
