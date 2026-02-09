const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'lab_report',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'sumit2712',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
    }
);

module.exports = sequelize;
