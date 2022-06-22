import cloudinary from "cloudinary"
require("dotenv").config()

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const uploads = (file: string, folder: string) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      (result: any) => {
        resolve({
          url: result.url,
          id: result.public_id,
        })
      },
      {
        resource_type: "auto",
        folder: folder,
      } as any
    )
  })
}

export default { uploads }
