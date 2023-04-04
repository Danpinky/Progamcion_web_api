const db = require("../db/models");
const { compareSync } = require("bcryptjs");
const { createJwt } = require("../helpers/jwt");
class AuthController {
  async signUp(req, res) {
    const newUser = await db.user.create(req.body);
    const { createdAt, updatedAt, ...rest } = newUser.withoutPassword;
    const token = createJwt(rest);
    res.json({
      message: "User created successfully.",
      data: { user: rest, token },
    });
  }

  async login(req, res) {
    const { email: emailProvided, password } = req.body;
    if (!emailProvided || !password) {
      return res.json({
        message: "Missing credentials.",
      });
    }
    const user = await db.user.findOne({ where: { email: emailProvided } });
    const isPasswordCorrect = compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Invalid user credentials.",
      });
    }
    const { createdAt, updatedAt, ...rest } = user.withoutPassword;
    const token = createJwt(rest);
    return res.json({ data: { user: rest, token } });
  }
}

module.exports = AuthController;
