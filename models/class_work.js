var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('class_work',{
    class_work_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique: true
    },
    class_work_sub:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    class_work_discription:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    class_section_id:{
        type:Sequelize.INTEGER,
      },
    class_work_date:{
        type:Sequelize.STRING,
    }  

}
) 