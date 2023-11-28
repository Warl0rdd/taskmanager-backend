var family = require('../models/family')
var crypto = require('crypto')
const jwt = require("jsonwebtoken");
const luxon = require("luxon");
const utils = require("../utils")
require('dotenv').config()

exports.familyCreate = async (req, res) => {
    let fam = await family.create({
        login: req.body.login,
        pass: crypto.createHash('sha256').update(req.body.pass + process.env.SALT).digest('hex'),
        name: req.body.name
    })
    fam.$errors === undefined ? res.json(utils.JWTForAuth(fam)) : res.status(400).send(fam.$errors)
}

exports.familyDeleteById = async (id) => {
    return Family.findOneAndDelete({id: id})
}

exports.familyFindOneById = async (id) => {
    return family.findOne({id: id})
}

exports.familyFindOneByLogin = async (login) => {
    return family.findOne({login: login})
}

exports.familyUpdate = async (id, data) => {
    let fam = family.findOneAndUpdate(id, data)
}

