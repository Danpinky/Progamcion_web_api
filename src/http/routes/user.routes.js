const { Router } = require("express");
const UserController = require("../../controllers/user.controller");
const { verifyJwt } = require("../middlewares/jwtVerifier");

module.exports = (mainRouter = Router()) => {
  const userRouter = Router();
  const controller = new UserController();
  userRouter.get("/welcome", controller.welcome);
  // Assign user router to the path /users
  mainRouter.use("/users", [verifyJwt], userRouter);
};
