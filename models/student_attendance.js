var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('student_attendance',{
    att_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique: true,
    },
    student_id:{
        type:Sequelize.INTEGER,
        
        
    },
    status:{
        type:Sequelize.STRING,
        defaultValue:'holiday' 
    },
    date:{
        type:Sequelize.STRING
    }
}
) 