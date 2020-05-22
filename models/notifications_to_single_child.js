var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('single_student_notification',{
    single_student_notification_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique: true
    },
    notification:{
        type:Sequelize.TEXT,
        allowNull: false,
    },
    student_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
     
    },
    teacher_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
      
    },
    single_student_notification_date:{
        type:Sequelize.STRING,
    }
    
}
)