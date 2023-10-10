
class StudentController {
    index(req, res) {
        res.render('student/index',{ layout: 'student'})
    }

    form(req, res, next) {
        res.render('student/form',{layout:'student'})   
    }
    store(req, res, next) {
        res.json(req.body)
    }
}

module.exports = new StudentController