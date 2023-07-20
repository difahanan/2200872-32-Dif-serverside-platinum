// PANGGIL CONFIG BUAT SEQUELIZE NYA
const { DataTypes } = require('sequelize')
const { sequelize } = require('../config')

// BIKIN CLASS UNTUK NYIMPAN MODEL NYA 
class UserModel {
    #model = sequelize.define('user',{
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false      
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'user',
        underscored: true
    })

    async insertData(email, username, password){
        const insertData = await this.#model.create({ email, username, password})
        return insertData
    }

    async getData(username){
        const data = await this.#model.findOne({
            where:{
                username
            },
            attributes: ['username', 'password', 'id'],
            raw: true
        })
        return data
    }

    async getDataByPk(userId){
        const data = await this.#model.findByPk(userId, {
            attributes: ['username', 'password', 'id'],
            raw: true
        })
        return data
    }

    async getDataByEmail(email) {
        const data = await this.#model.findOne({
          where: {
            email,
          },
          attributes: ['username', 'password', 'id'],
          raw: true,
        });
        return data;
      }      

    async getModel() {
        return this.#model
    }
}

// EXPORTS MODEL NYA
const userModel = new UserModel()
module.exports = { userModel }