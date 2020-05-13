const STUDENTS  = require('../../models/students')
const ATTENDANCE = require('../../models/student_attendance')
const NOTICE = require('../../models/notices')
const TEACHERS = require('../../models/teachers')
const CLASSES = require('../../models/classes')
const SECTIONS = require('../../models/sections')
const SUBJECTS = require('../../models/subjects')
const CLASS_WORK = require('../../models/class_work')
const SINGLE_STUDENT_NOTIFICATION = require('../../models/notifications_to_single_child')
const LOGINS = require('../../models/logins')
const BUSES = require('../../models/buses')
const bcrypt = require('bcrypt');
const DRIVER = require('../../models/drivers')
const jwt = require('jsonwebtoken')
var sequelize = require('sequelize')
const config  = require('../../config/config')
const secret = require('../../config/secret')
var config_fcm = require('../../config/fcm-config')
var admin = require("firebase-admin");
let date_obj = new Date();
let todaydate = ("0" + date_obj.getDate()).slice(-2);
// current month
let todaymonth = ("0" + (date_obj.getMonth() + 1)).slice(-2);
// current year
let todayyear = date_obj.getFullYear();

exports.post_attance_of_students = (req,res)=>{

var currentDate = `${todayyear}, ${todaymonth}, ${todaydate}`

var jsondata = req.body
 

jsondata.forEach((v,k)=>{
   console.log(v.id) 

   ATTENDANCE.findAll({
       where:{
        student_id:v.id, 
        date:currentDate
       }
   }).then(result=>{
       if(result!=''){
           
           ATTENDANCE.update(
                    {
                        status:v.status
                    },{
                        where:{
                            student_id:v.id,
                            date:currentDate}
                    }
                    ).then(result=>{
                        console.log('data updated')
                    })
       }
       else{
           console.log('No found')
           ATTENDANCE.create({
                        student_id:v.id,
                        status:v.status,
                        date:currentDate
                    }).then(result=>{   
                       
                       console.log('marked')
                    })
       }
   })

})

}

exports.get_attendence_by_section = (req,res)=>{
    ATTENDANCE.findAll({
        include:[
            model=STUDENTS
        ]
    }).then(result=>{
        res.send(result)
    })
}

exports.get_attendence_by_stdnt_id  = (req,res)=>{
    var id = req.params.id
    ATTENDANCE.findAll({
        where:{
            student_id:id
        }
    }).then(result=>{
        res.send(result)
    })
}

exports.post_notice = (req,res)=>{
    var {notice_title,notice_description,notice_display_date,notice_author} = req.body
  
    NOTICE.create({
        notice_title,
        notice_description,
        notice_display_date,
        notice_author
    }).then(result=>{
        res.send('success')
    })
}

exports.post_teacher_logins = (req,res)=>{
    var {username,pass} = req.body
    
    TEACHERS.findAll(
        {
         where:{
             teacher_email:username, 
         }
        }
     ).then(result=>{
         if(result!=''){
 
            var hashpass = result[0].teacher_pass

            bcrypt.compare(pass, hashpass, function(err, isMatch) {
                if(isMatch) {
                    try{ jwt.sign({payload:username},secret.secret,
                        {
                          expiresIn:"2 days"
                        },
                        (errr,token)=>{
                          
                            var response = {
                                success:'true',
                                id:result[0].teacher_id,
                                token:token
                            }
                        
                        res.status(200).json(response)
                        }
                          
                          )
                        }catch (err) {
                            return res.status(422).send({
                                error:'Invalid password or email'
                            });
                        }
                  
        
                } else {
                    var wrongresponse = {success:'false',id:0}
                    console.log('no user found')
                    res.status(200).json(wrongresponse)
                } 
              });
            
             
     
         }
         else{
             var wrongresponse = {success:'false',id:0}
             console.log('no user found')
             res.status(200).json(wrongresponse)
         }
     })

   

  
}

exports.get_all_classes = (req,res)=>{
    CLASSES.findAll().then(result=>{
     
        res.status(200).json(result)
    })
}

exports.get_sections_by_class = (req,res)=>{
    SECTIONS.findAll({
        where:{
            class_id:req.params.id
        },
        include:[
            model=CLASSES
        ],
    }).then(result=>{
        res.status(200).json(result)
    })
}

exports.get_students_by_section = (req,res)=>{
    STUDENTS.findAll({
        where:{
            student_section_id:req.params.id
        }
    }).then(result=>{
        res.status(200).json(result)
    })
}

