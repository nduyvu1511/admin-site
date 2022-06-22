import { UserModel } from "./../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import express from "express"
import User from "../models/User"

export const loginMiddleWare = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, password, user_name, phone } = req.body
  try {
    if (!user_name && !phone && !email)
      return res.json({ message: "Missing required field", success: false })

    if (!password)
      return res.json({ message: "Missing password", success: false })

    const query = user_name ? { user_name } : phone ? { phone } : { email }
    const user: null | UserModel = await User.findOne(query)
    if (!user) return res.json({ message: "User not found", success: false })

    if (!(await bcrypt.compare(password, user.password)))
      return res.json({ message: "Password is not match", success: false })

    const token = jwt.sign(
      { user_id: user._id },
      process.env.JWT_SECRET as string
    )

    req.locals = { token }
    next()
  } catch (error) {
    return res.status(400).send(error)
  }
}
