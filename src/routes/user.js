const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/userController')
const middlewareController = require('../app/controllers/middlewareController')

router.delete('/:userId',middlewareController.verifyTokenAndAdminAuth,userController.deleteUser)
router.get('/:userId',middlewareController.verifyToken,userController.getOneUser)
router.get('/',middlewareController.verifyToken,userController.getAllUser)

module.exports = router