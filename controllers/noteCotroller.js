const route = require('express').Router()
const {createNoteRecord, updateNoteRecord, deleteNoteRecord, getAllNoteRecords} = require('../services/noteService')

route.get('/getAll/:listid', async (req, res) =>{
    try{
        const notes = await getAllNoteRecords(req.params.listid)
        res.status(200).json(notes)
    }catch(err){
        res.status(404).json(err.message)
    }
})

route.post('/create', async (req, res) => {
    // req.body.json().map(({key, value}) => console.log(value))
    try{
        const created = await createNoteRecord(req.body)
        res.status(200).json(created)
    }catch(err){
        const errors = {errors: [err.message]}
        res.status(400).json(errors)
    }
})

route.put('/update/:noteid', async (req, res) => {
    try{
        const noteid = req.params.noteid
        const newData = req.body
        console.log(noteid)
        console.log(newData)
        const updated = await updateNoteRecord(newData, noteid)
        console.log(updated)
        res.status(200).json(updated)
    }catch(err){
        const errors = {errors: [err.message]}
        res.status(400).json(errors)
    }

})

route.delete(`/delete/noteid=:noteid/listid=:listid`, async (req, res) => {
    try{    
        const modifiedList = await deleteNoteRecord(req.params.noteid, req.params.listid)
        res.status(200).json(modifiedList)

    }catch(err){
        res.status(404).json(err.message)
    }
})
module.exports = route