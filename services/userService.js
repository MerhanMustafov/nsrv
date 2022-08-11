const User = require('../models/UserModel')

async function createUser(userData){
    const user = new User(userData)
    return await user.save()
}
async function getUserByName(name){
    const user = await User.findOne({username: new RegExp(`^${name}$`, 'i')})
    return user
}
async function getByName(name){
    const user = await User.find({username: new RegExp(`${name}`, 'i')})
    return user
}
async function getUserById(userId){
    const user = await User.findOne({_id: userId})
    return user
}
async function getUserByIdWithLists(userId){
    const user = await User.findOne({_id: userId}).populate({path: 'lists', populate: {path: 'notes'}})
    return user
}



module.exports = {createUser, getUserByName, getUserById, getByName, getUserByIdWithLists}