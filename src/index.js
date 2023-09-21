const express = require('express');
const port = 3000;
const morgan = require('morgan');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const route = require('./routes')
const db = require('./config/db')

// HTTP
app.use(morgan('combined'));

//conncect to db
db.Connect();


// template engine 
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'resources','views'));

app.use(express.static(path.join(__dirname,'public')));


// routes init
route(app)


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})