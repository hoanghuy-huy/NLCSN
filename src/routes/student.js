const express = require('express')
const router = express.Router()
const studentController = require('../app/controllers/StudentController')


router.post('/form/store', studentController.createLetter)
router.get('/form', studentController.form)
router.get('/profile', studentController.profile)
router.get('/get-one/:idStudent',studentController.getOne)
// home student
router.get('/', studentController.index)


module.exports = router