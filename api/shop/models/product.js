const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db.config');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    category: {
        type: DataTypes.STRING,
    }
});

module.exports = Product;
