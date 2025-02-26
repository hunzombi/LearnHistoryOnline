const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
.then(() => console.log("Database connected"))
.catch((err) => console.log("Database connection error:", err));

module.exports = { sequelize };