const router = require('express').Router()

exports.redirectToHomeWithSuccess = (req, res) => {
    res.redirect('/?success=true')
}

module.exports = router