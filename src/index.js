const express = require('express');
const port = 3000;
const morgan = require('morgan');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const route = require('./routes')
const db = require('./config/db')
const  methodOverride = require('method-override')
const flash = require('express-flash');
const session = require('express-session');
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const axios = require('axios')
const bodyParser = require('body-parser');
const multer = require('multer')
const excelToJson = require('convert-excel-to-json');
const fs = require('fs-extra');
const Sinhvienthuctap = require('./app/models/sinhvienthuctap')
const Student = require('./app/models/student')
const Lecturer = require('./app/models/lecturer')
const Enterprises = require('./app/models/enterprise');
const Enterprise = require('./app/models/enterprise');
var upload = multer({ dest: "uploads/" });

app.post("/read", upload.single("file"), (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).json("No file");
    } else {
      var filePath = "uploads/" + req.file.filename;

      // Đọc tệp Excel
      const excelData = fs.readFileSync(filePath);

      // Chuyển đổi tệp Excel thành JSON
      const jsonData = excelToJson({
        source: excelData,
        header: {
          rows: 1 // Số dòng chứa tiêu đề
        },
        columnToKey: {
          '*': '{{columnHeader}}' // Sử dụng tiêu đề cột làm key
        }
      });

      fs.remove(filePath)

      const firstSheetData = jsonData.Sheet1; // Lấy dữ liệu từ Sheet1

      for (let i = 0; i < firstSheetData.length; i++) {
        const dataItem = firstSheetData[i];
      
        // Tạo đối tượng mới dựa trên mô hình và gán giá trị từ dataItem
        const newItem = new Sinhvienthuctap(dataItem);
      
        // Lưu đối tượng vào cơ sở dữ liệu
        newItem.save()
          .then(() => {
            console.log('Item saved to the database');
          })
          .catch((error) => {
            console.error('Error saving item to the database:', error);
          });
      }
      
      // Trả về phản hồi thành công
      return res.send('<script>alert("Thêm Thành Công"); window.history.back();</script>')

    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
});

// them thong tin sinh vien
app.post("/readStudent", upload.single("file"), (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).json("No file");
    } else {
      var filePath = "uploads/" + req.file.filename;

      // Đọc tệp Excel
      const excelData = fs.readFileSync(filePath);

      // Chuyển đổi tệp Excel thành JSON
      const jsonData = excelToJson({
        source: excelData,
        header: {
          rows: 1 // Số dòng chứa tiêu đề
        },
        columnToKey: {
          '*': '{{columnHeader}}' // Sử dụng tiêu đề cột làm key
        }
      });

      fs.remove(filePath)

      const firstSheetData = jsonData.Sheet1; // Lấy dữ liệu từ Sheet1

      for (let i = 0; i < firstSheetData.length; i++) {
        const dataItem = firstSheetData[i];
      
        // Tạo đối tượng mới dựa trên mô hình và gán giá trị từ dataItem
        const newItem = new Student(dataItem);
      
        // Lưu đối tượng vào cơ sở dữ liệu
        newItem.save()
          .then(() => {
            console.log('Item saved to the database');
          })
          .catch((error) => {
            console.error('Error saving item to the database:', error);
          });
      }
      
      // Trả về phản hồi thành công
      return res.send('<script>alert("Thêm Thành Công"); window.history.back();</script>')

    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
});






app.post("/readLecturer", upload.single("file"), (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).json("No file");
    } else {
      var filePath = "uploads/" + req.file.filename;

      // Đọc tệp Excel
      const excelData = fs.readFileSync(filePath);

      // Chuyển đổi tệp Excel thành JSON
      const jsonData = excelToJson({
        source: excelData,
        header: {
          rows: 1 // Số dòng chứa tiêu đề
        },
        columnToKey: {
          '*': '{{columnHeader}}' // Sử dụng tiêu đề cột làm key
        }
      });

      fs.remove(filePath)

      const firstSheetData = jsonData.Sheet1; // Lấy dữ liệu từ Sheet1

      for (let i = 0; i < firstSheetData.length; i++) {
        const dataItem = firstSheetData[i];
      
        // Tạo đối tượng mới dựa trên mô hình và gán giá trị từ dataItem
        const newItem = new Lecturer(dataItem);
      
        // Lưu đối tượng vào cơ sở dữ liệu
        newItem.save()
          .then(() => {
            console.log('Item saved to the database');
          })
          .catch((error) => {
            console.error('Error saving item to the database:', error);
          });
      }
      
      // Trả về phản hồi thành công
      return res.send('<script>alert("Thêm Thành Công"); window.history.back();</script>')

    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
});

app.post("/readEnterprises", upload.single("file"), (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).json("No file");
    } else {
      var filePath = "uploads/" + req.file.filename;

      // Đọc tệp Excel
      const excelData = fs.readFileSync(filePath);

      // Chuyển đổi tệp Excel thành JSON
      const jsonData = excelToJson({
        source: excelData,
        header: {
          rows: 1 // Số dòng chứa tiêu đề
        },
        columnToKey: {
          '*': '{{columnHeader}}' // Sử dụng tiêu đề cột làm key
        }
      });

      fs.remove(filePath)

      const firstSheetData = jsonData.Sheet1; // Lấy dữ liệu từ Sheet1

      for (let i = 0; i < firstSheetData.length; i++) {
        const dataItem = firstSheetData[i];
      
        // Tạo đối tượng mới dựa trên mô hình và gán giá trị từ dataItem
        const newItem = new Enterprise(dataItem);
      
        // Lưu đối tượng vào cơ sở dữ liệu
        newItem.save()
          .then(() => {
            console.log('Item saved to the database');
          })
          .catch((error) => {
            console.error('Error saving item to the database:', error);
          });
      }
      
      // Trả về phản hồi thành công
      return res.send('<script>alert("Thêm Thành Công"); window.history.back();</script>')

    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
});








app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())

app.use(cookieParser())

// Middleware session và flash
app.use(session({
  secret: 'secret',
  saveUninitialized: true
}));
app.use(flash());


app.use(flash());
// HTTP
app.use(morgan('combined'));

//conncect to db
db.Connect();

// req.body
app.use(express.urlencoded())
app.use(express.json())


// Chuyen phuong thuc truyen tren url
app.use(methodOverride('_method'))


// template engine 
app.engine('.hbs',
  engine({ 
    extname: '.hbs' ,
    defaultLayout:'main', 
    helpers: {
      sum: (a, b) => a+b,
      
    },
    
  }),
  
);




app.set('view engine', '.hbs')
app.set('views', path.join(__dirname,'resources','views'))
app.use(express.static(path.join(__dirname,'public')))

console.log(__dirname)
// json web token

// routes init
route(app)


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})