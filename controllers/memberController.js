const member = require('../models/member')
const FamilyController = require("./familyController")

exports.memberCreate = async (req, res) => {
    let mem = await member.create(req.body)
    mem.$errors === undefined ? res.send(mem._doc) : res.status(400).send(mem.$errors)
}

exports.findFamilyMembers = async (family) => {
    return FamilyController.familyFindOneById(family._id).members
}
