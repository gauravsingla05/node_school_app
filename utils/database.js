var Sequelize = require('sequelize')
var config = require('../config/config')

var sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: 'mysql',
    define: { 
        timestamps: false
    }  
  });
module.exports = sequelize;

  