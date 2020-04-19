var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('classes',{
    class_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique: true
    },
    class_name:{
        type:Sequelize.STRING,
        unique: true,
        allowNull: false,
    }
}
)