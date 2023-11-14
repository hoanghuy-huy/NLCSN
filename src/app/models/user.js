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
    email:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    },
    admin:{
        type: Boolean,
        default:false 
    },

})
const User = mongoose.model('user',user)

module.exports = User