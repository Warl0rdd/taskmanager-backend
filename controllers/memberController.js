var member = require('../models/member')

// TODO: DODELAT
exports.member_create = async (req, res) => {
    let mem = await member.create(req.body)
    mem.$errors === undefined ? res.send(mem._doc) : res.status(400).send(mem.$errors)
}

exports.find_family_members = async (req, res, id) => {
    let mems = await member.find({family_id: id})
}
