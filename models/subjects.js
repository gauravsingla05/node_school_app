var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('subjects',{
   subject_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    subject_name:{
        type:Sequelize.STRING,
        
    },
    section_id:{
        type:Sequelize.INTEGER,
    }
}
) 