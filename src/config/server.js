const express = require("express");
const { Router } = express;
const cors = require("cors");
const { readdirSync } = require("fs");
const db = require("../db/models");
class Server {
  constructor() {
    this.port = process.env.PORT || 3001;
    this.app = express();
  }

  setUpRoutes() {
    const router = Router();
    console.log(`${__dirname}/../http/routes`);
    this.app.use("/api", router);
    Promise.all(
      readdirSync(`${__dirname}/../http/routes`).map((file) => {
        if (!file.includes(".test.")) {
          require(`../http/routes/${file}`)(router);
        }
      })
    );
  }

  setUpMiddlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "*",
        methods: "GET, POST, PUT, PATCH, DELETE",
      })
    );
  }

  connectDB() {
    db.sequelize
      .authenticate()
      .then(() => {
        console.log("DB Online");
      })
      .catch((error) => console.log(error));
    db.sequelize.sync({ alter: true }).then(() => {});
  }

  startListening() {
    this.connectDB();
    this.setUpMiddlewares();
    this.setUpRoutes();
    this.http = this.app.listen(this.port, () => {
      console.log(`API is listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
