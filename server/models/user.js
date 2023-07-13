const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

class User {
    #model = sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
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

const user = new User()
module.exports = { user }