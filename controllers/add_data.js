const express = require('express')
const sequelize = require('../utils/database')
const CLASS = require('../models/classes')
const SECTIONS = require('../models/sections')
const STUDENT = require('../models/students')
var Sequelize = require('sequelize')
const Op = require('sequelize').Op;
const TEACHER = require('../models/teachers')
const SUBJECTS = require('../models/subjects')
const LOGINS = require('../models/logins')
const NOTICE = require('../models/notices')
const DRIVER = require('../models/drivers')
const BUSES = require('../models/buses')
const ADMIN = require('../models/admin')
const bcrypt = require('bcrypt')
var admin = require("firebase-admin");
var serviceAccount = require('../school-app-admin.json');
var config_fcm = require('../config/fcm-config')


exports.get_home = async (req, res) => {
    var totalStudent = await STUDENT.count()
   
    res.render('home', { title: 'Home',result:{
        totalStudent
    }})
}

exports.get_add_class = (req, res) => {

    res.render('add_class', { title: 'Add class' })
}

exports.post_add_class = (req, res) => {
    var class_name = req.body.class_name
    CLASS.create({
        class_name: class_name
    }).then(result => {
        console.log(result.class_id)
        res.redirect('/add-class')
    }).catch(err => {
        console.log(err)
    })
}

exports.get_add_section = async (req, res) => {
     var SECTIONS_DATA = await SECTIONS.findAll({
        include:[
            model=CLASS
        ]
    })

    CLASS.findAll().then(result=>{
        res.render('add_sections', { title: 'Add Section',result:result,sections:SECTIONS_DATA})
    })

}

exports.post_add_section = (req, res) => {
    var choose_class = req.body.choose_class
    var section_name = req.body.section_name
    SECTIONS.create({
        section_name: section_name,
        class_id: choose_class
    }).then(result => {
        res.redirect('/add-section')
    }).catch(err => {
        console.log(err)
    })
}

exports.get_add_student_data = async (req,res)=>{
    var classes = await CLASS.findAll()
    res.render('add_student',{title:'Add Student',classes:classes})
}

exports.ajax_find_section = (req,res)=>{
    var selected_class = req.body.selected_class
    SECTIONS.findAll({
        where:{
            class_id:selected_class
        }
    }).then(result=>{
        res.status(200).send(result)
    })

}



exports.ajax_post_student = async(req,res)=>{
    var {
        student_name,
         student_father_name,
        student_mother_name
        ,student_dob,
        student_address,
        student_parents_phone
        ,choose_class,choose_section,
        student_adhaar_no,
        student_admsn_no,
        student_gender,
        student_roll_no,
        student_username} = req.body
     
var findStundent = await STUDENT.findAll(
    {
        where: {
            [Op.or]: [{student_username: student_username}, {student_roll_no: student_roll_no}]
          }
    })

        
if(findStundent!=''){
   res.send('true')
       
} 
else{
    STUDENT.create({
        student_roll_no:student_roll_no,
        student_name:student_name,
        student_father_name:student_father_name,
        student_mother_name:student_mother_name,
        student_class:choose_class,
        student_section_id:choose_section,
        student_dob:student_dob,
        student_address:student_address,
        student_parents_phone:student_parents_phone,
        student_admsn_no:student_admsn_no,
        student_adhaar:student_adhaar_no,
        student_gender:student_gender,
        student_username:student_username,
        student_dp:'https://www.autobytesolutions.com/wp-content/uploads/2017/08/soltani_370-1-130x130.jpg'
    
      }).then(result=>{
              res.redirect('add-student')
              res.send('false')
    }).catch(err=>{
          console.log(err)
      })

}


}



exports.get_student_list = async(req,res)=>{
    var classes = await CLASS.findAll()
    res.render('students_list',{title:'Students',classes:classes})
}

exports.get_student_list_by_section = (req,res)=>{
    STUDENT.findAll({
        where:{
            student_section_id:req.body.class_section_id
        }
    }).then(result=>{
        res.status(200).send(result)
       
    }).catch(err=>{
        console.log(err)
    })
}

exports.get_edit_student = async(req,res)=>{
    var classes = await CLASS.findAll()
    var id = req.params.id
    STUDENT.findByPk(id).then(result=>{
    res.render('edit_student',{title:'Edit Student',result:result,classes:classes,error:''})
        
    })
}

