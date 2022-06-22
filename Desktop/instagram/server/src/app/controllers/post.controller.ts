import express from "express"
import { URL_REGEX } from "../../helpers/constant"
import Comment, { CommentModel, CommentRes } from "../models/Comment"
import Post, { PostDetailRes, PostModel, PostRes } from "../models/Post"
import User, { UserModel } from "../models/User"

class PostController {
  async createPost(req: express.Request, res: express.Response) {
    const { user_id }: { user_id: string } = req.locals
    const { caption, image_urls } = req.body
    if (!caption || !image_urls || image_urls?.length === 0)
      return res.json({ message: "missing required fields", success: false })

    if ((image_urls as string[]).every((item) => !URL_REGEX.test(item)))
      return res.json({
        message: "image url is invalid format",
        success: false,
      })

    try {
      const newPost = new Post({ ...req.body, user_id })
      await newPost.save()

      return res.json({
        message: "Create post successfully",
        success: true,
        data: newPost,
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async deletePost(req: express.Request, res: express.Response) {
    try {
      const { post_id } = req.body

      if (!post_id)
        return res.json({ message: "missing post id", success: false })

      const post = await Post.findByIdAndUpdate(
        post_id,
        {
          $set: {
            active: false,
          },
        },
        { new: true }
      )

      if (!post) return res.json({ message: "post not found", success: false })

      return res.json({
        message: "delete post successfully",
        success: true,
        data: post_id,
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async updatePost(req: express.Request, res: express.Response) {
    if (!req?.body || Object.keys(req.body).length === 0)
      return res.json({ message: "missing required fields", success: false })

    if (!req?.body?.post_id)
      return res.json({ message: "missing post id", success: false })

    try {
      const post = await Post.findByIdAndUpdate(
        req.body.post_id,
        {
          $set: req.body,
        },
        { new: true }
      )
      if (!post) return res.json({ message: "post not found", success: false })

      return res.json({
        message: "Update post successfully",
        success: true,
        data: post,
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async getPostDetail(req: express.Request, res: express.Response) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    const { post_id } = req.params
    const { user: currentUser, user_id }: { user: UserModel; user_id: string } =
      req.locals

    try {
      const post: PostModel = await Post.findById(post_id).lean()
      const user: UserModel | null = await User.findById(post.user_id)
      const comments: CommentModel[] = await Comment.find({
        $and: [{ post_id }, { parent_id: "" }],
      })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(limit * offset)
        .lean()

      const comment_count = await Comment.countDocuments({
        $and: [{ post_id: post._id }, { parent_id: "" }],
      })

      const newComments: CommentRes[] = await Promise.all(
        comments.map(async (item) => {
          const user: null | UserModel = await User.findById(item.user_id)
          const comment_child_count: number = await Comment.countDocuments({
            $and: [{ post_id: item.post_id }, { parent_id: item._id }],
          })

          return {
            parent_comment_id: "",
            author_avatar: user?.avatar || "",
            author_id: user?._id || "",
            author_name: user?.name || "",
            author_user_name: user?.user_name || "",
            comment_child_count,
            is_author: item.user_id === currentUser._id.toString(),
            content: item.content,
            comment_id: item._id,
            like_count: item?.liked_by_user_ids?.length || 0,
            created_at: item.createdAt || "",
            is_liked_comment:
              item.liked_by_user_ids?.includes(currentUser._id.toString()) ||
              false,
          } as CommentRes
        })
      )

      const postDetail: PostDetailRes = {
        author_id: user?._id || "",
        author_name: user?.user_name || "",
        author_avatar: user?.avatar || "",
        post_id: post._id,
        image_urls: post.image_urls || "",
        caption: post?.caption || "",
        like_count: post?.liked_by_user_ids?.length || 0,
        is_author: post.user_id === user_id,
        comment_count,
        is_following_author: currentUser?.following_user_ids?.includes(
          post.user_id
        ),
        is_liked_post: post.liked_by_user_ids?.includes(user_id),
        created_at: post.createdAt || "",
        hashtags: post?.hashtags || [],
        enable_comment: post?.enable_comment || false,
        comments: newComments,
      }

      return res.json({
        data: postDetail,
        success: true,
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async getPostList(req: express.Request, res: express.Response) {
    const {
      user_id: logged_user_id,
      user: currentUser,
    }: { user_id: string; user: UserModel } = req.locals
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    const type_get = req.query?.type_get || "newsfeed"

    try {
      let query: Object = {}
      if (type_get === "newsfeed") {
        query = {
          user_id: {
            $in: currentUser?.following_user_ids || [],
          },
        }
      } else if (type_get === "explore") {
        query = {
          user_id: {
            $nin: currentUser?.following_user_ids || [],
          },
        }
      } else if (type_get === "user") {
        query = {
          user_id: req.query?.value || logged_user_id || "",
        }
      } else if (type_get === "hashtag") {
        query = {
          hashtags: req?.query?.value || "",
        }
      } else if (type_get === "saved") {
        query = {
          _id: { $in: currentUser?.saved_post_ids || [] },
        }
      }

      const posts: PostModel[] = await Post.find({
        $and: [
          { active: true },
          { user_id: { $nin: currentUser?.block_user_ids || [] } },
          query,
        ],
      })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(offset * limit)
        .lean()

      if (posts.length === 0) return res.json({ success: true, data: [] })

      const newPosts = await Promise.all(
        [...posts].map(async (item) => {
          const comment_count =
            item?.enable_comment === false
              ? 0
              : await Comment.countDocuments({
                  post_id: item._id,
                })

          const user: UserModel | null = await User.findById(item.user_id)

          return {
            author_id: user?._id || "",
            author_name: user?.name || "",
            author_user_name: user?.user_name || "",
            author_avatar: user?.avatar || "",
            post_id: item?._id || "",
            image_urls: item.image_urls || [],
            caption: item?.caption || "",
            like_count: item?.liked_by_user_ids?.length || 0,
            is_author: item.user_id === logged_user_id,
            comment_count,
            is_following_author:
              currentUser.following_user_ids?.includes(item.user_id) || false,
            is_liked_post:
              item.liked_by_user_ids?.includes(currentUser._id.toString()) ||
              false,
            created_at: item?.createdAt || "",
            hashtags: item?.hashtags || [],
            enable_comment: item?.enable_comment || false,
          } as PostRes
        })
      )

      return res.json({ data: newPosts, success: true })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async likePost(req: express.Request, res: express.Response) {
    const { user_id } = req.locals
    const { post_id } = req.body
    if (!post_id)
      return res.json({ message: "missing post id", success: false })

    try {
      const post: PostModel | null = await Post.findByIdAndUpdate(
        post_id,
        {
          $addToSet: {
            liked_by_user_ids: user_id,
          },
        },
        {
          new: true,
        }
      )
      if (!post) return res.json({ message: "post not found", success: false })

      return res.json({
        message: "Liked post",
        success: true,
        data: { post_id, like_count: post?.liked_by_user_ids?.length || 0 },
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async unlikePost(req: express.Request, res: express.Response) {
    const { user_id } = req.locals
    const { post_id } = req.body
    if (!post_id)
      return res.json({ message: "missing post id", success: false })

    try {
      const post: PostModel | null = await Post.findByIdAndUpdate(
        post_id,
        {
          $pull: {
            liked_by_user_ids: user_id,
          },
        },
        {
          new: true,
        }
      )
      if (!post) return res.json({ message: "post not found", success: false })

      return res.json({
        message: "Unliked post",
        success: true,
        data: { post_id, like_count: post?.liked_by_user_ids?.length || 0 },
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async toggleComment(req: express.Request, res: express.Response) {
    const { post_id, status } = req.body
    if (!post_id)
      return res.json({ message: "missing post id", success: false })
    console.log(req.body)
    if (status !== true && status !== false)
      return res.json({ message: "missing status", success: false })

    try {
      const post = await Post.findByIdAndUpdate(
        post_id,
        {
          enable_comment: status,
        },
        {
          new: true,
        }
      )
      if (!post) return res.json({ message: "post not found", success: false })

      return res.json({
        message: `${status ? "Unblock" : "Block"} commenting`,
        success: true,
        data: { post_id },
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}

export default new PostController()
