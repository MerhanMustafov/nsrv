const {Schema, model} = require('mongoose');

const listSchema = new Schema({
    listname: {type: String, required: true},
    cld_list_img_url: {type: String},
    cld_list_img_path: {type: String},
    list_img_web_link: {type: String},
    ownerid: {type: String, required: true},
    notes: [{type: Schema.Types.ObjectId, ref: 'Note'}],

})

module.exports = model('List', listSchema)