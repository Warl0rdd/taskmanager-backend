var family = require('../models/family')
var crypto = require('crypto')
const jwt = require("jsonwebtoken");
const luxon = require("luxon");
const utils = require("../utils")
require('dotenv').config()

exports.family_create = async (req, res) => {
    let fam = await family.create({
        login: req.body.login,
        pass: crypto.createHash('sha256').update(req.body.pass + process.env.SALT).digest('hex'),
        name: req.body.name
    })
    fam.$errors === undefined ? res.json(utils.JWTForAuth(fam)) : res.status(400).send(fam.$errors)
}

exports.family_delete = async (req, res) => {
    let fam = await family.findOneAndDelete(req.body.name)
    fam.$errors === undefined ? res.status(204).send() : res.status(400).send(fam.$errors)
}

exports.family_findOneById = async (id) => {
    return family.findOne({id: id})
}

exports.family_findOneByLogin = async (login) => {
    return family.findOne({login: login})
}