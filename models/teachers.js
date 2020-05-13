var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('teachers',{
   teacher_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
  
    teacher_name:{
        type:Sequelize.STRING,
    },
    teacher_email:{
        type:Sequelize.STRING,
    },
    teacher_pass:{
        type:Sequelize.STRING,
    },
    teacher_dob:{
        type:Sequelize.STRING,

    },
    teacher_address:{
        type:Sequelize.STRING,
    },
    teacher_phone:{
        type:Sequelize.STRING,
    },
    teacher_dp:{
        type:Sequelize.TEXT,
    },
    teacher_fcm_token:{
        type:Sequelize.TEXT
    },
}
) 