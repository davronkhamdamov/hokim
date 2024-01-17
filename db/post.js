const { DataTypes } = require("sequelize");
const { sequelize } = require("../core/db");
const PostCategory = require("./post_category");

const Post = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    field: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        isIn: [
          [
            "Ijtimoiy",
            "Iqtisodiyot",
            "Xotin qizlar",
            "Qishloq xo'jaligi",
            "OAV",
          ],
        ],
      },
    },
    decision: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  },
);
PostCategory.hasMany(Post, {
  foreignKey: "category_id",
});
Post.belongsTo(PostCategory, {
  foreignKey: "category_id",
});

module.exports = Post;
