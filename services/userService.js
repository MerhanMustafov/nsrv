const User = require('../models/UserModel')

async function createUser(userData){
    const user = new User(userData)
    return await user.save()
}
async function getUserByName(name){
    const user = await User.findOne({username: new RegExp(`^${name}$`, 'i')})
    return user
}
async function getUserById(userId){
    const user = await User.findOne({_id: userId})
    return user
}



module.exports = {createUser, getUserByName, getUserById}