const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const remindertime = new Schema({
    id:{ type: String, min: 1},
    startDay:{ type: Date},
    endDay:{ type: Date},
})

module.exports = mongoose.model('remindertime', remindertime)