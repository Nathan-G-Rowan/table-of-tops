const db = require("../db/connection");
const notFoundErrorObj = { status: 404, msg: "not found" };
const badRequestErrorObj = { status: 400, msg: "bad request" };

exports.selectCategories = () => {
  let categorySQLStr = `
      SELECT * FROM categories
    ;`;
  return db.query(categorySQLStr).then((categories) => categories.rows);
};

exports.selectReviews = (category, sort_by = "created_at", order = "desc") => {
  const argArr = [];
  let categoryInsert = category ? `WHERE reviews.category = $1` : "";
  if (category) argArr.push(category);

  const validSortColumns = [
    "title",
    "category",
    "designer",
    "owner",
    "created_at",
    "votes",
  ];
  if (!validSortColumns.includes(sort_by))
    return Promise.reject(badRequestErrorObj);
  const sortByInsert = `reviews.${sort_by}`;

  if (order.toUpperCase() !== "ASC" && order.toUpperCase() !== "DESC")
    return Promise.reject(badRequestErrorObj);
  const orderInsert = order.toUpperCase();

  const reviewSQL = `
    SELECT
      reviews.*,
      CAST( 
        COUNT(comments.comment_id)
        AS int)
        AS comment_count
    FROM reviews
    LEFT JOIN comments
      ON comments.review_id = reviews.review_id
    ${categoryInsert}
    GROUP BY reviews.review_id
    ORDER BY ${sortByInsert} ${orderInsert}
  ;`;
  return db.query(reviewSQL, argArr).then((reviews) => reviews.rows);
};
exports.selectReviewById = (id) => {
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
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id
  ;`;
  return db.query(reviewSQLStr, [id]).then(({ rows: reviews }) => {
    if (reviews.length === 0) return Promise.reject(notFoundErrorObj);

    return reviews[0];
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
  return db.query(reviewSQLStr, [incVotes, id]).then(({ rows: review }) => {
    if (review.length === 0) return Promise.reject(notFoundErrorObj);
    else return review[0];
  });
};
exports.insertReview = (postBody) => {
  const reviewInsertSQL = `
    INSERT INTO reviews (owner, title, review_body, designer, category)
    VALUES ($1, $2, $3, $4, $5) RETURNING *
  ;`;
  inputArr = [
    postBody.owner,
    postBody.title,
    postBody.review_body,
    postBody.designer,
    postBody.category,
  ];

  if (inputArr.includes(undefined)) return Promise.reject(badRequestErrorObj);

  return db
    .query(reviewInsertSQL, inputArr)
    .then(({ rows: review }) => review[0]);
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
    INSERT INTO comments (body, author, review_id)
    VALUES ($1, $2, $3) RETURNING *
  ;`;
  inputArr = [postBody.body, postBody.username, id];

  return db
    .query(commentInsertSQLStr, inputArr)
    .then((comments) => comments.rows[0]);
};
exports.deleteComment = (id) => {
  if (Number(id) === NaN) return Promise.reject(badRequestErrorObj);

  const deleteCommentSQL = `
  DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *
  ;`;
  return db.query(deleteCommentSQL, [id]).then(({ rows: removed }) => {
    if (removed.length === 0) return Promise.reject(notFoundErrorObj);
    return;
  });
};
exports.updateComment = (id, incVotes) => {
  if (!incVotes) return Promise.reject(badRequestErrorObj);

  let commentUpdateSQL = `
    UPDATE comments
    SET votes = votes + $1
    WHERE comment_id = $2
    RETURNING *
  ;`;
  return db
    .query(commentUpdateSQL, [incVotes, id])
    .then(({ rows: comment }) => {
      if (comment.length === 0) return Promise.reject(notFoundErrorObj);
      return comment[0];
    });
};

exports.selectUsers = () => {
  let userSQLStr = `
    SELECT * 
    FROM users
  ;`;
  return db.query(userSQLStr).then((users) => users.rows);
};
exports.selectUserById = (id) => {
  const userSelectSQL = `
    SELECT * FROM users
    WHERE users.username = $1
  ;`;
  return db.query(userSelectSQL, [id]).then(({ rows: users }) => {
    if (users.length === 0) return Promise.reject(notFoundErrorObj);
    return users[0];
  });
};
