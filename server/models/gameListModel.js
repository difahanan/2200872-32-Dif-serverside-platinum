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

            },            
            gameType: {
                type: DataTypes.STRING


            }
        }, {
            tableName: 'gamelist',
            updatedAt: false,

            createdAt: false,
            underscored: true

        });

    //=== QUERY
    async getGameList() {
        const data = await this.#model.findAll({ raw: true });
        return data;
    }


    async getTrendingGameList() {
        const data = await this.#model.findAll({ 
            where: {gameType: "trending"},
            order: [["gameId", "ASC"]],
            limit: 3,
            raw: true });
        return data;
    }

    async getPopularGameList() {
        const data = await this.#model.findAll({ 
            where: {gameType: "popular"},
            order: [["gameId", "ASC"]],
            limit: 5,
            raw: true });
        return data;
    }

    async getComingSoonGameList() {
        const data = await this.#model.findAll({ 
            where: {gameType: "comingsoon"},
            order: [["gameId", "ASC"]],
            limit: 3,
            raw: true });
        return data;
    }
};

const gameListModel = new GameList();
module.exports = { gameListModel }