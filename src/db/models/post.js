"use strict";
const { Model } = require("sequelize");
const db = require("../../db/models");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "user_id" });
      this.hasMany(models.posts_likes, { foreignKey: "post_id", as: "likes" });
    }
  }
  Post.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: { tableName: "Users" },
          key: "id",
        },
      },
      text: DataTypes.STRING,
      total_likes: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue("total_likes");
        },
        set(value) {
          this.setDataValue("total_likes", value);
        },
      },
    },
    {
      sequelize,
      modelName: "post",
    }
  );

  return Post;
};
