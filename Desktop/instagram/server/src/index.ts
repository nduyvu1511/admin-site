import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import cors from "cors"
import path from "path"
import route from "./routes"
import db from "./config"

declare global {
  namespace Express {
    interface Request {
      locals: any
    }
  }
}

require("dotEnv").config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

db.connect()

app.use(morgan("combined"))

const corsConfig = {
  origin: true,
  Credential: true,
}

app.use(cors(corsConfig))

route(app)

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
})
