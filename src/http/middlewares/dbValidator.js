const db = require("../../db/models");
const isEmail =
  (whatFor = "") =>
  async (req, res, next) => {
    const { email } = req.body;
    const userWithEmail = await db.user.findOne({
      where: { email },
    });
    console.log({userWithEmail})
    switch (whatFor) {
      case "checkIfTaken":
        if (userWithEmail != null) {
          return res.status(400).json({
            error: "Email is already used.",
          });
        }
        break;
      case "checkIfExists":
        if (!userWithEmail) {
          return res.status(400).json({
            error: `Email was not found.`,
          });
        }
        break;
    }
    next();
  };

const isPost = async (req, res, next) => {
  const { postId } = req.params;
  const post = await db.post.findByPk(postId);
  console.log({ post });
  if (!post) {
    return res.status(404).json({
      error: "Post was not found.",
    });
  }
  next();
};

module.exports = {
  isEmail,
  isPost,
};
