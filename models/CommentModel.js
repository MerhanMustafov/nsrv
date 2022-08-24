const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
    noteid: {type: String, required: true},
    comment: {type: String, required: true},
    username: {type: String, required: true},
    gender: {type: String, required: true},
    ownerimg: {type: String, required: true},
    ownerid: {type: String, required: true},
})


module.exports = model('Comment', commentSchema)