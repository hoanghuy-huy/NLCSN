const express = require('express')
const router = express.Router()
const LecturerController = require('../app/controllers/LecturerController')

router.delete('/delete-lecturer/:lecturerId',LecturerController.delete)
router.post('/edit-lecturer/:lecturerId',LecturerController.edit)
router.post('/add-lecturer',LecturerController.create)

module.exports = router