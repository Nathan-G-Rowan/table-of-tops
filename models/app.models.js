const db = require("../db/connection");

exports.selectCategories = () => {
  let categorySQLStr = `
      SELECT * FROM categories
    ;`;
  return db.query(categorySQLStr).then((categories) => categories.rows);
};

exports.selectReviews = () => {
  let reviewSQLStr = `
    SELECT
      reviews.*,
      CAST( 
        COUNT(comments.comment_id)
        AS int)
        AS comment_count
    FROM reviews
    LEFT JOIN comments
      ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.created_at DESC
  ;`;
  return db.query(reviewSQLStr).then((reviews) => reviews.rows);
};
