var Sequelize = require('sequelize')
var sequelize = require('../utils/database')
module.exports = sequelize.define('logins',{
    login_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique: true
    },
    username:{
        type:Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    pass:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    status:{
        type:Sequelize.STRING,
    },
    teacher_id:{
        type:Sequelize.INTEGER,
        defaultValue: 0,
    },
    student_id:{
        type:Sequelize.INTEGER,
        defaultValue: 0,
    }
}
)