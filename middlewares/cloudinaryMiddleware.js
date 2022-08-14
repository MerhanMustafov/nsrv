const cld = require('cloudinary').v2
cld.config({
    cloud_name: 'ncdnstorage', 
    api_key: '848844145694647', 
    api_secret: 'eMV-IuhQYF-Vxe-27wj6mgcvfI4',
    secure: true
})

module.exports = () => (req, res, next) =>{
    req.cld = cld
    next()
}