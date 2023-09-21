const express = require('express')
const app = express()
const router = express.Router()
const adminController = require('../app/controllers/AdminController')


router.get('/internships/:id',adminController.internshipsFindId)
router.get('/internships',adminController.internships)


router.get('/remindertimes/:id',adminController.remindertimesFindId)
router.get('/remindertimes',adminController.remindertimes)

//admin manage enterprises
router.get('/enterprises/:id',adminController.enterpriseFindId)
router.get('/enterprises',adminController.enterprises)

//admin manage lecturers
router.get('/lecturers/:id',adminController.lecturerFindId)
router.get('/lecturers',adminController.lecturers)


// admin manage students
router.get('/students/:id',adminController.studentsFindId)
router.get('/students',adminController.students)

// admin home
router.get('/', adminController.index)


module.exports = router