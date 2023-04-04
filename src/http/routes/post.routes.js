const { Router } = require("express");
const PostController = require("../../controllers/post.controller");
const { isPost } = require("../middlewares/dbValidator");
const { verifyJwt } = require("../middlewares/jwtVerifier");

module.exports = (mainRouter = Router()) => {
  const postRouter = Router();
  const controller = new PostController();
  postRouter.post("/", [verifyJwt], controller.createPost);
  postRouter.post("/:postId/likes", [isPost], controller.addLikeToPost);
  postRouter.get("/", controller.getPosts);
  mainRouter.use("/posts", postRouter);
};
