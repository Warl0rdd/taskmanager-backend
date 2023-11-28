const router = require('express').Router()
const FamilyController = require('../../controllers/familyController')
const passport = require('passport')
const jwt = require("jsonwebtoken");
const luxon = require("luxon");
const {login} = require("passport/lib/http/request");
const utils = require("../../utils")
const HomeRouter = require('../index')

router.post('/register', async (req, res) => {
    await FamilyController.familyCreate(req, res)
})

router.post('/login', async (req, res, next) => {
    const { body: { user } } = req
    FamilyController.familyFindOneByLogin(user.login)
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

router.post('/update', passport.authenticate('jwt', {session: false}), (req, res) => {
    FamilyController.familyFindOneById(req.user._id)
        .then((family) => {
            if (!family) {
                res.status(401).send()
            }

            return res.json(FamilyController.familyUpdate(family._id, req.body))
        })
})

router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    FamilyController.familyDeleteById(req.user._id)
        .then((deleted) => {
            req.logout((err) => {
                if (err) { res.json({"err": err})}
            })
            HomeRouter.redirectToHomeWithSuccess(req, res)
        })
})

module.exports = router