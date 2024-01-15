const { DataTypes } = require("sequelize");
const { sequelize } = require("../core/db");

const Siyosat = sequelize.define(
  "siyosat",
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
      type: DataTypes.UUID, // Assuming your category IDs are UUIDs
      allowNull: false,
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

module.exports = Siyosat;
