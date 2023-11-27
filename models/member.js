var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

var Schema = mongoose.Schema

var MemberSchema = new Schema({
    family_id: {
        type: Schema.Types.ObjectId,
        ref: "Family",
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
})

MemberSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Member", MemberSchema)