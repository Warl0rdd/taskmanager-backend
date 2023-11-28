const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const luxon = require("luxon");

exports.validatePassword = (pass, user) => {
    const hashed = crypto.createHash('sha256').update(pass + process.env.SALT).digest('hex')
    return hashed === user.pass
}

exports.JWTForAuth = (user) => {
    return {
        user: {
            id: user._id,
            login: user.login,
            token: jwt.sign({
                login: user.login,
                id: user._id,
                exp: luxon.DateTime.now().plus({hours: 1}).toUnixInteger()
            }, process.env.JWT_SECRET)
        }
    }
}