exports.get_teacher_detail_by_id = (req,res)=>{
    TEACHERS.findAll(
        {where:{teacher_id:req.params.id},attributes: { exclude: ["teacher_pass"] }
    }).then(result=>{
       
        res.status(200).json(result)
        
    })
}

exports.get_subjets_by_section = (req,res)=>{

    SUBJECTS.findAll({
        where:{
            section_id:req.params.id
        }
    }).then(result=>{
        res.status(200).json(result)
    })
}

exports.post_home_work =async (req,res)=>{
    
    var section_id = req.body.section_id
    var subject_id = req.body.subject_id
    var class_work_description = req.body.class_work_description
    var class_work_date = req.body.class_work_date
    var subjectName = await SUBJECTS.findByPk(subject_id)
    

    CLASS_WORK.create({
        class_section_id:section_id,
        class_work_date:class_work_date,
        work_detail: [{
            [subjectName.subject_name]: class_work_description
          }]
    }).then(result=>{
        
        console.log('Posted')
    }).catch(err=>{
        console.log(err)
    }) 
  
    

}

exports.get_class_work_by_section = (req,res)=>{
    var data = new Array();
    var response;

    CLASS_WORK.findAll({
        group: ['class_work_date'],
        where:{
            class_section_id:req.params.id,
        }
    }).then(result=>{
        
         
       result.forEach((v,k)=>{
           var mdate = v.class_work_date
           var desc = v.class_work_discription
           var subname = v.class_work_sub
           response ={  
               [mdate]:{
                   desc,
                   subname
               }
            }
          data.push(response)

       }
       )
       res.status(200).json(result)
      //console.log(data)
    }).catch(err=>{
        console.log(err)
        res.status(200).send('Error')
    }) 
}


exports.post_single_student_notification = (req,res)=>{
var {notification,
    student_id,
    teacher_id,
}  = req.body




SINGLE_STUDENT_NOTIFICATION.create({
    notification,
    student_id,
    teacher_id,
}).then(result=>{
    
    STUDENTS.findAll({
        where:{
            student_id:student_id
        }
    }).then(studentFound=>{
        if(studentFound!=''){

           console.log(studentFound[0].student_fcm_token)
           
           var options =  config_fcm.options
           var message_notification = {
            notification: {
               title: 'Teacher sent you a message',
               body: notification
                   }
            };
                
            admin.messaging().sendToDevice(studentFound[0].student_fcm_token,
                message_notification, options)
           .then( response => {
            res.send('Message has been sent')
              console.log('sent')
           })
           .catch( error => {
               console.log(error);
           });
        
        }
    }) 
}).catch(err=>{
    res.status(200).send('Error')
}) 

}

exports.get_student_login_detail = (req,res)=>{

    var {username,pass,student_fcm_token} = req.body
   
    STUDENTS.findAll(
       {
        where:{
            student_username:username,
            student_dob:pass 
        }
       }
    ).then(result=>{
        if(result!=''){
            
            try{ jwt.sign({payload:username},secret.secret,{
                  expiresIn:"2 days"},(errr,token)=>{
                    console.log(token);

                
                  var response = {
                    success:'true',id:result[0].student_id,
                    student_section_id:result[0].student_section_id,
                    token:token
                }
                
                STUDENTS.update(
                    {
                    student_fcm_token:student_fcm_token
                   },
                    {
                        where:{
                            student_username:username,
                            student_dob:pass
                         }
                }).then(tokenUpdated=>{
                    console.log('updated')
                    res.status(200).json(response)
                })
            
               
                }
                  
                  )
                }catch (err) {
                    return res.status(422).send({
                        error:'Invalid password or email'
                    });
                }
        
        }
        else{
            var wrongresponse = {success:'false',id:0}
            console.log('no user found')
            res.status(200).json(wrongresponse)
        }
    })




}


