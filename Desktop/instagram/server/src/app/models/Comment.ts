import mongoose from "mongoose"

const Comment = new mongoose.Schema(
  {
    user_id: { type: String, ref: "User", required: true },
    post_id: { type: String, ref: "Post", required: true },
    parent_id: { type: String, ref: "User", required: false, default: "" },
    content: { type: String, required: true, minlength: 1 },
    liked_by_user_ids: [
      { type: String, ref: "User", unique: true },
      {
        _id: false,
        default: [],
      },
    ],
  },

  { timestamps: true }
)

export default mongoose.model("Comment", Comment)

interface IComment {
  user_id: string
  post_id: string
  parent_id: string
  content: string
  liked_by_user_ids: string[]
  createdAt: string
  updatedAt: string
}

export interface CommentModel extends IComment {
  _id: string
}

export interface CommentRes {
  parent_comment_id: string
  author_name: string
  author_id: string
  author_avatar: string
  is_author: boolean
  content: string
  comment_id: string
  like_count: number
  created_at: string
  is_liked_comment: boolean
  comment_child_count: number
}

export interface AddCommentParams {
  post_id: string
  parent_id: string
  content: string
}
