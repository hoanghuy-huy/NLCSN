const express = require('express')
const router = express.Router()
const studentController = require('../app/controllers/StudentController')


router.post('/store', studentController.store)
router.get('/form', studentController.form)

// home student
router.get('/', studentController.index)


module.exports = router