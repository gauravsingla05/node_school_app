var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('class_work',{
   class_work_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    subject_name:{
        type:Sequelize.STRING,
        
    },
    class_work_desc:{
        type:Sequelize.STRING,
        
    },
    class_work_date:{
        type:Sequelize.STRING,
    },
    class_work_section_id:{
        type:Sequelize.INTEGER,
        
    },
}
) 