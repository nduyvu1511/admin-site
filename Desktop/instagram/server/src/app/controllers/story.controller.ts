import express from "express"
import { DEFAULT_MESSAGE } from "../../helpers/constant"
import Story from "../models/Story"
import User, { UserModel } from "../models/User"

class StoryController {
  async getUsersHasStory(req: express.Request, res: express.Response) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    try {
      const { user }: { user: UserModel } = req.locals
      const users: UserModel[] = await User.find({
        $and: [{ _id: { $in: user?.following_user_ids || [] } }, {}],
      })
        .limit(limit)
        .skip(limit * offset)

      if (users?.length === 0)
        return res.json({ message: DEFAULT_MESSAGE, success: true, data: [] })

      const newUsers = await Promise.all(
        users.map(async (item) => {
          const story_count = await Story.find({ user_id: item._id })
          return {
            user_id: item._id,
            user_name: item.user_name,
            avatar: item?.avatar || "",
            story_count,
          }
        })
      )

      return res.json({
        success: true,
        data: [...newUsers].map((item) => item.story_count),
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async getStoriesByUser(req: express.Request, res: express.Response) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    const { parent_id } = req.params
    const { user_id }: { user: UserModel; user_id: string } = req.locals
    try {
      const stories = await Story.find()
      return res.json(stories)
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async createStory(req: express.Request, res: express.Response) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    const { parent_id } = req.params
    const { user_id }: { user: UserModel; user_id: string } = req.locals
    try {
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async deleteStory(req: express.Request, res: express.Response) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    const { parent_id } = req.params
    const { user_id }: { user: UserModel; user_id: string } = req.locals
    try {
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async updateStory(req: express.Request, res: express.Response) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    const { parent_id } = req.params
    const { user_id }: { user: UserModel; user_id: string } = req.locals
    try {
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}

export default new StoryController()
