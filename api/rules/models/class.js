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
    nickname: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
    },
    recommendedRaces: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    iconUrl: {
        type: DataTypes.STRING,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    }
});

module.exports = Class;
