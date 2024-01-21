const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(process.env.POSTGRES_URL, { logging: false });
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = { sequelize };
