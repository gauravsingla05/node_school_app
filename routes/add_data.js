const express  = require('express')
const router = express.Router()
const add_data = require('../controllers/add_data')


router.get('/' ,add_data.get_home)
router.get('/add-class' ,add_data.get_add_class)
router.post('/add-class',add_data.post_add_class)
router.get('/add-section' ,add_data.get_add_section)
router.post('/add-section' ,add_data.post_add_section)
router.get('/add-student',add_data.get_add_student_data)
router.get('/student-list',add_data.get_student_list)
router.post('/ajax_post_student',add_data.ajax_post_student)
router.post('/ajax_find_section',add_data.ajax_find_section)
router.post('/ajax_find_students',add_data.get_student_list_by_section)
router.get('/edit-student/:id',add_data.get_edit_student)
router.post('/edit-student',add_data.post_edit_student)
router.get('/delete-student/:id',add_data.delete_student)
router.get('/add-teacher',add_data.add_teacher)
router.post('/add-teacher',add_data.post_add_teacher)
router.get('/add-subject',add_data.get_add_subject)
router.post('/add-subject',add_data.post_add_subject)


module.exports =  router
