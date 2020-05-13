var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
var work_detail = require('sequelize-json'),
        db,
        class_work;


module.exports = sequelize.define('class_work',{
    class_work_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique: true
    },
    class_section_id:{ 
        type:Sequelize.INTEGER,
      },
    class_work_date:{
        type:Sequelize.STRING,
    },
    work_detail: work_detail(sequelize, 'class_work', 'work_detail')

}
) 