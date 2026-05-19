const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.ASTERIA_DB_NAME,
    process.env.ASTERIA_DB_USER,
    process.env.ASTERIA_DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'asteria-db',
        port: 5432,
        dialect: 'postgres',
    }
);

module.exports = sequelize;
