var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('buses',{
    bus_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique: true
    },
    bus_no:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    }
 

}
) 