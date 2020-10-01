const {OAuth2Client} = require('google-auth-library');
const { generateToken } = require("../helpers/jwt")
const { compare } = require("../helpers/bcrypt")
const { User } = require("../models")

class UserController{

  static async register (req, res, next){
    try{
      let {email, password} = req.body
      let user = await User.create(
        {
          email,
          password
        }
      )
      res.status(201).json({msg: "sign up success", 
      user:{
        id: user.id,
        email: user.email,
      }})
    }catch(err){
      // res.status(500).json({msg: err.msg || "internal server error"})
      next(err)
    }
  }

  static async login (req, res, next){
    try {
      const { email, password } = req.body
      let user = await User.findOne({
        where:{
          email
        }
      })
      if(!user) throw ({msg: "invalid email or password", statusCode: 400})
      if(!compare(password, user.password)) throw ({msg: "invalid email or password", statusCode: 400})
      let payload = {
        id : user.id,
        email : user.email
      }
      let token = generateToken(payload)
      res.status(200).json({msg: "sign in success", token })
    } catch (err) {
      // res.status(500).json({err})
      next(err)
    }
  }

  // belum masuk helper
  static randomStr(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  }

    static googleSign(req, res, next){
    const client = new OAuth2Client("805647103784-2kspke3vfdcqodevb2kmvmq865ng8nua.apps.googleusercontent.com");
    client.verifyIdToken({
      idToken: req.body.tokenGoogle,
      audience: "805647103784-2kspke3vfdcqodevb2kmvmq865ng8nua.apps.googleusercontent.com",
    })
    .then(ticket => {
      // console.log(ticket.getPayload().email);
      let { email } = ticket.getPayload()
      console.log(email, "EMAIL 1");
      return User.findOne({
        where:{
          email,
        }
      })
    })
    .then(user => {
      if(user) return user
      else{
        return User.create({
          email,
          password : UserController.randomStr(5)
        })
      }
    })
    .then(user=>{
      let token = generateToken({
        id: user.id,
        email: user.email
      })
      res.status(200).json({msg: "sign in success", token })
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = UserController