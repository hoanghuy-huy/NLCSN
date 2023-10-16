const express = require('express')
const router = express.Router()
const adminController = require('../app/controllers/AdminController')


router.post('/lecturers/store',adminController.saveLecturer)
router.get('/lecturers/create',adminController.createLecturer)
router.get('/lecturers',adminController.showLecturers)
router.get('/lecturers/:id',adminController.showLecturer)
router.delete('/lecturers/:id',adminController.deleteLecturer)
router.put('/lecturers/:id',adminController.updateLecturer)
router.get('/lecturers/:id/edit',adminController.editLecturer)


router.post('/students/store',adminController.saveStudent)
router.get('/students/create',adminController.createStudent)
router.get('/students',adminController.showStudents)
router.get('/students/:id',adminController.showStudent)
router.get('/students/:id/edit',adminController.editStudent)
router.put('/students/:id',adminController.updateStudent)
router.delete('/students/:id',adminController.deleteStudent)
// admin home


router.get('/', adminController.index)


module.exports = router