const mongoose = require('mongoose')
const Schema = mongoose.Schema;




const internship = new Schema({
      id:{ 
        type: String,
        lowercase: true,
      },
      topic: {
        type: String,
        set: (value) => {
          if (typeof value !== 'string') return value;
          const trimmedValue = value.trim(); // Xóa khoảng trắng thừa ở đầu và cuối chuỗi
          const words = trimmedValue.split(/\s+/); // Tách chuỗi thành từng từ, bỏ qua khoảng trắng giữa các từ
          const capitalizedWords = words.map((word) => {
            const firstLetter = word.charAt(0).toUpperCase();
            const restOfWord = word.slice(1).toLowerCase();
            return firstLetter + restOfWord;
          });
          return capitalizedWords.join(' ');
        },
        get: (value) => value // Giữ lại giá trị gốc khi lấy từ cơ sở dữ liệu
      },
      description:{type:String},
      idEnterprise: {type: mongoose.Schema.Types.ObjectId, ref: 'enterprise' },
      idLecturer: {type: mongoose.Schema.Types.ObjectId, ref: 'lecturer' },
      idL:{type:String},
      idE:{type:String}
})




const Internship = mongoose.model('internship', internship)
  
module.exports = Internship


