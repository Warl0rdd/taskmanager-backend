var express = require('express');
var router = express.Router();
var familyController = require('../controllers/familyController')

router.get('/', (req, res) => {
    res.send("Bruh it's api")
})

router.post('/family', (req, res) => {
    familyController.family_create(req, res)
})

module.exports = router;
