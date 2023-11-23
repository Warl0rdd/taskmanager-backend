var express = require('express');
var router = express.Router();
var familyController = require('../controllers/familyController')

router.get('/', (req, res) => {
    res.send("Bruh it's api")
})

router.post('/family', async (req, res) => {
    await familyController.family_create(req, res)
})

router.delete('/family', async (req, res) => {
    await familyController.family_delete(req, res)
})

module.exports = router;
