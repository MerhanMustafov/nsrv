async function uploadListImageToCloudinary(cld, imageFile){
    return await cld.uploader.upload(imageFile, {folder: `${process.env.CLD_FOLDER}/list`, height: 1000, width:1500, crop: "lfill"}, (err, result) => {
        if(err){throw new Error(err.message)}
        else{return result}
    })

}
async function uploadProfileImageToCloudinary(cld, imgFile){
    return await cld.uploader.upload(imgFile, {folder: `${process.env.CLD_FOLDER}/profile`, height: 250, width:250, crop: "lfill"}, (err, result) => {
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
    uploadListImageToCloudinary,
    deleteImageFromCloudinary,
    uploadProfileImageToCloudinary
}