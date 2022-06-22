import express, { NextFunction } from "express"
import { DEFAULT_MESSAGE, URL_REGEX } from "../../helpers/constant"
import Comment, { CommentModel } from "../models/Comment"
import Post, { PostModel } from "../models/Post"
import User, {
  UpdateUserParams,
  UserModel,
  UserProfileForm,
} from "../models/User"

class UserController {
  async getProfile(req: express.Request, res: express.Response) {
    try {
      const user_id = req.query?.user_id || req.locals.user_id
      const { user_name } = req.query
      const { user_id: logged_user_id } = req.locals

      const user: UserModel | null = user_name
        ? await User.findOne({ user_name })
        : await User.findById(user_name)
      if (!user) return res.json({ message: "user not found", success: false })

      const following_user_count = await User.countDocuments({
        $in: {
          _id: user.following_user_ids,
        },
      })
      const followed_user_count = await User.countDocuments({
        $in: {
          _id: user.followed_by_user_ids,
        },
      })
      const post_count = await Post.countDocuments({ user_id: user._id })
      const userInfo = {
        user_id: user._id,
        name: user.name,
        user_name: user.user_name,
        avatar: user.avatar || "",
        description: user.description || "",
        is_author: user._id.toString() === logged_user_id,
        post_count,
        website_link: user?.website_link || "",
        following_user_count,
        followed_user_count,
        is_follwing_user: user.followed_by_user_ids.includes(logged_user_id),
      }

      return res.json({
        data: userInfo,
        success: true,
        message: "Congratulations",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async getUserNames(req: express.Request, res: express.Response) {
    try {
      const users = await User.find().limit(1000).lean()
      if (!users?.length)
        return res.json({ message: DEFAULT_MESSAGE, data: [], success: true })
      return res.json({
        message: DEFAULT_MESSAGE,
        data: users.map((user) => user.user_name),
        success: true,
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async getUserForm(req: express.Request, res: express.Response) {
    try {
      const { user }: { user: UserModel } = req.locals
      const userForm: UserProfileForm = {
        avatar: user?.avatar || "",
        date_of_birth: user?.date_of_birth || "",
        email: user?.email || "",
        gender: user?.gender || "",
        user_name: user.user_name,
        name: user.name,
        website_link: user?.website_link || "",
        description: user?.description || "",
        phone: user?.phone || "",
      }

      return res.json({
        message: DEFAULT_MESSAGE,
        success: true,
        data: { user: userForm },
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async searchPeople(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    const keyword = req.query?.keyword || ""

    try {
      const users: UserModel[] = await User.find({
        $and: [
          {
            $or: [
              { user_name: { $regex: keyword, $options: "i" } },
              { name: { $regex: keyword, $options: "i" } },
            ],
          },
        ],
      })
        .limit(limit)
        .skip(limit * offset)
        .lean()

      req.locals = { ...req.locals, user_list: users }
      return next()
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async changeAvatar(req: express.Request, res: express.Response) {
    try {
      const { avatar } = req.body
      if (!avatar)
        return res.json({ message: "missing avatar url", success: false })

      if (!URL_REGEX.test(avatar))
        return res.json({
          message: "invalid avatar url format",
          success: false,
        })

      const { user_id } = req.locals
      await User.findByIdAndUpdate(
        user_id,
        {
          $set: {
            avatar,
          },
        },
        {
          new: true,
        }
      )

      return res.json({
        message: "updated avatar",
        success: true,
        data: { avatar: avatar },
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async updateUserInfo(req: express.Request, res: express.Response) {
    const user: UpdateUserParams = req.body
    try {
      if (!user || Object.keys(user).length < 8)
        return res.json({ message: "Missing required fields", success: false })

      const {
        user: userLocals,
        user_id,
      }: { user: UserModel; user_id: string } = req.locals
      const mergeUser: UserModel = { ...user, ...userLocals }

      if (user.user_name !== userLocals.user_name) {
        if (await User.findOne({ user_name: user.user_name })) {
          return res.json({
            message: "Username is already exist",
            success: false,
          })
        }
      }

      const updateUser: UpdateUserParams = {
        name: mergeUser.name,
        user_name: mergeUser.user_name,
        website_link: mergeUser?.website_link || "",
        description: mergeUser?.description || "",
        email: mergeUser?.email || "",
        gender: mergeUser?.gender || "",
        phone: mergeUser?.phone || "",
      }

      await User.findByIdAndUpdate(
        user_id,
        {
          $set: updateUser,
        },
        {
          new: true,
        }
      )

      return res.json({
        message: "Update profile successfully",
        success: true,
        data: { user: updateUser },
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async followUser(req: express.Request, res: express.Response) {
    const { partner_id } = req.body
    const { user_id } = req.locals

    if (!partner_id)
      return res.json({ message: "missing partner id", success: false })

    try {
      const partner = await User.findByIdAndUpdate(
        partner_id,
        {
          $addToSet: {
            followed_by_user_ids: user_id,
          },
        },
        {
          new: true,
        }
      )
      if (!partner)
        return res.json({ message: "partner user not found", success: false })

      await User.findByIdAndUpdate(
        user_id,
        {
          $addToSet: {
            following_user_ids: partner_id,
          },
        },
        {
          new: true,
        }
      )

      return res.json({
        message: "followed user",
        success: true,
        data: {
          partner_id,
        },
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async unfollowUser(req: express.Request, res: express.Response) {
    const { partner_id } = req.body
    const { user_id } = req.locals

    if (!partner_id)
      return res.json({ message: "missing partner id", success: false })

    try {
      const partner = await User.findByIdAndUpdate(
        partner_id,
        {
          $pull: {
            followed_by_user_ids: user_id,
          },
        },
        {
          new: true,
        }
      )
      if (!partner)
        return res.json({ message: "partner user not found", success: false })

      await User.findByIdAndUpdate(
        user_id,
        {
          $pull: {
            following_user_ids: partner_id,
          },
        },
        {
          new: true,
        }
      )

      return res.json({
        message: "unfollowed user",
        success: true,
        data: {
          partner_id,
        },
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async getSuggestPeople(req: express.Request, res: express.Response) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    const { user }: { user_id: string; user: UserModel } = req.locals

    try {
      const users: UserModel[] = await User.find({
        _id: {
          $nin: [...user.following_user_ids, user._id, ...user.block_user_ids],
        },
      })
        .limit(limit)
        .skip(limit * offset)
        .lean()

      if (users.length === 0) return res.json({ data: [], success: false })

      const newUsers = users.map((user) => ({
        user_id: user._id,
        name: user.name,
        user_name: user.user_name,
        avatar: user?.avatar || "",
        is_following: user.following_user_ids.includes(user._id.toString()),
      }))

      return res.json({
        success: true,
        data: newUsers,
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async blockUser(req: express.Request, res: express.Response) {
    const { user_id }: { user_id: string } = req.locals
    const { partner_id } = req.body
    if (!partner_id)
      return res.json({ message: "missing partner id", success: false })

    try {
      await User.findByIdAndUpdate(
        user_id,
        {
          $set: {
            block_user_ids: partner_id,
          },
        },
        { new: true }
      )
      await User.findByIdAndUpdate(
        user_id,
        {
          $pull: {
            following_user_ids: partner_id,
            followed_by_user_ids: partner_id,
          },
        },
        { new: true }
      )
      await User.findByIdAndUpdate(
        partner_id,
        {
          $pull: {
            followed_by_user_ids: user_id,
            following_user_ids: user_id,
          },
        },
        { new: true }
      )

      return res.json({
        success: true,
        message: "Blocked user",
        data: partner_id,
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async unblockUser(req: express.Request, res: express.Response) {
    const { user_id }: { user_id: string; user: UserModel } = req.locals
    const { partner_id } = req.body
    if (!partner_id)
      return res.json({ message: "missing partner id", success: false })

    try {
      await User.findByIdAndUpdate(
        user_id,
        {
          $pull: {
            block_user_ids: partner_id,
          },
        },
        { new: true }
      )

      return res.json({
        success: true,
        message: "unblocked user",
        data: partner_id,
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async getFollowingUsers(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    const { user }: { user_id: string; user: UserModel } = req.locals
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    try {
      const users: UserModel[] = await User.find({
        _id: { $in: user.following_user_ids },
      })
        .limit(limit)
        .skip(limit * offset)
        .lean()

      req.locals = { ...req.locals, user_list: users }
      return next()
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async getFollowedUsers(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    const { user }: { user_id: string; user: UserModel } = req.locals
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    try {
      const users: UserModel[] = await User.find({
        _id: { $in: user.followed_by_user_ids },
      })
        .limit(limit)
        .skip(limit * offset)
        .lean()

      req.locals = { ...req.locals, user_list: users }
      return next()
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async getUsersLikedPost(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    const { post_id } = req.query
    if (!post_id)
      return res.json({ message: "missing post_id", success: false })

    try {
      const post: PostModel | null = await Post.findById(post_id)
      if (!post) return res.json({ message: "post not found", success: false })

      const users: UserModel[] = await User.find({
        _id: { $in: post?.liked_by_user_ids || [] },
      })
        .limit(limit)
        .skip(limit * offset)
        .lean()
      req.locals = { ...req.locals, user_list: users }
      return next()
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async getUsersLikedComment(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    const { comment_id } = req.query
    if (!comment_id)
      return res.json({ message: "missing comment_id", success: false })

    try {
      const comment: CommentModel | null = await Comment.findById(comment_id)
      if (!comment)
        return res.json({ message: "comment not found", success: false })

      const users: UserModel[] = await User.find({
        _id: { $in: comment?.liked_by_user_ids || [] },
      })
        .limit(limit)
        .skip(limit * offset)
        .lean()
      req.locals = { ...req.locals, user_list: users }
      return next()
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async savePost(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    const { post_id } = req.body
    if (!post_id)
      return res.json({ message: "missing post_id", success: false })

    try {
      if (!(await Post.findById(post_id)))
        return res.json({ message: "post not found", success: false })

      const post: PostModel | null = await Post.findById(post_id)
      if (!post) return res.json({ message: "post not found", success: false })

      const users: UserModel[] = await User.find({
        _id: { $in: post?.liked_by_user_ids || [] },
      })

      req.locals = { ...req.locals, user_list: users }
      return next()
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}
export default new UserController()
