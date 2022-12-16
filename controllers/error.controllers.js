exports.handle404Paths = (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
};

exports.handleCustomError = (error, request, response, next) => {
  if (error.status && error.msg)
    response.status(error.status).send({ msg: error.msg });
  else next(error);
};
exports.handleSQLError = (error, request, response, next) => {
  if ((error.code == "22P02")) {
    response.status(400).send({ msg: "bad request" });
  } else next(error);
};
exports.handle500Error = (error, request, response, next) => {
  console.log(error);
  response.status(500).send({ msg: "internal server error" });
};
