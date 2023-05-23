'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user_games extends Model {
    static associate(models) {
      user_games.hasOne(models.user_game_biodata, { foreignKey: 'id' });
    }
  }

  user_games.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userID: {
      type: DataTypes.STRING
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_games',
    tableName: 'user_games',
    timestamps: true
  });

  return user_games;
};
