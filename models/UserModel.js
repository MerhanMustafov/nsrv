const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {type: String, required: [true, 'username is required!'], min: [3, 'Username should be at least 3 characters long!'] },
    hashedPassword: {type: String, required: [true, 'password is required!']},
    // img: {type: String},
    gender: {type: String, required: [true, 'gender is required!']},
    lists: [{type: Schema.Types.ObjectId, ref: 'List'}]
    // friends: [{type: Schema.Types.ObjectId, ref: 'Note'}]

})

module.exports = model('User', userSchema)