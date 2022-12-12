exports.handle404Paths = (request, response, next) => {
  response.status(404).send({ msg: "Path not Found!" });
};
exports.handle500Paths = (error, request, response, next) => {
  console.log(error);
  response.status(500).send({ msg: "internal server error" });
};