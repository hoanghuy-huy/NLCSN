
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
class userController {
    
    // get all user [GET] /user
    async getAllUser(req, res){
        try {
            const user = await User.find()
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /api/users/:userId
    async getOneUser(req, res){
        try {
            const {userId} = req.params
            const user = await User.findOne({id:userId})
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
    // [Delete] user/:id
    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params.id)
            res.status(200).json('delete thanh cong')
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new userController