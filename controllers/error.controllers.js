exports.handle404Paths = (request, response, next) => {
  response.status(404).send({ msg: "Path not Found!" });
};
