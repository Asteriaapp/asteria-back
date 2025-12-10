const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db.config');

const Table = sequelize.define('Table', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
    },
    campaign_id: {
        type: DataTypes.UUID,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    table_code: {
        type: DataTypes.STRING,
    }
});

module.exports = Class;
