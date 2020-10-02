const jwt = require("jsonwebtoken")

function generateToken(payload){
  return jwt.sign(payload, "kelompok5")
}

function verifyToken(token){
  return jwt.verify(token, "kelompok5")
}

module.exports = {generateToken , verifyToken}