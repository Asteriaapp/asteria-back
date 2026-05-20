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
    nickname: {
        type: DataTypes.STRING,
    },
    archetype: {
        type: DataTypes.STRING,
    },
    recommendedClasses: {
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

module.exports = Race;
