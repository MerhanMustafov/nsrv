const route = require('express').Router()
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require('./coudinary/cloudinary')
const { isAuth, isOwner } = require('../middlewares/guards')
const {
  createListRecord,
  getAllLists,
  updateListTitle,
  deleteList,
  getOneList,
} = require('../services/listService')
const cldService = require('./coudinary/cloudinaryService')

route.post('/create/:userid', async (req, res) => {
  try {
    if (req.body.uploadedImg) {
      data = await cldService.upload(req, 'list')
    } else if (req.body.linkImg) {
      req.body['cld_list_img_url'] = null
      req.body['cld_list_img_path'] = null
      req.body['list_img_web_link'] = req.body.linkImg
    }else{
        req.body['cld_list_img_url'] = null
      req.body['cld_list_img_path'] = null
      req.body['list_img_web_link'] = null
    }
    const created = await createListRecord(req.body, req.params.userid)
    res.status(200).json(created)
  } catch (err) {
    const error = { error: err.message }
    res.status(404).json(error)
  }
})

route.get('/getAllUsersList/:userId', async (req, res) => {
  try {
    const list = await getAllLists(req.params.userId)
    res.status(200).json(list)
  } catch (err) {
    const error = { error: err.message }
    res.status(404).json(error)
  }
})

route.get('/getOneList/:listid', async (req, res) => {
  try {
    const list = await getOneList(req.params.listid)
    res.status(200).json(list)
  } catch (err) {
    const error = { error: err.message }
    res.status(404).json(error)
  }
})

route.put('/update/:listid', async (req, res) => {
  try {
    const newData = req.body
    const updated = await updateListTitle(newData, req.params.listid)
    res.status(200).json(updated)
  } catch (err) {
    const error = { error: err.message }
    res.status(404).json(error)
  }
})

route.delete('/delete/:listid/:userid/:sectionid', async (req, res) => {
  try {
    const deleted = await deleteList(req.params.listid, req.params.userid, req.params.sectionid)
    if (deleted.cld_list_img_path) {
      await cldService.del(req, deleted)
      // await deleteImageFromCloudinary(req.cld, deleted.cld_list_img_path)
    }
    res.status(200).json(deleted)
  } catch (err) {
    const error = { error: err.message }
    res.status(404).json(error)
  }
})
module.exports = route