exports.get_driver_logins = (req,res)=>{
    var {username,pass} = req.body
   
    DRIVER.findAll(
       {
        where:{
            driver_email:username,
            
        }
       }
    ).then(result=>{
        if(result!=''){
   
            var hashpass = result[0].driver_pass

            bcrypt.compare(pass, hashpass, function(err, isMatch) {
                if(isMatch) {
                    try{ jwt.sign({payload:username},secret.secret,
                        {
                          expiresIn:"2 days"
                        },
                        (errr,token)=>{
                          
                            var response = {
                                success:'true',
                                id:result[0].driver_id,
                                bus_no:result[0].driver_bus,
                                token:token
                            }
                       
                        res.status(200).json(response)
                        }
                          
                          )
                        }catch (err) {
                            return res.status(422).send({
                                error:'Invalid password or email'
                            });
                        }
        
                } else {
                    var response = {
                        success:'false',
                        id:0,
                        bus_no:"0",
                        token:"0"
                    }
               
                res.status(200).json(response)
                } 
              });
  
           
        }
        else{
            var wrongresponse = {success:'false',id:0}
            console.log('no user found')
            res.status(200).json(wrongresponse)
        }
    })




}




exports.get_student_detail_by_id = (req,res)=>{
    STUDENTS.findAll({
        where:{
            student_id:req.params.id
        }
    }).then(result=>{
        res.status(200).json(result)
  
    }).catch(err=>{
        res.send(err)
    })
}

exports.get_logins = (req,res)=>{
    var {username,pass} = req.body
    LOGINS.findAll({
        where:{
            username,pass
        }
    }).then(result=>{
        if(result!=''){
            var response = {success:'true',
            teacher_id:result[0].teacher_id,
            student_id:result[0].student_id,
            status:result[0].status
           
        }
       
        res.status(200).json(response)
        }
        else{
            var wrongresponse = {success:'false',id:0}
            console.log('no user found')
            res.status(200).json(wrongresponse)
        }
    })
}


exports.get_student_attendence = async(req,res)=>{
    var present = await ATTENDANCE.findAll({
        where:{
            student_id:req.params.id,
            status:'p'
        }
    })
    var absent = await ATTENDANCE.findAll({
        where:{
            student_id:req.params.id,
            status:'a'
        }
    })

    var leave = await ATTENDANCE.findAll({
        where:{
            student_id:req.params.id,
            status:'l'
        }
    })
    
   var PresentdateArry =  present.map(pdata=>pdata.date)
   var AbsentdateArry =  absent.map(adata=>adata.date)
   var LeavedateArry =  leave.map(ldata=>ldata.date)
   
   
  
   
   res.status(200).json({'present':PresentdateArry,'absent':AbsentdateArry,'leave':LeavedateArry})
    
}

exports.get_Logined_students_list = async(req,res)=>{
    var arr = req.query.array.split(',');
    var finalArr = arr.map(function(item,index){
        return item.replace('[','')
      
      });

    var finalArraydata = finalArr.map(function(item,index){
        return item.replace(']','')
      
      });  
     
  
    STUDENTS.findAll({
        where:{
            student_id:finalArraydata
        }
    }).then(result=>{
        res.status(200).json(result)
        
    })
  
    
} 

exports.get_notice_by_class =async(req,res)=>{
   
    var data = new Array();
      var std_id = req.params.std_id
  
    
      NOTICE.findAll({ 
        where: {
            notice_to_class:req.params.id,
           },
    }).then(result=>{
        if(result!=null){
           result.forEach((k,v)=>{
               data.push(k)
           })
          
        }
        
      
        NOTICE.findAll({
            where: {
                notice_to_all:'true'
               },
        }).then(Allresult=>{
            if(Allresult!=null){
                Allresult.forEach((k,v)=>{
                    data.push(k)
                })

            }
          
            
           
        })
        SINGLE_STUDENT_NOTIFICATION.findAll(
            {where:{
                student_id:std_id}
        }).then(single_notifications=>{
            if(single_notifications!=''){
               console.log(single_notifications)
                single_notifications.forEach((singleData,v)=>{
                    data.push(singleData)
                })
            }
            res.status(200).json(data)
        })
    
    
    
    
    })
   

}

exports.get_driver_by_id = (req,res)=>{

    DRIVER.findAll({
        where:{
            driver_id : req.params.id
        }
    }).then(result=>{
        res.status(200).json(result)
    
    })
}

exports.get_all_buses = (req,res)=>{
   BUSES.findAll().then(result=>{
       res.status(200).json(result)
   })
}

exports.post_student_dp = (req,res)=>{
    var dpFile = req.files
   
    STUDENTS.update({
        student_dp:dpFile[0].path
    },
        {where:{student_id:req.params.id}
    }).then(resut=>{
        
        res.status(200).send('=================> updated')
    }).catch(err=>{
        res.send('Error in uploading')
    })
    

 
}