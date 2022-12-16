const userRouter = require("express").Router();
const { getUsers, getUserById } = require("../controllers/app.controllers");

userRouter.get("/", getUsers);
userRouter.get("/:username", getUserById);

module.exports = userRouter;
