const route = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {TOKEN_SECRET} = require('../config')
const { ...userService } = require('../services/userService')

route.get('/get/:userId', async (req, res) => {
    const existing = await userService.getUserById(req.params.userId)
    if(!existing){
        res.status(404).json(null)
    }else{
        const token = generateToken(existing)
        res.status(200).json(token)
    }
})
route.get('/getUserwithLists/:userId', async (req, res) => {
    try{
        const rowUserData = await userService.getUserByIdWithLists(req.params.userId)
        const userClientData = generateUserDataClientFormat(rowUserData)
        res.status(200).json(userClientData)
    }catch(err){
        res.status(404).json(err.message)
    }

})
route.get('/getuser/:username', async (req, res) => {
    try{
        const user = await userService.getByName(req.params.username)
        res.status(200).json(user)
    }catch(err){
        res.status(404).json(err.message)
    }
})

route.post('/register', async (req, res) => {
  try {
    const existing = await userService.getUserByName(req.body.username)
    if (existing) {
        throw new Error('Username already exists!')
    }
    
    const userData = await generateUserDataDbFormat(req.body)
    const createdUser = await userService.createUser(userData)
    const token = generateToken(createdUser)

    res.status(200).json(token)
  }catch(err){
    const errors = {error: [err.message]}
    res.status(409).json(errors)
  }
})

route.post('/login', async (req, res) => {
    try {
        const existing = await userService.getUserByName(req.body.username)
        if (!existing) {
            throw new Error('User does not exist!')
        }
        const match = await bcrypt.compare(req.body.password, existing.hashedPassword)
        if (!match) {
            throw new Error('Incorrect password!')
        }
        const token = generateToken(existing)
        res.status(200).json(token)
    } catch (err) {
         const errors = {error: [err.message]}
        res.status(404).json(errors)
    }
})

route.get('/verify/:token' , async (req, res) => {
    try {
        const token = req.params.token
        jwt.verify(token, tokenSecret)
        res.status(200).json(token)
    }catch(err){
        res.status(401).json('Not authorized !')
    }

})

function generateUserDataClientFormat(userData){
    return {
        _id: userData._id,
        username: userData.username, 
        gender: userData.gender, 
        lists: userData.lists
    }
}

function generateToken(userData){
    return {
    userId: userData._id,
    username: userData.username,
    // img: userData.img,
    gender: userData.gender,
    accessToken: jwt.sign(
      { hashedPassword: userData.hashedPassword },
      TOKEN_SECRET,
    ),
  }
}

async function generateUserDataDbFormat(userData){
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    return {
        username: userData.username.trim(),
        hashedPassword: hashedPassword,
        // img: userData.img,
        gender: userData.gender,
        userNoteSections: [],
        userNotes: []
    }
}
module.exports = route
