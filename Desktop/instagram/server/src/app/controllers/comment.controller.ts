import express from "express"
import Comment, {
  AddCommentParams,
  CommentModel,
  CommentRes,
} from "../models/Comment"
import Post, { PostModel } from "../models/Post"
import User, { UserModel } from "../models/User"

class CommentController {
  async getChildComments(req: express.Request, res: express.Response) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    const { parent_id } = req.params
    const { user_id }: { user: UserModel; user_id: string } = req.locals
    try {
      const comments: CommentModel[] = await Comment.find({ parent_id })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(limit * offset)

      const newComments: CommentRes[] = await Promise.all(
        comments.map(async (item) => {
          const user: UserModel | null = await User.findById(item.user_id)

          return {
            parent_comment_id: parent_id,
            author_name: user?.user_name || "",
            author_id: user?._id || "",
            author_avatar: user?.avatar || "",
            is_author: item.user_id === user_id,
            content: item?.content || "",
            comment_id: item._id,
            like_count: item.liked_by_user_ids?.length || 0,
            created_at: item?.createdAt || "",
            is_liked_comment:
              item?.liked_by_user_ids?.includes(user_id) || false,
            comment_child_count: 0,
          }
        })
      )
      return res.json({ success: true, data: newComments })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async addComment(req: express.Request, res: express.Response) {
    const { user_id }: { user: UserModel; user_id: string } = req.locals
    const comment: AddCommentParams = req.body
    if (!comment?.post_id || !comment?.content)
      return res.json({ message: "missing required fields", success: false })

    const post: PostModel | null = await Post.findById({ _id: comment.post_id })
    if (!post) return res.json({ message: "post not found", success: false })

    if (post?.enable_comment === false)
      return res.json({
        message: "This post is blocking comments",
        success: false,
      })

    try {
      const commentSaved = new Comment({ ...comment, user_id })
      await commentSaved.save()

      return res.json({
        success: true,
        data: commentSaved,
        message: "Add comment successfully",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async deleteComment(req: express.Request, res: express.Response) {
    const { comment_id } = req.body
    if (!comment_id)
      return res.json({ message: "missing comment id", success: false })

    try {
      await Comment.findByIdAndDelete(comment_id)

      return res.json({
        success: true,
        data: { comment_id },
        message: "Delete comment successfully",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async updateComment(req: express.Request, res: express.Response) {
    const { comment_id } = req.body
    if (!comment_id)
      return res.json({ message: "missing comment id", success: false })

    try {
      const comment = await Comment.findByIdAndUpdate(
        comment_id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      )
      if (!comment)
        return res.json({ message: "comment not found", success: false })

      return res.json({
        success: true,
        data: { comment_id },
        message: "Update comment successfully",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async likeComment(req: express.Request, res: express.Response) {
    const { user_id }: { user_id: string } = req.locals
    const { comment_id } = req.body
    if (!comment_id)
      return res.json({ message: "missing comment id", success: false })

    try {
      await Comment.findByIdAndUpdate(
        comment_id,
        {
          $addToSet: {
            liked_by_user_ids: user_id,
          },
        },
        {
          new: true,
        }
      )

      return res.json({
        success: true,
        data: { comment_id },
        message: "Liked comment",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async unlikeComment(req: express.Request, res: express.Response) {
    const { user_id }: { user_id: string } = req.locals
    const { comment_id } = req.body
    if (!comment_id)
      return res.json({ message: "missing comment id", success: false })

    try {
      await Comment.findByIdAndUpdate(
        comment_id,
        {
          $pull: {
            liked_by_user_ids: user_id,
          },
        },
        {
          new: true,
        }
      )

      return res.json({
        success: true,
        data: { comment_id },
        message: "Liked comment",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}

export default new CommentController()
