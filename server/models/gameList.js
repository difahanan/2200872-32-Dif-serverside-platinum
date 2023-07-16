const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

class GameList {
    #model = sequelize.define('gamelist', {
        gameid: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        gameName: { 
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        gameDescription: {
            type: DataTypes.STRING
        },
        gameImageurl: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'gamelist',
        updatedAt: false,
        createdAt: false
    })

    
};

const gameList = new GameList()
module.exports = { gameList }