exports.post_edit_student = async(req,res)=>{
    var id = req.body.id
    var {student_name,
        student_roll_no,
        student_father_name,
        student_mother_name
        ,student_dob,
        student_address,
        student_parents_phone,
        choose_class,
        choose_section,
        student_adhaar_no,
        student_admsn_no} = req.body
     
     if(choose_section!=''){
        STUDENT.update({
            student_roll_no:student_roll_no,
            student_name:student_name,
            student_father_name:student_father_name,
            student_mother_name:student_mother_name,
            student_class:choose_class,
            student_section_id:choose_section,
            student_dob:student_dob,
            student_address:student_address,
            student_parents_phone:student_parents_phone,
            student_admsn_no:student_admsn_no,
            student_adhaar:student_adhaar_no
        
          },{where:{student_id:id}}).then(result=>{
              res.redirect('student-list')
          }).catch(err=>{
              console.log(err)
          })  
     }   
     else{
        var classes = await CLASS.findAll()
        STUDENT.findByPk(id).then(result=>{
            res.render('edit_student',{title:'Edit Student',result:result,classes:classes,error:'Choose section'})
                
            })
     }
  
}

exports.delete_student = (req,res)=>{
    var selected_student = req.body.selected_student
    console.log(selected_student)
    STUDENT.destroy({
        where: {
            student_id:selected_student
        }
      }).then(result=>{
        var response = {
            selected_student,
            status:'true'
        }
    res.status(200).send(response)
    })
}

exports.add_teacher = async(req,res)=>{
   var teachers = await TEACHER.findAll()
    res.render('add_teacher',{title:'Add Teacher',teachers,error:''})
}

exports.post_add_teacher = async(req,res)=>{
    var {teacher_name,
        teacher_dob,
        teacher_address,
        teacher_phone,
        teacher_email,
        teacher_pass,
    } = req.body
    var teacher_img_path = req.files
    
var teacherFound = await TEACHER.findAll({where:{teacher_email}})

if(teacherFound!=''){
    var teachers = await TEACHER.findAll()
    res.render('add_teacher',{title:'Add Teacher',teachers,error:'Teacher already exists'})
}
else{
    bcrypt.hash(teacher_pass, 10, function(err, hash) {
        
        TEACHER.create({
            teacher_name,
            teacher_email,
            teacher_phone,
            teacher_dob,
            teacher_address,
            teacher_pass:hash,
            teacher_dp:teacher_img_path[0].path
           
        }).then(result=>{
    
            res.redirect('add-teacher')
            
        }).catch(err=>{
            console.log(err)
        }) 


      }
      );
}
 
     

}

exports.post_teacher_change_pass = (req,res)=>{
    var teacher_pass = req.body.teacher_pass


    bcrypt.hash(teacher_pass, 10, function(err, hash) {
        TEACHER.update({
            teacher_pass:hash
          
            },{where:{teacher_id:req.body.id}}).then(result=>{
                res.redirect('/add-teacher')
            })
    })


}




exports.get_edit_teacher = async(req,res)=>{
var teacher = await TEACHER.findByPk(req.params.id)

  res.render('edit_teacher',{title:'Edit',result:teacher})
}

exports.post_edit_teacher = async(req,res)=>{
    var {teacher_name,
        teacher_dob,
        teacher_address,
        teacher_phone,
        teacher_email,
        teacher_pass,

    } = req.body
    var teacher_img_path = req.files

    var findTeacher = await TEACHER.findAll({where:{teacher_id:req.body.id}})

    if(teacher_img_path!=''){
        TEACHER.update({
            teacher_name,
            teacher_email,
            teacher_phone,
            teacher_dob,
            teacher_address,
            teacher_dp:teacher_img_path[0].path
        
          },{where:{teacher_id:req.body.id}}).then(result=>{
              res.redirect('/add-teacher')
          })
    }
   
    else{
        
        TEACHER.update({
            teacher_name,
            teacher_email,
            teacher_phone,
            teacher_dob,
            teacher_address,
            teacher_pass:findTeacher[0].teacher_pass,
            teacher_dp:findTeacher[0].teacher_dp
        
          },{where:{teacher_id:req.body.id}}).then(result=>{
              res.redirect('/add-teacher')
          })
    }

  
}

exports.delete_teacher = (req,res)=>{
    var selectedTeahcer = req.body.selectedTeahcer
    TEACHER.destroy({
        where: {
            teacher_id:selectedTeahcer
        }
      }).then(result=>{
        var response = {
            selectedTeahcer,
            status:'true'
        }
    res.status(200).send(response)
    })
}

exports.get_add_subject = async(req,res)=>{
    var classes = await CLASS.findAll()
    res.render('add_subjects',{title:"New Subject",classes:classes})
}


exports.add_notice_to_students = async(req,res)=>{
    var classes = await CLASS.findAll()
    res.render('add_notice',{title:"New Notice",classes:classes})
}

