const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sinhvienthuctapSchema = new Schema({
    f_mamh: { type: String },
    f_manh: { type: String },
    f_mssv: { type: String ,lowercase: true},
    f_msgv: { type: String ,lowercase: true},
    f_msdn: { type: String ,lowercase: true},
    f_tenmhvn: { type: String },
  });

const Sinhvienthuctap = mongoose.model('sinhvienthuctap', sinhvienthuctapSchema)
  
module.exports = Sinhvienthuctap


