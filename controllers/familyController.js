var family = require('../models/family')

exports.family_create = (req, res) => {
    let fam = family.create(req.body)
    fam.then((req, res) => {
        res.send(req.body)
    })
        .catch(e => res.status(400).send(e))
}