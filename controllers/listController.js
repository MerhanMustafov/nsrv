const route = require('express').Router()
const {isAuth, isOwner} = require('../middlewares/guards')
const {createListRecord, getAllLists, updateListTitle, deleteList, getOneList} = require('../services/listService')

route.post('/create', async (req, res) => {
    try{
    const created = await createListRecord(req.body)
        res.status(200).json(created)
    }catch(err){
        const errors = {errors: err.message}
    }
})
route.get('/getAllUsersList/:userId', async (req, res) => {
    try{
    const list = await getAllLists(req.params.userId)
    res.status(200).json(list)

    }catch(err){
        const errors = {errors: err.message}
        res.status(404).json(errors)
    }
})

route.get('/getOneList/:listid', async (req, res) => {
    try{
        const list = await getOneList(req.params.listid)
        res.status(200).json(list)
    }catch(err){
        res.status(404).json(err.message)
    }
})

route.put('/update/:listid', async (req, res) => {
    try{
    const newData = req.body
    const updated = await updateListTitle(newData, req.params.listid)
    res.status(200).json(updated)

    }catch(err){
        res.status(404).json(err.message)
    }
})

route.delete('/delete/:listid', async (req, res) => {
    try{
        const deleted = await deleteList(req.params.listid)
        res.status(200).json(deleted)
    }catch(err){
        res.status(404).json(err.message)
    }

})
module.exports = route