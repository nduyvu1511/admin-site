import express from "express"
import AuthController from "../app/controllers/auth.controller"
import { loginMiddleWare } from "../app/middlewares/auth.middleware"
import { verifyToken } from "../app/middlewares/token.middleware"
import { getUser } from "../app/middlewares/user.middleware"

const router = express.Router()

router.post("/register", AuthController.createUser)
router.post("/login", loginMiddleWare, AuthController.login)
router.post("/firebase_login", AuthController.loginWithFirebase)
router.post(
  "/change_password",
  verifyToken,
  getUser,
  AuthController.changePassword
)

export default router
