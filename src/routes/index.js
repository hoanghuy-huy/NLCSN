
const studentRouter = require('./student')
const adminRouter = require('./admin')

const authRouter = require('./auth')
const userRouter = require('./user')
const lecturerRouter = require('./lecturer')
function route(app) {
   app.use('/lecturer',lecturerRouter)
   app.use('/student', studentRouter)
   app.use('/admin', adminRouter)
   app.use('/api/users',userRouter)
   app.use('/',authRouter)
}

module.exports = route