const { DataTypes } = require("sequelize");
const { sequelize } = require("../core/db");

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
    tuman: {
      type: DataTypes.STRING,
      defaultValue: null,
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

module.exports = Post;
