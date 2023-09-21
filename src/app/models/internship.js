const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const internship = new Schema({
    id:{ type: String, min: 1},
    name:{ type: String, min: 1 },
    description:{ type: String},
})

module.exports = mongoose.model('internship', internship)