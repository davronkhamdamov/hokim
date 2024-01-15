const { DataTypes } = require("sequelize");
const { sequelize } = require("../core/db");

const PublicInformation = sequelize.define(
  "public_information",
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

module.exports = PublicInformation;
