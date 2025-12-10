const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db.config');

const Contact = sequelize.define('Contact', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports = Contact;
