var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('notices',{
    notice_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    notice_title:{
        type:Sequelize.TEXT,
        
    },
    notice_description:{
        type:Sequelize.TEXT
    },
    notice_display_date:{
      type:Sequelize.STRING  
    },
    notice_author:{
      type:Sequelize.STRING  
    },
}
) 