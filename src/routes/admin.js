const express = require('express')
const router = express.Router()
const adminController = require('../app/controllers/AdminController')
const middlewareController = require('../app/controllers/middlewareController')



router.get('/thong-tin-thuc-tap',adminController.getAllInfInternship)
// router.get('/thong-tin-thuc-tap',adminController.showInfInternship)
router.get('/import-student',adminController.renderStudent)

router.delete('/internships/:id',adminController.deleteInternship)
router.put('/internships/:id',adminController.updateInternship)
router.get('/internships/:id/edit',adminController.editInternship)
router.post('/internships/store',adminController.saveInternship)
// router.get('/internships/create',adminController.createInternship)
// router.get('/internships/:id',adminController.showInternship)
// router.get('/internships',adminController.showInternships)

router.delete('/enterprises/:id',adminController.deleteEnterprise)
router.put('/enterprises/:id',adminController.updateEnterprise)
router.get('/enterprises/:id/edit',adminController.editEnterprise)
router.post('/enterprises/store',adminController.saveEnterprise)
router.get('/enterprises/create',adminController.createEnterprise)
router.get('/enterprises/:id',adminController.showEnterprise)
router.get('/enterprises',adminController.showEnterprises)

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
router.put('/students/:idStudent',adminController.updateStudent)
router.delete('/students/:id',adminController.deleteStudent)
// admin home


router.get('/', adminController.index)


module.exports = router