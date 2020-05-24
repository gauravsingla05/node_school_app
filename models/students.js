var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('students',{
    student_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    student_roll_no:{
        type:Sequelize.STRING,
        },
    student_name:{
        type:Sequelize.STRING,
    },
    student_father_name:{
        type:Sequelize.STRING,
    },
    student_mother_name:{
        type:Sequelize.STRING,
    },
    student_class:{
        type:Sequelize.STRING,
    },
    student_section_id:{
        type:Sequelize.STRING,
    
    },
    student_dob:{
        type:Sequelize.STRING,

    },
    student_address:{
        type:Sequelize.STRING,
    },
    student_parents_phone:{ 
        type:Sequelize.STRING,
    },
    student_adhaar:{
        type:Sequelize.STRING,
    },
    student_admsn_no:{
        type:Sequelize.STRING,
    },
    student_gender:{
        type:Sequelize.STRING,
    },
    student_dp:{
        type:Sequelize.TEXT,
    },
    student_username:{
        type:Sequelize.STRING
    },
    student_fcm_token:{
        type:Sequelize.TEXT
    },
    
}
) 