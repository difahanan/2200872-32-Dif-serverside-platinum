const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

class BiodataUser {
    #model = sequelize.define('biodataUser', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        umur: { 
            allowNull: false,
            type: DataTypes.INTEGER
        },
        city: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        createdAt: {
            allowNull: false,
            defaultValue: DataTypes.literal('NOW()'),
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            defaultValue: DataTypes.literal('NOW()'),
            type: DataTypes.DATE
        }
            
    })
};

const biodataUser = new BiodataUser()
module.exports = { biodataUser }