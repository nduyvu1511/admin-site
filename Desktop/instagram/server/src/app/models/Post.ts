import mongoose from "mongoose"
import { URL_REGEX } from "../../helpers/constant"
import { validateUrl } from "../../helpers/functions"
import { CommentRes } from "./Comment"

const Post = new mongoose.Schema(
  {
    caption: { type: String, required: true, minlength: 1, trim: true },
    user_id: { type: String, ref: "User", required: true },
    active: { type: Boolean, required: false, default: true },
    partner_ids: { type: String, required: false, unique: true, ref: "User" },
    hashtags: [
      { type: String, required: false },
      {
        _id: false,
        default: [],
      },
    ],
    image_urls: [
      {
        type: String,
        required: true,
        validate: [validateUrl, "Invalid image url"],
        match: [URL_REGEX, "Invalid image url"],
      },
      {
        minlength: 1,
        _id: false,
      },
    ],
    liked_by_user_ids: [
      { type: String, required: false, unique: true, ref: "User" },
      {
        _id: false,
        default: [],
      },
    ],
    enable_comment: { type: Boolean, required: false, default: true },
  },

  { timestamps: true }
)

export default mongoose.model("Post", Post)

interface IPost {
  caption: string
  user_id: string
  active: boolean
  partner_ids: string
  hashtags: string[]
  image_urls: string[]
  liked_by_user_ids: string[]
  enable_comment: boolean
  createdAt: string
  updatedAt: string
}

export interface PostModel extends IPost {
  _id: string
}

export interface PostParams extends IPost {
  post_id: string
}

export interface QueryPostParams {
  explore: boolean
  user_id: string
}

export interface PostRes {
  author_id: string
  author_name: string
  author_avatar: string
  post_id: string
  image_urls: string[]
  caption: string
  like_count: number
  is_author: boolean
  comment_count: number
  is_following_author: boolean
  is_liked_post: boolean
  created_at: string
  hashtags: string[]
  enable_comment: boolean
}

export interface PostDetailRes extends PostRes {
  comments: CommentRes[]
}

export interface CreatePostProps {
  caption: string
  user_id: string
  image_urls: string[]
}

export type TypeGet = "explore" | "user" | "newsfeed" | "saved" | "hashtag"

// Note: if you use hashtag type get, you must another field named: value and key is the hastag you want to query
