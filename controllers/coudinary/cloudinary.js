async function uploadImageToCloudinary(cld, imgFile){
    return await cld.uploader.upload(imgFile, {folder: 'images/list', height: 1000, width:1500, crop: "lfill"}, (err, result) => {
        if(err){throw new Error(err.message)}
        else{return result}
    })

}
async function uploadProfileImageToCloudinary(cld, imgFile){
    return await cld.uploader.upload(imgFile, {folder: 'images/profile', height: 250, width:250, crop: "lfill"}, (err, result) => {
        if(err){throw new Error(err.message)}
        else{return result}
    })

}

async function deleteImageFromCloudinary(cld, image_public_id){
    await cld.api.delete_resources([image_public_id], (err, result) => {
        if(err){throw new Error(err.message)}
    })

}

module.exports = {
    uploadImageToCloudinary,
    deleteImageFromCloudinary,
    uploadProfileImageToCloudinary
}