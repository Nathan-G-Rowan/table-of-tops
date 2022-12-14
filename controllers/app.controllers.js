const {
  selectCategories,

  selectReviews,
  selectReviewById,
  updateReview,

  selectCommentsByReviewId,
  insertComment,

  selectUsers,
} = require("../models/app.models");

exports.getCategories = (request, response, next) => {
  selectCategories()
    .then((categories) => {
      response.status(200).send({ categories });
    })
    .catch(next);
};

exports.getReviews = (request, response, next) => {
  const categoryQuery = request.query.category;
  const sortByQuery = request.query.sort_by;
  const orderQuery = request.query.order;
  selectReviews(categoryQuery, sortByQuery, orderQuery)
    .then((reviews) => {
      response.status(200).send({ reviews });
    })
    .catch(next);
};
exports.getReviewById = (request, response, next) => {
  selectReviewById(request.params.review_id)
    .then((review) => {
      response.status(200).send({ review });
    })
    .catch(next);
};
exports.patchReview = (request, response, next) => {
  updateReview(request.params.review_id, request.body.inc_votes)
    .then((review) => {
      response.status(200).send({ review });
    })
    .catch(next);
};

exports.getCommentsByReviewId = (request, response, next) => {
  const reviewId = request.params.review_id;

  const promises = [];
  promises.push(selectReviewById(reviewId));
  promises.push(selectCommentsByReviewId(reviewId));

  Promise.all(promises)
    .then(([review, comments]) => {
      response.status(200).send({ comments });
    })
    .catch(next);
};
exports.postComment = (request, response, next) => {
  const reviewId = request.params.review_id;

  insertComment(reviewId, request.body)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch(next);
};

exports.getUsers = (request, response, next) => {
  selectUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch(next);
};
