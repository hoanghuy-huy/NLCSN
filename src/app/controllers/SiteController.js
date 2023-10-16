const student = require('../models/student')
const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    
    home(req, res) {
        student.find({})
            .then(students => {
                // chuyen thanh object binh thuong
                res.render('search' , {
                    //van de handlebars bao mat
                    students: multipleMongooseToObject(students)
                })
            })
            .catch(error => next(error));
    }

    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController