import bcrypt from "bcryptjs"
import express from "express"
import User, { UserModel } from "../models/User"

class AuthController {
  async createUser(req: express.Request, res: express.Response) {
    const { email, phone, user_name, password, name } = req.body

    if (!user_name || !name)
      return res.json({ message: "missing required fields", success: false })

    try {
      let user: UserModel | null = null
      let field = ""

      if (email) {
        user = await User.findOne({ email })
        field = "email"
      } else if (phone) {
        user = await User.findOne({ phone })
        field = "phone"
      } else if (user_name) {
        user = await User.findOne({ user_name })
        field = "username"
      }

      if (user)
        return res.json({
          message: `${field || ""} is already exists`,
          success: false,
        })

      if (password) {
        const pwHashed = await bcrypt.hash(password, 10)
        const newUser = new User({ ...req.body, password: pwHashed })
        const saveUser = await newUser.save()
        return res.json({
          data: saveUser,
          message: "Create user successfully",
          success: true,
        })
      }

      const newUser = new User(req.body)
      await newUser.save()

      return res.json({
        data: newUser,
        message: "Create user successfully",
        success: true,
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  }

  async login(req: express.Request, res: express.Response) {
    const token = req.locals.token

    try {
      return res.json({
        data: { token },
        success: true,
        message: "successfully",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async loginWithFirebase(req: express.Request, res: express.Response) {
    const token = req.locals.token
    const { email, password } = req.body

    try {
      return res.json({
        data: { token },
        success: true,
        message: "successfully",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async changePassword(req: express.Request, res: express.Response) {
    const { user }: { user: UserModel } = req.locals
    const { current_password, new_password, confirm_password } = req.body

    try {
      if (!current_password || !new_password || !confirm_password)
        return res.json({ message: "missing required fields", success: false })

      if (confirm_password !== new_password)
        return res.json({
          message: "New password and current password must the same",
          success: false,
        })

      if (!(await bcrypt.compare(current_password, user.password)))
        return res.json({ message: "Password is incorrect", success: false })

      if (new_password === current_password)
        return res.json({
          message: "New password must different from current password",
          success: false,
        })

      const password = await bcrypt.hash(new_password, 10)
      await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            password,
          },
        },
        {
          new: true,
        }
      )

      return res.json({
        message: "Change password successfully",
        success: true,
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}

export default new AuthController()
