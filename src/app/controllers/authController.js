const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const uuid = require('uuid');


let refreshTokenArr = []

class AuthController {
  // [POST] /register
  async register(req, res, next) {
    try {
       const { username, password, email } = req.body;
       const id = uuid.v4();
       const salt = await bcrypt.genSalt(10);
       const hashed = await bcrypt.hash(password, salt);
       
       const emailUser = await User.findOne({ email: email });
       const user = await User.findOne({ username: username });
       
       if (emailUser) {
          return res.send('<script>alert("Email already exists!"); window.history.back();</script>')
       } else if (user) {
          return res.send('<script>alert("Username already exists!"); window.history.back();</script>')
       }
       else {
          const newUser = await new User({
              id: id,
              username: username,
              password: hashed,
              email: email,
          });
          await newUser.save();   
          return  res.send('<script>alert("Register successfully"); window.location.href = "/";</script>')  
       }
    } catch (error) {
       return res.status(500).json(error);
    }
 }

   
  async login(req, res, next) {
    try {
      const doc = await User.findOne({ username: req.body.username });
      if (!doc) {
        return res.status(404).json({message:'Wrong Username'})
      }
      const validPassword = await bcrypt.compare(req.body.password, doc.password);
      if (!validPassword) {
        return res.status(404).json({message:'Wrong Password'})
      }
      if (doc && validPassword) {
        const accessToken = jwt.sign({
          id: doc.id,
          admin: doc.admin, 
        },
        "secretKey",// JWT_ACCESS_KEY
        { expiresIn: "2d" } 
        );
        const refreshToken =  jwt.sign({
          id: doc.id,
          admin: doc.admin, 
        },
        "secretKey",
        { expiresIn: "365d" } 
        );
        res.cookie("refreshToken",refreshToken,{
          httpOnly:true,
          secure:false,
          path:"/",
          sameSite:"strict"
        })
        //const {password,...others} = doc._doc // an password
        refreshTokenArr.push(refreshToken)
        const userData =  doc._doc

        return res.status(200).json({userData,accessToken});
      }
    } catch (error) {
      return res.status(500).json(error);
    }
}

    async refresh(req, res, next){
      // Take refresh token form user
      const refreshToken = await req.cookies.refreshToken
      if(!refreshToken) return res.status(401).json("You're not authenticated")
      if(!refreshTokenArr.includes(refreshToken)) res.status(401).json("refresh token is not valid")
      jwt.verify(refreshToken,"secretKey",(err,user)=> {
        if(err) {
          console.log(err)
        }
        refreshTokenArr = refreshTokenArr.filter((token) => token !== refreshToken)
        //create new refresh token and access token
        const newAccessToken = jwt.sign({
          id: doc.id,
          admin: doc.admin, 
        },
        "secretKey",// JWT_ACCESS_KEY
        { expiresIn: "1d" } 
        );

        const newRefreshToken = jwt.sign({
          id: doc.id,
          admin: doc.admin, 
        },
        "secretKey",
        { expiresIn: "365d" } 
        );
        refreshToken.push()
        res.cookie("refreshToken",newRefreshToken,{
          httpOnly:true,
          secure:false,
          path:"/",
          sameSite:"strict"
        })

        return res.status(200).json({accessToken: newAccessToken})
      })
    }

    //Log out [POST] /logout
    async userLogout(req,res,next){
      res.clearCookie("refreshToken");
      refreshTokenArr = refreshTokenArr.filter(token => token !== req.cookies.refreshToken)
      res.status(200).json('Logged out successfully')
    }

    async renderLogin(req, res, next){
        res.render('auth/login')
    }

    async renderRegister(req, res, next){
      res.render('auth/register')
  }
}

module.exports = new AuthController();