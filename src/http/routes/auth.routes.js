const { Router } = require("express");
const AuthController = require("../../controllers/auth_controller");
const { isEmailTaken, isEmail } = require("../middlewares/dbValidator");

module.exports = (mainRouter = Router()) => {
  const authRouter = Router();
  const controller = new AuthController();
  authRouter.post("/sign_up", [isEmail("checkIfTaken")], controller.signUp);
  authRouter.post("/login", [isEmail("checkIfExists")], controller.login);
  // Assign user router to the path /users
  mainRouter.use("/auth", authRouter);
};