exports.post_add_notice_to_students =async (req,res)=>{
  
   
   
      const options =  config_fcm.options

   

    var {send_notice_class,
        send_notice_to_all_students,
        notice_date,
        Notice_title, 
        Notice_description,
        notice_author
    } = req.body
    
   var splitDate = notice_date.split('-')

   
   var splitday = splitDate[2]
   var splityear = splitDate[0]
   var splitmonth = splitDate[1]

    const message_notification = {
        notification: {
           title: Notice_title,
           body: Notice_description
               },
        };
  var posted=false;

    
  if(send_notice_class!=null){

    for (var i=0;i<send_notice_class.length;i++)
    {
        
        NOTICE.create({
            notice_title:Notice_title,
            notice_description:Notice_description,
            notice_display_date:`${splitday}-${splitmonth}-${splityear}`,
            notice_author:notice_author,
            notice_to_class:send_notice_class[i]
         }).then(result=>{
                   
         }).catch(err=>{
            console.log(err)
        })  
       
    
    }

     for(var j=0;j<send_notice_class.length;j++){
        STUDENT.findAll({
            where:{
              student_class:send_notice_class[j]
            }
        }).then(noticeToStudents=>{
             
            
            
            for(var g=0;g<noticeToStudents.length;g++){
                
              admin.messaging().sendToDevice(noticeToStudents[g].student_fcm_token,
                   message_notification, options)
              .then( response => {
             
                 res.redirect('/add-notice-to-students')  
              })
              .catch( error => {
                  console.log(error);
              });
           
            
           
           
           
            }
           
        }) 
     }

   
      
    
  }
  else if(send_notice_to_all_students!=null){
    NOTICE.create({
        notice_title:Notice_title,
        notice_description:Notice_description,
        notice_display_date:`${splitday}-${splitmonth}-${splityear}`,
        notice_author:notice_author,
        notice_to_all:'true'
     }).then(result=>{
              
         
         STUDENT.findAll().then(result=>{
             for(var i=0;i<result.length;i++){
                 if(result[i].student_fcm_token!=''){
                    admin.messaging().sendToDevice(result[i].student_fcm_token,
                        message_notification, options)
                   .then( response => {
                  
                      res.redirect('/add-notice-to-students')  
                   })
                   .catch( error => {
                       console.log(error);
                   });
                 }
                 }
                
         })
         

     }).catch(err=>{
        console.log(err)
    })  

  }
  else{
    res.redirect('/add-notice-to-students')
  }

}

exports.ajax_post_subject = (req,res)=>{
  var subject_name = req.body.sub_name
  var choose_section = req.body.choose_section
  
  SUBJECTS.create({
    subject_name:subject_name,
    section_id:choose_section
  }).then(result=>{
    res.redirect('add-subject')
  }).catch(err=>{
    console.log(err)
})  


}


exports.get_add_driver =(req,res)=>{
    BUSES.findAll().then(result=>{
        res.render('add_drivers',{title:'Add Driver',buses:result,error:''})
    })
   
}

exports.post_add_driver = async(req,res)=>{
    var result = await BUSES.findAll()
    console.log(req.body.driver_bus)
    var {
        driver_name,
        driver_dob,
        driver_address,
        driver_phone,
        driver_email,
        driver_pass,
        driver_bus
    } = req.body

    DRIVER.findAll({
        where:{
            driver_email 
        }
    }).then(emailFound=>{
         if(emailFound!=''){
            console.log('already registered')
            res.render('add_drivers',{title:'Add Driver',buses:result,error:'Email Already Registered'})
         }
         else{

            bcrypt.hash(driver_pass, 10, function(err, hash) {
      
                DRIVER.create({
                    driver_name:driver_name,
                    driver_email:driver_email,
                    driver_pass:hash,
                    driver_email,
                    driver_dob,
                    driver_address,
                    driver_phone,
                    driver_bus
                }).then(result=>{
                    res.redirect('/add-driver')
                })
        
              });
         }
    })


   
}

exports.get_add_bus = (req,res)=>{

   res.render('add_buses',{title:'Bus'})

}

exports.post_add_bus = (req,res) => {
  BUSES.create({
    bus_no:req.body.bus_no
  }).then(result=>{
      res.redirect('add-bus')
  }).catch(err=>{
      res.json(err)
  })
}

exports.login = (req, res) => {

    res.render('login', {
        title: 'Login',
    })
}
exports.post_login = (req, res) => {
    var username = req.body.login
    var pass = req.body.password
    ADMIN.findAll({
        where: {
            email: username,
        }
    }).then(result => {
        console.log('**********', result)
        if (result != '') {
            if (result[0].password !== pass && result[0].email !== username) {
                res.redirect('/login')

            }
            else if (result[0].email == username && result[0].password == pass) {
                req.session.isAuthenticated = true
                req.session.result = result
                req.session.save((err) => {
                    console.log(err)
                    res.redirect('/')

                })

            }
        }
        else {
            res.redirect('/login')

        }


    })
}
exports.post_logout = (req, res) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/login')
    })
}