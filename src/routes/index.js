
const studentRouter = require('./student')
const adminRouter = require('./admin')
const siteRouter = require('./site')


function route(app) {



   app.use('/student', studentRouter)
   app.use('/admin', adminRouter)
   app.use('/', siteRouter)
 
}

module.exports = route