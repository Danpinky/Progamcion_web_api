"use strict";
const { Model } = require("sequelize");
const { genSaltSync, hashSync } = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.post, { foreignKey: "user_id" });
      this.hasMany(models.posts_likes, { foreignKey: "user_id" });
    }
    get withoutPassword() {
      const { password, ...rest } = this.toJSON();
      return rest;
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      full_name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.name} ${this.surname}`;
        },
        set(value) {
          throw new Error("Do not try to set the `full_name` value!");
        },
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  User.beforeCreate(async (user, options) => {
    const rawPassword = user.password;
    const salt = genSaltSync();
    const hashedPassword = hashSync(rawPassword, salt);
    user.password = hashedPassword;
  });
  return User;
};
