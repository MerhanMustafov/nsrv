const {Schema, model} = require('mongoose')

const sectionModel = new Schema({
    sectionname: {type: String, required:true},
    ownerid: {type: String, required:true},
    lists: [{type: Schema.Types.ObjectId, ref: 'List'}],
})

module.exports = model('Section', sectionModel)

