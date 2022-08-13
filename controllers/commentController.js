const route = require('express').Router()
const {createComment} = require('../services/commentService')

route.post('/create/:noteid', async (req, res) => {
    const noteid= req.params.noteid
    try{
        const created = createComment(req.body, noteid)
        res.status(200).json(created)
    }catch(err){
        res.status(400).json(err.message)
    }
})

module.exports = route