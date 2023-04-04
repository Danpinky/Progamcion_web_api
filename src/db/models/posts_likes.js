"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostsLikes extends Model {
    static associate(models) {
      this.belongsTo(models.post, { foreignKey: "post_id" });
      this.belongsTo(models.user, { foreignKey: "user_id" });
    }
  }
  PostsLikes.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: { tableName: "users" },
          key: "id",
        },
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: { tableName: "posts" },
          key: "id",
        },
      },
      user_full_name: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue("user_full_name");
        },
        set(value) {
          this.setDataValue("user_full_name", value);
        },
      },
    },
    {
      sequelize,
      modelName: "posts_likes",
    }
  );
  return PostsLikes;
};
