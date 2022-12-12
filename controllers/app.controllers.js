const { selectCategories, selectReviewById } = require("../models/app.models");

exports.getCategories = (request, response, next) => {
  selectCategories().then((categories) => {
    response.status(200).send({ categories });
  });
};

exports.getReviewById = (request, response, next) => {
  selectReviewById(param.review_id).then((review) => {
    response.status(200).send({ review });
  });
};
