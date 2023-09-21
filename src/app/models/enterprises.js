const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const enterprise = new Schema({
    id:{ type: String, min: 1},
    name:{ type: String, min: 1 },
    email:{ type: String, min: 1},
    phoneNumber:{type: Number },
    address:{type:String },
})

module.exports = mongoose.model('enterprise', enterprise)