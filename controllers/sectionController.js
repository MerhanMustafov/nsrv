const route = require('express').Router()
const api = require('../services/sectionService')
route.post('/create', async (req, res) => {
    const data = req.body
    console.log(data)
    try{    
        const created = await api.createSection(data)
        console.log(created)
        res.status(200).json(created)
    }catch (err) {
        const error = {error: err.message}
        res.status(400).json(error)
    }
})

route.get('/get/all/:ownerid', async (req, res) =>{
    try{
        const sections = await api.getAll(req.params.ownerid)
        res.status(200).json(sections)
    }catch (err) {
        const error = {error: err.message}
        res.status(400).json(error)
    }
})

route.get(`/get/one/:sectionid`, async (req, res) => {
    try{
        const section = await api.getOne(req.params.sectionid)
        res.status(200).json(section)
    }catch (err) {
        const error = {error: err.message}
        res.status(400).json(error)
    }
})
route.get(`/get/byname/:sectionname`, async (req, res) => {
    try{
        const section = await api.getByName(req.params.sectionname)
        console.log(section, 'byname')
        res.status(200).json(section)
    }catch (err) {
        const error = {error: err.message}
        res.status(400).json(error)
    }
})

route.delete('/delete/:id', async (req, res) => {
    try{
        const deleted = await api.deleteOne(req)
        res.status(200).json(deleted)
    }catch (err) {
        const error = { error: err.message }
        res.status(400).json(error)
    }
})

module.exports = route