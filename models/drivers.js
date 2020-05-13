var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('drivers',{
   driver_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
  
    driver_name:{
        type:Sequelize.STRING,
    },
    driver_email:{
        type:Sequelize.STRING,
    },
    driver_pass:{
        type:Sequelize.STRING,
    },
    driver_dob:{
        type:Sequelize.STRING,

    },
    driver_address:{
        type:Sequelize.STRING,
    },
    driver_phone:{
        type:Sequelize.STRING,
    },
    driver_bus:{ 
        type:Sequelize.STRING,
    },
    driver_dp:{ 
        type:Sequelize.TEXT,
        defaultValue:'https://www.autobytesolutions.com/wp-content/uploads/2020/03/Rick-130x130.png' 
    },
    driver_fcm_token:{
        type:Sequelize.TEXT
    },
}
) 