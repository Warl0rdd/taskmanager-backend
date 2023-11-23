var family = require('../models/family')

exports.family_create = async (req, res) => {
    let fam = await family.create(req.body)
    fam.$errors === undefined ? res.send(fam._doc) : res.status(400).send(fam.$errors)
}

exports.family_delete = async (req, res) => {
    let fam = await family.findOneAndDelete(req.body.name)
    fam.$errors === undefined ? res.status(204).send() : res.status(400).send(fam.$errors)
}