const express = require('express')
const router = express.Router();

const siteController = require('../app/controllers/LoginController')

router.use('/',siteController.Login)


module.exports = router 

