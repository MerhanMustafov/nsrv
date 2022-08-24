const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {type: String, required: [true, 'username is required!'], min: [3, 'Username should be at least 3 characters long!'] },
    hashedPassword: {type: String, required: [true, 'password is required!']},
    cld_profile_img_url: {type: String},
    cld_profile_img_path: {type: String},
    profile_img_web_link: {type: String},
    default_image_male: {type: String},
    default_image_female: {type: String},
    gender: {type: String, required: [true, 'gender is required!']},
    lists: [{type: Schema.Types.ObjectId, ref: 'List'}]

    // friends: [{type: Schema.Types.ObjectId, ref: 'Note'}]

})

module.exports = model('User', userSchema)