import cloudinary from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const uploads = (file, folder) => {
  return new Promise((resolver) => {
    cloudinary.v2.uploader.upload(
      file, 
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        })
      },
        {
          
      }
    )
  })
}
