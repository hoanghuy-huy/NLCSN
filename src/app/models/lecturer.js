const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const lecturer = new Schema({
    id:{ type: String, min: 1},
    name:{ type: String, min: 1 },
    gender:{ type: String, min: 1 },
    age:{ type: Number},
    email:{ type: String, min: 1},
    phoneNumber:{type: Number },
    address:{type:String },
    idEnterprise:{type:String },
})

module.exports = mongoose.model('lecturer', lecturer)