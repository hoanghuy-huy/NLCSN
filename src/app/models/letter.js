const mongoose = require('mongoose')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const Schema = mongoose.Schema;


const letter = new Schema(
  {
    id:{ 
      type: String,
      lowercase: true,
    },
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
    yearOfBirth:{ type: Date},
    yearOfStudy:{ type: Number,},
    class:{ type: String,},
    gender:{ type: String,},
    majors:{ type: String,},
    key:{type:Number},
    enterprise:{type: String},
    description: {type: String},

  },

)
  

const Letter = mongoose.model('letter', letter)

module.exports = Letter
