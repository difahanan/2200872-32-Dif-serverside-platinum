'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user_game_biodata extends Model {
    static associate(models) {
      user_game_biodata.belongsTo(models.user_games, { foreignKey: 'id' });
    }
  }

  user_game_biodata.init({
    email: DataTypes.STRING,
    asal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_game_biodata',
  });

  return user_game_biodata;
};
