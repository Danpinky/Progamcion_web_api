const db = require("../db/models");
class UserController {
  welcome(req, res) {
    res.json({
      message: "Hello world",
    });
  }
}

module.exports = UserController;
