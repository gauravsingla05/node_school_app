var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('sections',{
    class_section_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    section_name:{
        type:Sequelize.STRING,
        
    },
    class_id:{
        type:Sequelize.INTEGER
    }
}
) 