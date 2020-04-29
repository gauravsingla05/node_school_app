const express  = require('express')
const router = express.Router()
const get_data_contoller = require('../controllers/get_data')

router.post('/mark-attendance',get_data_contoller.post_attance_of_students)
router.get('/attendence_by_stdnt_id/:id',get_data_contoller.get_attendence_by_stdnt_id)
router.post('/post-notice',get_data_contoller.post_notice)
router.post('/teacher-logins',get_data_contoller.post_teacher_logins)
router.get('/get-classes',get_data_contoller.get_all_classes)
router.get('/get-section-by-class/:id',get_data_contoller.get_sections_by_class)
router.get('/get-students-by-section/:id',get_data_contoller.get_students_by_section)
router.get('/get-teacher-detail/:id',get_data_contoller.get_teacher_detail_by_id)
router.get('/get-subjets-by-section/:id',get_data_contoller.get_subjets_by_section)
router.post('/post-home-work',get_data_contoller.post_home_work)
router.get('/get-class-work-by-section/:id',get_data_contoller.get_class_work_by_section)
router.post('/single-student-notificatioin',get_data_contoller.post_single_student_notification)
router.post('/student-logins',get_data_contoller.get_student_login_detail)
router.get('/get-student-by-id/:id',get_data_contoller.get_student_detail_by_id)
router.get('/get-logined-student-list/',get_data_contoller.get_Logined_students_list)
router.post('/get-logins',get_data_contoller.get_logins)
router.get('/get-student-attendence/:id',get_data_contoller.get_student_attendence)
router.get('/get-notice-by-class/:id',get_data_contoller.get_notice_by_class)
router.post('/driver-logins',get_data_contoller.get_driver_logins)
router.get('/driver-by-id/:id',get_data_contoller.get_driver_by_id)


module.exports =  router

