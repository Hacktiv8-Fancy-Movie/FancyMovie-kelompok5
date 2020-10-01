const {OAuth2Client} = require('google-auth-library');
const { generateToken } = require("../helpers/jwt")
// const { compare } = require("../helpers/bcrypt") //belum dipakai
const { User } = require("../models")

class UserController{

  static async register (req, res, next){
    try{
      console.log(req.body);
      res.status(200).json({msg: "register success"})
    } catch(err){

    }
  }

  static async login (req, res, next){
    try{
      console.log(req.body);
      res.status(200).json({msg: "login success"})
    }catch(err){
      
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
    // console.log(req.body.tokenGoogle, "token google <<<<");
    const client = new OAuth2Client(process.env.G_CLIENT_ID);
    client.verifyIdToken({
      idToken: req.body.tokenGoogle,
      audience: process.env.G_CLIENT_ID,
    })
    .then(ticket => {
      // console.log(ticket.getPayload());
      let { email } = ticket.getPayload()
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