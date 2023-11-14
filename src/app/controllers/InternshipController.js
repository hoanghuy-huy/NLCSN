const User =  require('../models/user')
const Internship = require('../models/internship')
const uuid = require('uuid')
class InternshipController {
    //[POST] internship/add-Internship
    async create(req, res, next) {
        try {
            const {title, description, startDate, endDate , idStudent, idEnterprises, idLecturer} = req.body
            const id = uuid.v4()
            const newInternship = await new Internship({id, title, description, startDate, endDate , idStudent, idEnterprises, idLecturer})
            newInternship.save()
            res.status(200).json({message:"Create Internship successfully",newInternship})            
        } catch (error) {
            res.status(500).json({message:'Error internal server'})
        }
    }
    //[POST] Internship/edit-Internship
    async edit(req, res, next) {
        try {
            const { internshipId } = req.params

            const internship = await Internship.findOneAndUpdate({id:internshipId},req.body)
            if(!internship) return res.status(404).json({message:'Internship not found'})
            return res.status(200).json({message:'Edited Internship ',internship})
        } catch (error) {
            return res.status(500).json({message:'Error internal server'})   
        }
    }

    async delete(req, res, next){
        try {
            const {internshipId} = req.params
            const internship = await Internship.findOneAndDelete({id:internshipId})
            if(!internship) return res.status(404).json({message:'Internship not found'})
            return res.status(200).json({message:'Delete Internship successfully'})
        } catch (error) {
            return res.status(500).json({message:'Error internal server'})
        }
    }

}

module.exports = new InternshipController