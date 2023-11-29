const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    id:{
        type: String,
        required:true,  
    },
    username:{
        type: String,
        required:true,
        lowercase: true,
    },
    password:{
        type: String,
        required:true,
    },
    role:{
        type: String,
    },

})
const User = mongoose.model('user',user)

module.exports = User