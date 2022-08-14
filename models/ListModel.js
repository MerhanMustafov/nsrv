const {Schema, model} = require('mongoose');

const listSchema = new Schema({
    listname: {type: String, required: true},
    img_url: {type: String},
    img_path: {type: String},
    ownerid: {type: String, required: true},
    notes: [{type: Schema.Types.ObjectId, ref: 'Note'}],

})

module.exports = model('List', listSchema)