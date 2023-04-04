const db = require("../db/models");
class PostController {
  // Create a new post
  async createPost(req, res) {
    const { id: user_id } = req.user;
    const { text } = req.body;
    const post = await db.post.create({ user_id, text });
    return res.status(201).json({
      message: "Post created successfully.",
      data: post,
    });
  }
  // Get all posts
  async getPosts(req, res) {
    let posts = await db.post.findAll({
      include: [
        {
          model: db.user,
          attributes: ["full_name", "name", "surname", "email"],
        },
        {
          model: db.posts_likes,
          as: "likes",
          include: {
            model: db.user,
            attributes: ["full_name", "name", "surname", "email"],
          },
        },
      ],
    });
    posts = await Promise.all(
      posts.map(async (post) => {
        const postJson = post.toJSON();
        postJson.likes = postJson.likes.map((like) => {
          const { user, createdAt, updatedAt, ...rest } = like;
          const { full_name, email } = user;
          return {
            ...rest,
            user_full_name: full_name,
            user_email: email,
          };
        });
        postJson.total_likes = postJson.likes.length;
        return postJson;
      })
    );
    return res.status(200).json({
      data: posts,
    });
  }
  // Add a like to a post
  async addLikeToPost(req, res) {
    const { id: user_id } = req.user;
    const { postId: post_id } = req.params;
    const post = await db.posts_likes.findOne({ where: { user_id, post_id } });
    if (post) {
      await post.destroy();
    } else {
      await db.posts_likes.create({ user_id, post_id });
    }
    return res.sendStatus(204);
  }
}

module.exports = PostController;
