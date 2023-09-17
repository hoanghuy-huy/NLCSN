const express = require('express');
const port = 3000;
const morgan = require('morgan');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const route = require('./routes')
const db = require('./config/db');
const { mongo } = require('mongoose');


// HTTP
app.use(morgan('combined'));

// Connect to DB
db.connect();

const UserModel = mongoose.model("users",UserSchema)

// template engine 
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'resources','views'));

app.use(express.static(path.join(__dirname,'public')));


// routes init
route(app)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})