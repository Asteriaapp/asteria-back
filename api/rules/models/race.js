const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db.config');

const Race = sequelize.define('Race', {
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
    }
});

module.exports = Race;
