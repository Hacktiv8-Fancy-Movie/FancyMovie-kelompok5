function errHandler(err, req, res, next){
  console.log(err, "<<<< error");
  console.log(err.name, "<<<< error name");
  let errors = []
  let statusCode = 500

  switch(err.name){
    case 'AuthenticationFailed':
    case 'JsonWebTokenError':
      errors.push('failed to authenticate')
      statusCode = 401
      break
    case 'AuthorizationFailed':
      errors.push('failed to authorize')
      statusCode = 403
      break
    case 'SequelizeUniqueConstraintError':
    case 'SequelizeValidationError':
      errors = err.errors.map(el => el.message)
      statusCode = 400
      break
    default:
      errors.push(err.msg || "internal server error")
      statusCode = err.statusCode || 500
  }

  res.status(statusCode).json({
    errors: errors
  })

}
module.exports = errHandler