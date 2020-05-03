var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('admin',{
    admin_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    email:{
        type:Sequelize.STRING,
        unique: true,
        allowNull: false, 
    },

    password:{
        type:Sequelize.STRING
    }
}
)


