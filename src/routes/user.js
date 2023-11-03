const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/userController')
const middlewareController = require('../app/controllers/middlewareController')

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,userController.deleteUser)
router.get('/',middlewareController.verifyToken,userController.getAllUser)

module.exports = router