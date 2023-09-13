import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()        
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_KEY_SECRET 
})

export async function uploadImage(filePath){
    return await
     cloudinary.uploader.upload(filePath, { folder : 'incident-images'})
     
}

export async function deleteImage(publicId){
    return await cloudinary.uploader.destroy(publicId)
}