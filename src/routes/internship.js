const express = require('express')
const router = express.Router()
const InternshipController = require('../app/controllers/InternshipController')

router.delete('/delete-internship/:internshipId',InternshipController.delete)
router.post('/edit-internship/:internshipId',InternshipController.edit)
router.post('/add-internship',InternshipController.create)


module.exports = router