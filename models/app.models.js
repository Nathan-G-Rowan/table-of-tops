const db = require("../db/connection");

const notFoundErrorObj = { status: 404, msg: "not found" };
const badRequestErrorObj = { status: 400, msg: "bad request" };

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
exports.selectReviewById = (id) => {
  let reviewSQLStr = `
    SELECT * FROM reviews
    WHERE review_id = $1
  ;`;
  return db.query(reviewSQLStr, [id]).then((reviews) => {
    if (reviews.rows.length === 0) return Promise.reject(notFoundErrorObj);

    return reviews.rows[0];
  });
};
exports.updateReview = (id, incVotes) => {
  if (!incVotes) return Promise.reject(badRequestErrorObj);

  let reviewSQLStr = `
    UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *
  ;`;
  return db.query(reviewSQLStr, [incVotes, id]).then((review) => {
    if (review.rows.length === 0) return Promise.reject(notFoundErrorObj);
    else return review.rows[0];
  });
};

exports.selectCommentsByReviewId = (id) => {
  let reviewSQLStr = `
    SELECT * FROM comments
    WHERE review_id = $1
  ;`;
  return db.query(reviewSQLStr, [id]).then((comments) => comments.rows);
};
exports.insertComment = (id, postBody) => {
  const commentTime = new Date(Date.now());

  let commentInsertSQLStr = `
    INSERT INTO comments (body, author, review_id, votes, created_at)
    VALUES ($1, $2, $3, $4, $5) RETURNING *
  ;`;
  inputArr = [postBody.body, postBody.username, id, 0, commentTime];

  return db
    .query(commentInsertSQLStr, inputArr)
    .then((comments) => comments.rows[0]);
};
exports.deleteComment = (id) => {
  if (Number(id) === NaN) return Promise.reject(badRequestErrorObj);

  let deleteCommentSQL = `
  DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *
  ;`;
  return db.query(deleteCommentSQL, [id]).then((removed) => {
    if (removed.rows.length === 0) return Promise.reject(notFoundErrorObj);
  });
};

exports.selectUsers = () => {
  let userSQLStr = `
    SELECT * 
    FROM users
  ;`;
  return db.query(userSQLStr).then((users) => users.rows);
};
