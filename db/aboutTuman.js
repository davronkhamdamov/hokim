const { DataTypes } = require("sequelize");
const { sequelize } = require("../core/db");

const AboutTuman = sequelize.define(
    "aboutTuman",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        tuman: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    message: "Tuman is required",
                },
            },
        },
        maydon: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notNull: {
                    message: "Yer maydoni is required",
                },
            },
        },
        numberOfPeople: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notNull: {
                    message: "Aholi soni required",
                },
            },
        },
        numberOfFemales: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notNull: {
                    message: "Xotin-qizlar soni is required",
                },
            },
        },
        numberOfMans: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notNull: {
                    message: "Erkaklar soni is required",
                },
            },
        },
        numberOfAdults: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notNull: {
                    message: "Yoshlar soni is required",
                },
            },
        },
        numberOfBoys: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notNull: {
                    message: "Bolalar soni is required",
                },
            },
        },
        numberOfPupils: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notNull: {
                    message: "O'quvchilar soni is required",
                },
            },
        },
        numberOfRetirees: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notNull: {
                    message: "Nuroniylar soni is required",
                },
            },
        },
        numberOfDisabledPeople: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notNull: {
                    message: "Nogironlar soni is required",
                },
            },
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
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

module.exports = AboutTuman;
