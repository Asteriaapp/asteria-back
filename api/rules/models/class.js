const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db.config');

const Class = sequelize.define('Class', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    iconUrl: {
        type: DataTypes.STRING,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    }
});

module.exports = Class;
