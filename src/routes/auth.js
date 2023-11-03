const express = require('express')
const router = express.Router()
const middlewareController = require('../app/controllers/middlewareController')
const authController = require('../app/controllers/authController')

router.post('/logout',middlewareController.verifyToken,authController.userLogout)
router.post('/refresh',authController.refresh)
router.post('/login',authController.login)
router.post('/signup',authController.register)
router.get('/',authController.index)


module.exports = router