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
const DRIVER = require('../../models/drivers')
var sequelize = require('sequelize')

let date_obj = new Date();
let todaydate = ("0" + date_obj.getDate()).slice(-2);
// current month
let todaymonth = ("0" + (date_obj.getMonth() + 1)).slice(-2);
// current year
let todayyear = date_obj.getFullYear();

exports.post_attance_of_students = (req,res)=>{
var std_ids = req.body.student_ids_arry
var status = req.body.status
var currentDate = `${todayyear}, ${date_obj.getMonth()}, ${todaydate}`

var jsondata = req.body
console.log(jsondata[0].status) 


for(var i=0;i<jsondata.length;i++){



ATTENDANCE.create({
    student_id:jsondata[i].id,
    status:jsondata[i].status,
    date:currentDate
}).then(result=>{   
   console.log('marked')
})
 

}

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
  console.log(notice_title,notice_description,notice_display_date,notice_author)
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
            teacher_pass:pass 
        }
       }
    ).then(result=>{
        if(result!=''){
            var response = {success:'true',id:result[0].teacher_id}
        console.log(JSON.stringify(response))
        res.status(200).json(response)
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
        console.log(result)
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
    TEACHERS.findAll({
        where:{
            teacher_id:req.params.id
        }
    }).then(result=>{
        console.log(JSON.stringify(result))
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
    
    console.log('IN HOMEMWORK')

    CLASS_WORK.create({
        class_work_sub:subjectName.subject_name,
        class_work_discription:class_work_description,
        class_section_id:section_id,
        class_work_date:class_work_date
    }).then(result=>{
        res.status(200).send('Posted')
    }).catch(err=>{
        res.status(200).send('Error')
    }) 
    

}

exports.get_class_work_by_section = (req,res)=>{
    var data = new Array();
    var response;
    CLASS_WORK.findAll({
        where:{
            class_section_id:req.params.id,
        }
    }).then(result=>{
        
         
       result.forEach((v,k)=>{
           var mdate = v.class_work_date
           var desc = v.class_work_discription
           response ={
           data:[
               {
                  desc
                 
               }
              ]
         }
          data.push(response)

       })
       res.status(200).json(result)
      //console.log(data)
    }).catch(err=>{
        res.status(200).send('Error')
    }) 
}


exports.post_single_student_notification = (req,res)=>{
var {notification,
    student_id,
    teacher_id,
    single_student_notification_date
}  = req.body


SINGLE_STUDENT_NOTIFICATION.create({
    notification,
    student_id,
    teacher_id,
    single_student_notification_date
}).then(result=>{
    res.send('posted')
}).catch(err=>{
    res.status(200).send('Error')
}) 

}

exports.get_student_login_detail = (req,res)=>{

    var {username,pass} = req.body
   
    STUDENTS.findAll(
       {
        where:{
            student_username:username,
            student_dob:pass 
        }
       }
    ).then(result=>{
        if(result!=''){
            var response = {
                success:'true',id:result[0].student_id
                ,student_section_id:result[0].student_section_id
            }
        console.log(JSON.stringify(response))
        res.status(200).json(response)
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
            driver_pass:pass  
        }
       }
    ).then(result=>{
        if(result!=''){
            var response = {
                success:'true',id:result[0].driver_id
            }
        console.log(JSON.stringify(response))
        res.status(200).json(response)
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
        console.log(JSON.stringify(result))
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
        console.log(JSON.stringify(response))
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
   
   
   console.log({'present':PresentdateArry})
   
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

exports.get_notice_by_class =(req,res)=>{
   
    var data = new Array();
    
    console.log('------------------------------------------->')

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
            console.log(JSON.stringify(data))
            res.status(200).json(data)
        })
    })
   

}

exports.get_driver_by_id = (req,res)=>{

    DRIVER.findByPk(req.params.id).then(result=>{
        res.status(200).send(result)
        console.log(JSON.stringify(result))
    })
}