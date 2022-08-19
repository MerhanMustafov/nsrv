const cld = require('cloudinary').v2
cld.config({
    cloud_name: process.env.CLD_CLOUD_NAME, 
    api_key: process.env.CLD_API_KEY, 
    api_secret: process.env.CLD_API_SECRET,
    secure: true
})

module.exports = () => (req, res, next) =>{
    req.cld = cld
    next()
}