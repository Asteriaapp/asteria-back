const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db.config');

const Campaign = sequelize.define('Campaign', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    maxPlayers: {
        type: DataTypes.INTEGER,
        defaultValue: 4,
    }
});

module.exports = Campaign;
