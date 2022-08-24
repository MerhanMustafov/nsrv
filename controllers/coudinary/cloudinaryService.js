const cloudinary = require('./cloudinary')

async function upload(req, folder) {
  let response
  const [cld, imageFile] = [req.cld, req.body.uploadedImg]
  try {
    if (folder == 'list') {
      response = await cloudinary.uploadListImageToCloudinary(cld, imageFile)
      req.body['cld_list_img_url'] = response.secure_url
      req.body['cld_list_img_path'] = response.public_id
      req.body['list_img_web_link'] = null
    } else if (folder == 'profile') {
      response = await cloudinary.uploadProfileImageToCloudinary(cld, imageFile)
      req.body['cld_profile_img_url'] = response.secure_url
      req.body['cld_profile_img_path'] = response.public_id
      req.body['profile_img_web_link'] = null
      req.body['default_image_male'] = null
      req.body['default_image_female'] = null
    }
  } catch (err) {
    throw new Error('Something went wrong while uploading image !')
  }
  delete req.body.uploadedImg
  return req.body
}

async function del(req, data) {
  await cloudinary.deleteImageFromCloudinary(req.cld, data.cld_list_img_path)
}

module.exports = { upload, del }
