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
            type: DataTypes.DATE
        },   
            
    }, {
        modelName: 'biodataUser',
        tableName: 'biodata_user',
        underscored: true,
        updatedAt:true
    })

    async getModel(){
        return this.#model
    }
};

const biodataUser = new BiodataUser()
module.exports = { biodataUser }
