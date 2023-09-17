const express = require('express')
const router = express.Router()

const abcController = require('../app/controllers/AbcController')

router.use('/',abcController.index)

module.exports = router