const user = require('../models/user');
const { multipleMongooseToObject } = require('../../util/mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

let refreshTokenArr = []
class AuthController {
   index(req, res, next) {
      res.render('register/page_register');
   }

   async register(req, res, next) {
      try {
         const formData = req.body;
         const salt = await bcrypt.genSalt(10);
         const hashed = await bcrypt.hash(formData.password, salt);

         // Tạo người dùng mới
         const newUser = new user({
            username: formData.username,
            password: hashed,
            email: formData.email,
         });

         const doc = await newUser.save()
         res.status(200).json(doc)
      } catch (error) {
         res.status(500).json(error)
      }
   }
   // GENERATE ACCESS TOKEN 
   async generateAccessToken (user) {
      return jwt.sign({
        id: doc._id,
        admin: doc.admin, 
      },
      "secretKey",
      { expiresIn: "1d" } 
      );
   }


   async login(req, res, next) {
      try {
        const doc = await user.findOne({ username: req.body.username });
        if (!doc) {
          return res.status(404).json('Wrong username');
        }
        const validPassword = await bcrypt.compare(req.body.password, doc.password);
        if (!validPassword) {
          return res.status(404).json("Wrong password");
        }
        if (doc && validPassword) {
          const accessToken = jwt.sign({
            id: doc._id,
            admin: doc.admin, 
          },
          "secretKey",// JWT_ACCESS_KEY
          { expiresIn: "1d" } 
          );
          const refreshToken =  jwt.sign({
            id: doc._id,
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
          const {password,...others} = doc._doc // an password
          refreshTokenArr.push(refreshToken)
          return res.status(200).json({ ...others,accessToken });
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
          id: doc._id,
          admin: doc.admin, 
        },
        "secretKey",// JWT_ACCESS_KEY
        { expiresIn: "1d" } 
        );

        const newRefreshToken = jwt.sign({
          id: doc._id,
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

        res.status(200).json({accessToken: newAccessToken})
      })
    }

    //Log out 
    async userLogout(req,res,next){
      res.clearCookie("refreshToken");
      refreshTokenArr = refreshTokenArr.filter(token => token !== req.cookies.refreshToken)
      res.status(200).json('Logged out successfully')
    }


    //STORE TOKEN 
    // 1) LOCAL STORAGE  
    // 2) HTTP ONLY COOKIES
    // 3) REDUX STORE -> ACCESS TOKEN
 
}

module.exports = new AuthController();