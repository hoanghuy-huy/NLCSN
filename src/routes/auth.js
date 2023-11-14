const express = require('express')
const router = express.Router()
const middlewareController = require('../app/controllers/middlewareController')
const authController = require('../app/controllers/authController')



router.post('/logout',middlewareController.verifyToken,authController.userLogout)
router.post('/refresh',authController.refresh)
router.post('/login',authController.login)
router.post('/register',authController.register)

router.get('/',authController.renderLogin)
router.get('/register',authController.renderRegister)
module.exports = router