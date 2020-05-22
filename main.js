const express = require('express')
const app = express()
const sequelizedb = require('./utils/database')
const routes = require('./routes/add_data')
const bodyparser = require('body-parser')
const path = require('path')
var multer = require('multer')
const CLASS = require('./models/classes')
var Sequelize = require('sequelize')
const SECTIONS = require('./models/sections')
const NOTICE = require('./models/notices')
const STUDENTS = require('./models/students')
const SUBJECTS = require('./models/subjects')
const ATTENDANCE = require('./models/student_attendance')
const TEACHER = require('./models/teachers')
var cookieParser = require('cookie-parser');
var session = require('express-session');
const SINGLE_STUDENT_NOTIFICATION = require('./models/notifications_to_single_child')
const LOGINS = require('./models/logins')
const api_routes = require('./api/routes/api_get_data')
var http = require('http').createServer(app);
const socketio = require('socket.io')(http)
const SessionStore = require('express-session-sequelize')(session.Store);
var config = require('./config/config')
var admin = require("firebase-admin");
var serviceAccount = require('./school-app-admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://school-app-275310.firebaseio.com"
  });
  
const myDatabase = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: 'mysql',
});

const sequelizeSessionStore = new SessionStore({
    db: myDatabase,
});
var today = new Date();
var date = today.getFullYear()+(today.getMonth()+1)+today.getDate();
var time = today.getHours()+ '-' +today.getMinutes() +'-'+ today.getSeconds();

const storageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null, `${date} img${time} ${file.originalname}`)
    }
    
    }) 

app.use(cookieParser())
    app.use(session({
        secret: 'keyboard cat',
        store: sequelizeSessionStore,
        resave: false,
        saveUninitialized: false,
        
      }))

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))

app.use('/public/uploads',express.static('./public/uploads'))
app.use(express.json());
app.use(multer({storage:storageEngine}).any())
app.use(bodyparser.urlencoded({extended:false}))

app.use('/api',api_routes)
app.use('/',routes)






// TEACHER.belongsTo(SINGLE_STUDENT_NOTIFICATION,{
//     foreignKey:'teacher_id',
//     onDelete: 'cascade' ,  
//     onUpdate:'cascade'
// })

// SINGLE_STUDENT_NOTIFICATION.hasMany(TEACHER,{
//     foreignKey:'teacher_id',
//     onDelete: 'cascade' ,
//     onUpdate:'cascade'
// })


// STUDENTS.belongsTo(SINGLE_STUDENT_NOTIFICATION,{
//     foreignKey:'student_id',
//     onDelete: 'cascade' ,  
//     onUpdate:'cascade'
// })

// SINGLE_STUDENT_NOTIFICATION.hasMany(STUDENTS,{
//     foreignKey:'student_id',
//     onDelete: 'cascade' ,
//     onUpdate:'cascade'
// })


SECTIONS.belongsTo(CLASS,{
    foreignKey:'class_id',
    onDelete: 'cascade' ,
    onUpdate:'cascade'
    })
    
    CLASS.hasMany(SECTIONS,{
        foreignKey:'class_id',
        onDelete: 'cascade' ,
        onUpdate:'cascade'
    })




 

    SUBJECTS.belongsTo(SECTIONS,{
    foreignKey:'section_id',
    onDelete: 'cascade' ,
    onUpdate:'cascade'
        })
                
    SECTIONS.hasMany(SUBJECTS,{
    foreignKey:'section_id',
    onDelete: 'cascade' ,
    onUpdate:'cascade'
        })


//         ATTENDANCE.belongsTo(STUDENTS,{ 
//     foreignKey:'student_id',
//     onDelete: 'cascade' ,
//     onUpdate:'cascade'
    
//         })
           
//         STUDENTS.hasMany(ATTENDANCE,{
//     foreignKey:'student_id',
//     onDelete: 'cascade' ,
//     onUpdate:'cascade'
// })
  

 const PORT = process.env.PORT || 3000;
sequelizedb.sync().then(result=>{
    http.listen(PORT,()=>{
    	console.log('server is running on '+PORT)
    }) 
})  
//{force:true}
 