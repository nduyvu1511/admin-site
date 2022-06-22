import express from "express"
import UploadController from "../app/controllers/upload.controller"
import { upload } from "../app/middlewares/multer.middleware"
const router = express.Router()

router.post("/images", upload.array("image"), UploadController.uploadImages)

export default router
