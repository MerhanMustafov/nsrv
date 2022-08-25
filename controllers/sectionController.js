const route = require('express').Router()
const api = require('../services/sectionService')
route.post('/create', async (req, res) => {
    const data = req.body
    try{    
        const created = await api.createSection(data)
        console.log(created)
        res.status(200).json(created)
    }catch (err) {
        const error = {error: err.message}
        res.status(400).json(error)
    }
})


module.exports = route