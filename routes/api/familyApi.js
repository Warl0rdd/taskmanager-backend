const router = require('express').Router()
const FamilyController = require('../../controllers/familyController')
const passport = require('passport')
const jwt = require("jsonwebtoken");
const luxon = require("luxon");
const {login} = require("passport/lib/http/request");
const utils = require("../../utils")

router.post('/register', async (req, res) => {
    await FamilyController.family_create(req, res)
})

router.post('/login', async (req, res, next) => {
    const { body: { user } } = req
    FamilyController.family_findOneByLogin(user.login)
        .then((foundUser) => {
            if (!foundUser) {
                return res.status(400).json({success: false, error: "User not found"})
            }

            if (utils.validatePassword(user.pass, foundUser)) {
                return res.json(utils.JWTForAuth(foundUser))
            }

            return res.status(400).json({
                success: false,
                error: "Incorrect password!"
            })
    })
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (!req.user) {
        return res.sendStatus(400)
    }

    return res.json(utils.JWTForAuth(req.user))
})

module.exports = router