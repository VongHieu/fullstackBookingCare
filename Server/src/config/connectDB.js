const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("booking_care", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: null,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = connectDB;