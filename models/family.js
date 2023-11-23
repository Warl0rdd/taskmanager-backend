var mongoose = require('mongoose')

var Schema = mongoose.Schema

var FamilySchema = new Schema({
    login: {
        type: String,
        required: true,
        max: 30
    },
    pass: {
        type: String,
        required: true,
        max: 255
    },
    name: { // Фамилия
        type: String,
        required: true,
        max: 30
    }
})

module.exports = mongoose.model("Family", FamilySchema)