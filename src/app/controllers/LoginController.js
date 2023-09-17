


class LoginController {

    // [GET] /
    Login(req,res){
        res.render('login')
    }

}

module.exports = new LoginController