const route = require('express').Router()
const {createComment, updateComment, deleteComment} = require('../services/commentService')

route.post('/create/:noteid', async (req, res) => {
    const noteid= req.params.noteid
    try{
        const created = createComment(req.body, noteid)
        res.status(200).json(created)
    }catch(err){
        res.status(400).json(err.message)
    }
})

route.patch(`/update/:commentid`, async (req, res) => {
    try{
        const updated = await updateComment(req.body, req.params.commentid)
        res.status(200).json(updated)
    }catch(err){
        res.status(400).json({errors: [...err.message]})
    }
})


route.delete(`/delete/commentid=:commentid/noteid=:noteid`, async (req, res) => {
    // `/delete/commentid=${commentid}/noteid=${noteid}`
    try{    
        const modifiedNote = await deleteComment(req.params.commentid, req.params.noteid)
        res.status(200).json(modifiedNote)

    }catch(err){
        res.status(404).json(err.message)
    }
})
module.exports = route