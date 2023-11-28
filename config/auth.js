var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require("passport-jwt");
const FamilyController = require("../controllers/familyController")

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, (jwtPayload, done) => {
    return FamilyController.familyFindOneById(jwtPayload.sub)
        .then((user) => {
            if (!user) {
                return done("User not found!", false)
            }
            else {
                return done(null, user)
            }
        })
}))