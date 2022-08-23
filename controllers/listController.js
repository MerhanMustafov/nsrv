const route = require('express').Router()
const {uploadImageToCloudinary, deleteImageFromCloudinary} = require('./coudinary/cloudinary')
const {isAuth, isOwner} = require('../middlewares/guards')
const {createListRecord, getAllLists, updateListTitle, deleteList, getOneList} = require('../services/listService')
const cldService = require('./coudinary/cloudinaryService')

route.post('/create/:userid', async (req, res) => {
    try{
        let data = req.body
        if(data.uploadedImg){
            data = await cldService.upload(req, 'list')
        }
        const created = await createListRecord(data, req.params.userid)
        res.status(200).json(created)
    }catch(err){
        const error = {error: err.message}
        res.status(404).json(error)
    }
})

route.get('/getAllUsersList/:userId', async (req, res) => {
    try{
        const list = await getAllLists(req.params.userId)
        res.status(200).json(list)

    }catch(err){
        const error = {error: err.message}
        res.status(404).json(error)
    }
})


route.get('/getOneList/:listid', async (req, res) => {
    try{
        const list = await getOneList(req.params.listid)
        res.status(200).json(list)
    }catch(err){
        const error = {error: err.message}
        res.status(404).json(error)
    }
})

route.put('/update/:listid', async (req, res) => {
    try{
    const newData = req.body
    const updated = await updateListTitle(newData, req.params.listid)
    res.status(200).json(updated)

    }catch(err){
        const error = {error: err.message}
        res.status(404).json(error)
    }
})

route.delete('/delete/:listid/:userid', async (req, res) => {
    try{
        const deleted = await deleteList(req.params.listid, req.params.userid)
        if(deleted.cld_list_img_path){
            await cldService.del(req, deleted, null)
            // await deleteImageFromCloudinary(req.cld, deleted.cld_list_img_path)
        }
        res.status(200).json(deleted)
    }catch(err){
        const error = {error: err.message}
        res.status(404).json(error)
    }

})
module.exports = route