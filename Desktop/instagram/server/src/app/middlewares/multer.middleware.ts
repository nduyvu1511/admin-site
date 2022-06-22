import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/")
  },

  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    )
  },
})

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true)
  } else {
    //reject file
    cb({ message: "Unsupported file format" }, false)
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1920 * 1920 },
  fileFilter: fileFilter,
})

export { upload }
