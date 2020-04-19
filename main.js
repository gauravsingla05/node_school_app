const express = require('express')
const app = express()
const sequelizedb = require('./utils/database')
const routes = require('./routes/add_data')
const bodyparser = require('body-parser')
const path = require('path')
const CLASS = require('./models/classes')
const SECTIONS = require('./models/sections')
const STUDENTS = require('./models/students')
const ATTENDANCE = require('./models/student_attendance')
const TEACHER = require('./models/teachers')
const SINGLE_STUDENT_NOTIFICATION = require('./models/notifications_to_single_child')
const LOGINS = require('./models/logins')
const api_routes = require('./api/routes/api_get_data')
var http = require('http').createServer(app);
const socketio = require('socket.io')(http)


app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))

app.use('/public/uploads',express.static('./public/uploads'))
app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}))

app.use('/api',api_routes)
app.use('/',routes)






TEACHER.belongsTo(SINGLE_STUDENT_NOTIFICATION,{
    foreignKey:'teacher_id',
    onDelete: 'cascade' ,  
})

SINGLE_STUDENT_NOTIFICATION.hasMany(TEACHER,{
    foreignKey:'teacher_id',
    onDelete: 'cascade' ,
})


STUDENTS.belongsTo(SINGLE_STUDENT_NOTIFICATION,{
    foreignKey:'student_id',
    onDelete: 'cascade' ,  
})

SINGLE_STUDENT_NOTIFICATION.hasMany(STUDENTS,{
    foreignKey:'student_id',
    onDelete: 'cascade' ,
})


SECTIONS.belongsTo(CLASS,{
    foreignKey:'class_id',
    onDelete: 'cascade' ,
    })
    
    CLASS.hasMany(SECTIONS,{
        foreignKey:'class_id',
        onDelete: 'cascade' ,
    })



    TEACHER.belongsTo(LOGINS,{
        foreignKey:'teacher_id',
        onDelete: 'cascade' ,
        })
        
        LOGINS.hasMany(TEACHER,{
            foreignKey:'teacher_id',
            onDelete: 'cascade' ,
        })

    STUDENTS.belongsTo(LOGINS,{
        foreignKey:'student_id',
        onDelete: 'cascade' ,
        })
            
    LOGINS.hasMany(STUDENTS,{
    foreignKey:'student_id',
    onDelete: 'cascade' ,
            }) 

socketio.on("connection", (userSocket) => {
    console.log('===>userSocket new')
     userSocket.on("send_notification", (data) => {
         console.log('===>User Connected')
        userSocket.broadcast.emit("receive_notifications", data)
                })
            })

 const PORT = process.env.PORT || 3000;
sequelizedb.sync().then(result=>{
    http.listen(PORT,()=>{
    	console.log('server is running on '+PORT)
    }) 
})  
//{force:true}
