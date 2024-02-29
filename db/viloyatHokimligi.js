const { DataTypes } = require("sequelize");
const { sequelize } = require("../core/db");

const ViloyatHokimligi = sequelize.define(
    "viloyat-hokimligi",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = ViloyatHokimligi;
