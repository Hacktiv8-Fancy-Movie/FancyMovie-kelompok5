const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

async function authentication(req, res, next) {
    try {
        let { token } = req.headers
        let decoded = verifyToken(token)
        console.log(decoded)
        let user = await User.findOne({
            where: { email: decoded.email }
        })
        if (!user) throw { name: 'AuthenticationFailed' }
        req.userData = decoded
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication