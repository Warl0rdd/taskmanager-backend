var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require("passport-jwt");

const Users = require('../models/family')

passport.use(new LocalStrategy({
    usernameField: 'user[login]',
    passwordField: 'user[password]'
}, (login, password, done) => {
    return Users.findOne({login: login})
        .then((user) => {
            if(!user || !user.validatePassword(password)) {
                return done(null, false, {errors: {'login or password': 'is invalid'}})
            }

            return done(null, user)
        }).catch(done)
}))

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, (jwtPayload, done) => {
    return Users.findOne({id: jwtPayload.id})
        .then(user => {
            return done(null, user)
        })
        .catch(err => {
            return done(err)
        })
}))