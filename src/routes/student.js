const express = require('express')
const router = express.Router()
const studentController = require('../app/controllers/StudentController')
const middlewareController = require('../app/controllers/middlewareController')

router.get('/get-one-enterprises/:idEnterprises',studentController.getOneEnterprises)
router.get('/get-one-lecturer/:idLecturer',studentController.getOneLecturer)
router.get('/get-one-internship/:idStudent',studentController.getOneInternship)
router.get('/internship',studentController.renderInternship)


router.post('/form/store', studentController.createLetter)

router.get('/form', studentController.form)
router.get('/profile', studentController.profile)
router.get('/get-one/:idStudent',studentController.getOne)
// home student
router.get('/',studentController.index)


module.exports = router