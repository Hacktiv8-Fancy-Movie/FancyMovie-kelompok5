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

}

module.exports = UserController