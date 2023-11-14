const letter = require('../models/letter')
const User = require('../models/user')
const Student = require('../models/student')
class StudentController {
    
    index(req, res) {
        res.render('student/index',{ layout: 'student'})
    }

    form(req, res, next) {
        res.render('student/form',{layout:'student'})   
    }

    profile(req, res, next){
        res.render('student/profile',{layout:'student'})
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

    async getOne(req, res,next){
        try {
            const { idStudent } = req.params
            const doc = await Student.findOne({id:idStudent})
            if(!doc) return res.status(404).json({message:'Student not found'})
            return res.status(200).json(doc)
        } catch (error) {
            return res.status(500).json({message:'Internal Server Error'})
        }
    }
    
}

module.exports = new StudentController