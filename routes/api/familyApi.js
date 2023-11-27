const router = require('express').Router()
const FamilyController = require('../../controllers/familyController')
const passport = require('passport')
const jwt = require("jsonwebtoken");
const luxon = require("luxon");

router.post('/register', async (req, res) => {
    await FamilyController.family_create(req, res)
})


// TODO: FIX
router.post('/login', async (req, res, next) => {
    const { body: { user } } = req
    if (!user.login) {
        return res.status(400).json({
            errors: 'login is required'
        })
    }

    if (!user.pass) {
        return res.status(400).json({
            errors: 'password is required'
        })
    }

    return passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err) {
           return next(err)
        }

        if (user) {
            return res.json({ user: {
                    id: user._id,
                    login: user.login,
                    token: jwt.sign({
                        login: user.login,
                        id: user._id,
                        exp: luxon.DateTime.now().plus({hours: 1}).toUnixInteger()
                    }, process.env.JWT_SECRET) }
            })
        }

        return res.status(400).send(info)
    })
})

// TODO: FIX
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {

    FamilyController.family_findOne({id: req.payload.id})
        .then((user) => {
            if (!user) {
                return res.sendStatus(400)
            }

            return res.json({
                user: {
                    id: user._id,
                    login: user.login,
                    token: jwt.sign({
                        login: user.login,
                        id: user._id,
                        exp: luxon.DateTime.now().plus({hours: 1}).toUnixInteger()
                    }, process.env.JWT_SECRET)
                }
            })
        })
})

module.exports = router