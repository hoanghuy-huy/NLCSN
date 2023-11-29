const letter = require('../models/letter')
const User = require('../models/user')
const Student = require('../models/student')
const Internship = require('../models/sinhvienthuctap')
const Lecturer = require('../models/lecturer')
const Enterprises = require('../models/enterprise')
const informationInternShip = require('../models/sinhvienthuctap')
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
        //[POST] student/add-student
    async create(req, res, next) {
        try {
            const { id, lastName, firstName, yearOfBirth, yearOfStudy, Class, gender, majors, email, address } = req.body;
            const existingStudent = await Student.findOne({ id: id });
        
            if (existingStudent) {
            return res.status(401).json({ message: 'ID already exists' });
            }
        
            const key = yearOfStudy - 1974;
            const newStudent = new Student({ id, lastName, firstName, yearOfBirth, yearOfStudy, Class, gender, majors, email, address });
            await newStudent.save();
        
            return res.status(200).json({ message: 'Create student successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    //[POST] student/edit-student
    async edit(req, res, next) {
        try {
            const { studentId } = req.params;
            const { lastName, firstName, yearOfBirth, yearOfStudy, Class, gender, majors, address } = req.body;
            const key = yearOfStudy - 1974;
            
            const updateStudent = await Student.findOneAndUpdate(
                { id: studentId },
                { lastName, firstName, yearOfBirth, yearOfStudy, Class, gender, majors, address, key },
                { new: true } // Thêm option { new: true } để trả về dữ liệu sau khi được cập nhật
            );
            
            return res.status(200).json({ message: 'Edited student', updateStudent });
            } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
            }
    }

    async renderInternship(req, res, next){
        res.render('student/internship',{layout:'student'})
    }

    async getOneInternship(req ,res, next) {
        try {
            const { idStudent } = req.params
            const doc = await Internship.findOne({f_mssv:idStudent})
            if(!doc) return res.status(404).json({message:'Student have not yet register for internship'})
            return res.status(200).json(doc)            
        } catch (error) {
            return res.status(500).json({message:'Internal server error'})
        }   
    }
    async getOneLecturer(req ,res, next) {
        try {
            const { idLecturer } = req.params
            const doc = await Lecturer.findOne({id:idLecturer})
            if(!doc) return res.status(404).json({message:'Lecturer not found'})
            return res.status(200).json(doc)            
        } catch (error) {
            return res.status(500).json({message:'Internal server error'})
        }   

    }

    async getOneEnterprises(req ,res, next) {
        try {
            const { idEnterprises } = req.params
            const doc = await Enterprises.findOne({id:idEnterprises})
            if(!doc) return res.status(404).json({message:'Lecturer not found'})
            return res.status(200).json(doc)            
        } catch (error) {
            return res.status(500).json({message:'Internal server error'})
        }   

    }
    dangkihocphan(req, res){
        res.render('student/test')
    }

    async getOneIn4(req, res){
        const {idStudent} = req.params
        const internship = await informationInternShip.findOne({f_mssv:idStudent})
        if(!internship) return res.status(404).json({message:'Not Found'})
        res.status(200).json(internship)
    }
}

module.exports = new StudentController