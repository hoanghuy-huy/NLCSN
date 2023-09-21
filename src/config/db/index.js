
const mongoose = require('mongoose');

async function Connect () {
    try {
        // ket noi den mongodb
        await mongoose.connect('mongodb://localhost:27017/QuanLyThucTap');
        console.log("Connect successfully")
    } catch (error) {
        console.log("Connect Failure")
    }
}

module.exports = { Connect } 