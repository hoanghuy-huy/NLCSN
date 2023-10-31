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




// routes init
route(app)


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})