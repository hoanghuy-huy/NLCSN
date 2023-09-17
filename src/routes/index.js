const homeRouter = require('./home')
const siteRouter = require('./login')
const abcRouter = require('./abc')


function route(app){
    app.use('/abc',abcRouter)
    app.use('/login',siteRouter)
    app.use('/',homeRouter)
}

module.exports = route;