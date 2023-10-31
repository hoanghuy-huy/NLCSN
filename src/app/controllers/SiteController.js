const student = require('../models/student')
const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    
    home(req, res) {
        res.render('home')
    }


}

module.exports = new SiteController