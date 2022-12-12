const {
  selectCategories,
  selectReviews,
  selectReviewById,
} = require("../models/app.models");

exports.getCategories = (request, response, next) => {
  selectCategories().then((categories) => {
    response.status(200).send({ categories });
  });
};

exports.getReviews = (request, response, next) => {
  selectReviews().then((reviews) => {
    response.status(200).send({ reviews });
  });
};

exports.getReviewById = (request, response, next) => {
  selectReviewById(request.params.review_id).then((reviews) => {
    response.status(200).send({ reviews });
  });
};
