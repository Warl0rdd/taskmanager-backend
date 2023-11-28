var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var crypto = require('crypto')
var luxon = require('luxon')
var jwt = require('jsonwebtoken')

var Schema = mongoose.Schema

var FamilySchema = new Schema({
    login: {
        type: String,
        required: true,
        max: 30,
        unique: true
    },
    pass: {
        type: String,
        required: true,
        max: 255
    },
    name: { // Фамилия
        type: String,
        required: true,
        max: 30,
        unique: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Member'
    }]
})

FamilySchema.plugin(uniqueValidator)

module.exports = mongoose.model("Family", FamilySchema)