const {Schema, model} = require('mongoose');

const noteSchema = new Schema({
    text: {type: String, required: [true, 'note content is required!']},
    listid: {type: String, required: [true, 'id is required!']},
    title: {type: String, required: [true, 'note title is required!']}
})

module.exports = model('Note', noteSchema)