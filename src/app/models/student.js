const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const student = new Schema({
    id:{ type: String, min: 1},
    name:{ type: String, min: 1 },
    gender:{ type: String, min: 1 },
    age:{ type: Number},
    email:{ type: String, min: 1},
    phoneNumber:{type: Number },
    address:{type:String },
})

module.exports = mongoose.model('student', student)