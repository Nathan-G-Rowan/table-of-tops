const db = require("../db/connection");

exports.selectCategories = () => {
  let categorySQLStr = `
    SELECT * FROM categories
    ;`;
  return db.query(categorySQLStr).then((categories) => {
    return categories.rows;
  });
};
