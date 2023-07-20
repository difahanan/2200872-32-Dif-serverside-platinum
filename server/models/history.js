const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');


class History {
    #model = sequelize.define('history', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userSkor: {
            type: DataTypes.INTEGER
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        tableName: 'history',
        underscored: true,
        updatedAt:false
    })

    async getModel(){
        return this.#model
    }
};

const historyUser = new History()
module.exports = { historyUser }
