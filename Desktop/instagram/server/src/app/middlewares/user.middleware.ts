import express, { NextFunction } from "express"
import User, { UserModel } from "../models/User"

export const getUser = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  const { user_id } = req.locals

  try {
    const user = await User.findById(user_id)
    if (!user) return res.json({ message: "user not found", success: false })

    req.locals = { user, user_id }
    return next()
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const getUsers = async (req: express.Request, res: express.Response) => {
  const {
    user,
    user_list,
  }: {
    user_list: UserModel[]
    user: UserModel
  } = req.locals

  try {
    if (!user_list || user_list.length === 0)
      return res.json({ success: true, data: [] })

    const newUsers = user_list.map((item) => ({
      user_id: item._id,
      name: item.name,
      user_name: item.user_name,
      avatar: item?.avatar || "",
      is_following: user.following_user_ids?.includes(item._id.toString()),
      is_author: user._id.toString() === item._id.toString(),
    }))

    return res.json({
      success: true,
      data: newUsers,
    })
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const createUser = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  const { email, phone, user_name } = req.body
}
