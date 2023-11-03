const User = require('../models/user');
const { multipleMongooseToObject } = require('../../util/mongoose')

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
    // [Delete] user/:id
    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params._id)
            res.status(200).json('delete thanh cong')
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new userController