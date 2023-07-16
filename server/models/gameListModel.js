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
            gameImageUrl: {
                type: DataTypes.STRING
            }
        }, {
            tableName: 'gamelist',
            updatedAt: false,
            createdAt: false
        });

    //=== QUERY
    async getGameList() {
        const data = await this.#model.findAll({ raw: true });
        return data;
    }
};

const gameListModel = new GameList();
module.exports = { gameListModel }