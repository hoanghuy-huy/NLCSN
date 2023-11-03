
const studentRouter = require('./student')
const adminRouter = require('./admin')

const authRouter = require('./auth')
const userRouter = require('./user')

function route(app) {

   app.use('/user',userRouter)
   
   app.use('/student', studentRouter)
   app.use('/admin', adminRouter)
   app.use('/',authRouter)
}

module.exports = route