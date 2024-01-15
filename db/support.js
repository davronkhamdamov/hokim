const { DataTypes } = require("sequelize");
const { sequelize } = require("../core/db");

const Support = sequelize.define(
  "support",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    name: {
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

module.exports = Support;
