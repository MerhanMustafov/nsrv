const {Schema, model} = require('mongoose');

const listSchema = new Schema({
    listname: {type: String, required: true},
    list_img_url: {type: String},
    list_img_path: {type: String},
    ownerid: {type: String, required: true},
    notes: [{type: Schema.Types.ObjectId, ref: 'Note'}],

})

module.exports = model('List', listSchema)