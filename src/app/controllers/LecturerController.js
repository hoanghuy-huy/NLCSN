const User =  require('../models/user')
const Lecturer = require('../models/lecturer')
class LecturerController {
    //[POST] Lecturer/add-Lecturer
    async create(req, res, next) {
        try {
            const {id, lastName, firstName, yearOfBirth, yearOfStudy ,gender, majors,address,email} = req.body
            // const user = await User.findOne({username:id})
            // if(!user) return res.status(404).json({message:'account user does not exist'})
            const newLecturer = await new Lecturer({id ,lastName, firstName, yearOfBirth, yearOfStudy ,gender, majors,email,address})
            newLecturer.save()
            res.status(200).json({message:"Create Lecturer successfully"})            
        } catch (error) {
            res.status(500).json({message:'Error internal server'})
        }
    }
    //[POST] Lecturer/edit-Lecturer
    async edit(req, res, next) {
        try {
            const { lecturerId } = req.params

            const lecturer = await Lecturer.findOne({id:lecturerId},req.body)
            if(!lecturer) return res.status(404).json({message:'Lecturer not found'})
            return res.status(200).json({message:'Edited lecturer ',lecturer})
        } catch (error) {
            return res.status(500).json({message:'Error internal server'})   
        }
    }

    async delete(req, res, next){
        try {
            const {lecturerId} = req.params
            const lecturer = await Lecturer.findOne({id:lecturerId})
            if(!lecturer) return res.status(404).json({message:'Lecturer not found'})
            return res.status(200).json({message:'Delete Lecturer successfully'})
        } catch (error) {
            return res.status(500).json({message:'Error internal server'})
        }
    }

}

module.exports = new LecturerController