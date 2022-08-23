import * as cloudinary from './cloudinary'

async function upload(req, folder){
    if(folder == 'list'){
        try{
            const [cld, imageFile, data] = [req.cld, req.body.uploadedImg, req.body]
            const result = await cloudinary.uploadListImageToCloudinary(cld, imageFile)
            delete data.uploadedImg
            data['cld_list_img_url'] = result.secure_url
            data['cld_list_img_path'] = result.public_id
            return data
        }catch(err){
            throw new Error('Something went wrong while uploading image !')
        }
    }else if(folder == 'profile'){

    }
}

async function del(req, dbData, clData){
    await cloudinary.deleteImageFromCloudinary(req.cld, dbData.cld_list_img_path)
}


module.exports = {upload ,del}