var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('leaves',{
   leave_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
  
    leave_reason:{
        type:Sequelize.STRING,
    },
    leave_by_student:{
        type:Sequelize.STRING,
    },
    leave_from_date:{
        type:Sequelize.STRING,
    },
    leave_upto_date:{
        type:Sequelize.STRING,

    },
    leave_incharge_teacher:{
        type:Sequelize.STRING,
    },
    leave_status:{
        type:Sequelize.STRING,
    },
    student_dp:{
        type:Sequelize.TEXT,
    },
    student_roll_no:{
        type:Sequelize.STRING,
        },
        student_name:{
            type:Sequelize.STRING,
        },
}
) 