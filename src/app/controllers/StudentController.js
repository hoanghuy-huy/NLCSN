const letter = require('../models/letter')

class StudentController {
    
    index(req, res) {
        res.render('student/index',{ layout: 'student'})
    }

    form(req, res, next) {
        res.render('student/form',{layout:'student'})   
    }

    createLetter(req, res, next) {
        const formData = req.body

        letter.findOne({id:formData.id})
            .then(doc => {
                if(doc) {
                    res.send('<script>alert("ID này đã đăng kí nhận giấy giới thiệu rồi !"); window.history.back();</script>')
                }else {
                    const newLetter = new letter(formData)
                    newLetter.save()
                     .then(() => res.send('<script>alert("Đã đăng kí nhận giấy giới thiệu thành công"); window.location.href = "/student";</script>'))
                     .catch(next)
                }
                
            })
            .catch(next)
    }
}

module.exports = new StudentController