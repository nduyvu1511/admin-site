import cloudinary from "cloudinary"
import fs from "fs"
import express from "express"

class UploadController {
  async uploadImages(req: express.Request, res: express.Response) {
    // try {
    //   if (!req.files || Object.keys(req.files).length === 0)
    //     return res.status(400).json({ msg: "No files were uploaded." })
    //   const file = req.files.file
    //   if (file.size > 1024 * 1024) {
    //     this.removeTmp(file.tempFilePath)
    //     return res.status(400).json({ msg: "Size too large" })
    //   }
    //   if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
    //     this.removeTmp(file.tempFilePath)
    //     return res.status(400).json({ msg: "File format is incorrect." })
    //   }
    //   cloudinary.v2.uploader.upload(
    //     file.tempFilePath,
    //     { folder: "test" },
    //     async (err, result) => {
    //       if (err) throw err
    //       this.removeTmp(file.tempFilePath)
    //       res.json({ public_id: result.public_id, url: result.secure_url })
    //     }
    //   )
    // } catch (err) {
    //   return res.status(500).json({ msg: err.message })
    // }
  }

  async deleteImage(req: express.Request, res: express.Response) {
    // try {
    //   const { public_id } = req.body
    //   if (!public_id) return res.status(400).json({ msg: "No images Selected" })
    //   cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
    //     if (err) throw err
    //     res.json({ msg: "Deleted Image" })
    //   })
    // } catch (err) {
    //   return res.status(500).json({ msg: err.message })
    // }
  }

  removeTmp(path: any) {
    fs.unlink(path, (err) => {
      if (err) throw err
    })
  }
}

export default new UploadController()
