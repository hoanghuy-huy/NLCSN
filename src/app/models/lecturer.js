const mongoose = require('mongoose')
const Schema = mongoose.Schema;




const lecturer = new Schema({
    id:{ type: String, min: 1},
    lastName: {
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
      firstName: {
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
    yearOfBirth:{ type: String, min: 1 },
    yearOfStudy:{ type: Number, min: 4 },
    gender:{ type: String, min: 1 },
    fieldOfStudy:{ type: String, min: 1 },
    email:{ 
        type: String,
        lowercase:true,
    },
    phone:{type: Number },
    address:{type:String },
    idOfEnterprise:{type:Number},
})




module.exports = mongoose.model('lecturer', lecturer)