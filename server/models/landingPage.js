const { Sequelize } = require('sequelize')
const { col, fn, literal } = Sequelize

const { userModel } = require('../models/UserModel');
const { biodataUser } = require('../models/biodataUser');
const { historyUser } = require('../models/history');


class LandingPageModel {
    
    static async getUserData () {
        // get model from each table
        const userTable = await userModel.getModel();
        const biodataTable = await biodataUser.getModel();
        const historyTable = await historyUser.getModel();


        // create association
        userTable.hasOne(biodataTable, {foreignKey: "userId"});
        userTable.hasMany(historyTable, {foreignKey: "userId"});
        

        // get data for community table
        // image use random image until we can get image from firebase
        const dataUser = await userTable.findAll({
            attributes: [
                'id',
                'username',
                'email', 
                [col('"biodataUser"."umur"'), 'age'],
                [col('"biodataUser"."city"'), 'city'],
                [col('"biodataUser"."country"'), 'country'],
                [fn('sum', col('"histories"."user_skor"')), 'score'],
                [literal('CASE WHEN SUM(histories.user_skor) >= 200 THEN ' + "'gold' " + 
                    'WHEN SUM(histories.user_skor) BETWEEN 100 AND 199 THEN ' + "'silver' " + 
                    'ELSE ' + "'bronze' " + ' END'), 'rank'],
                [literal('CONCAT(' + "'https://source.unsplash.com/featured/'" + ', CAST("user"."id" as text))'), 'avatar']

            ],
            include: [
                {
                    model: biodataTable,
                    attributes: []
                },
                {
                    model: historyTable,
                    attributes: []
                }
            ],
            group: [
                [col('"user"."id"'), 'id'],
                'username',
                'email', 
                [col('"biodataUser"."umur"'), 'age'],
                [col('"biodataUser"."city"'), 'city'],
                [col('"biodataUser"."country"'), 'country']
            ],
            order: [["score", "DESC"]],
            raw: true
        })

        return dataUser
    }

}

module.exports = { LandingPageModel }