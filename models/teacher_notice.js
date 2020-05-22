var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('teacher_notice',{
    teacher_notification_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique: true
    },
    teacher_notification:{
        type:Sequelize.TEXT,
        allowNull: false,
    },
    teacher_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
      
    },
    teacher_notice_date:{
        type:Sequelize.STRING,
    }
    
}
)