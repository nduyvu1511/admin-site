import mongoose from "mongoose"
import { URL_REGEX } from "../../helpers/constant"
import { validateUrl } from "../../helpers/functions"

const Story = new mongoose.Schema(
  {
    caption: { type: String, required: true, minlength: 1 },
    user_id: { type: String, ref: "User", required: true },
    active: { type: Boolean, required: false, default: true },
    image_url: {
      type: String,
      required: true,
      validate: [validateUrl, "Invalid image url"],
      match: [URL_REGEX, "Invalid image url"],
    },
    liked_by_user_ids: [
      { type: String, required: false, unique: true, ref: "User" },
      {
        _id: false,
        default: [],
      },
    ],
  },

  { timestamps: true }
)

export default mongoose.model("Story", Story)

interface IStory {
  caption: string
  user_id: string
  active: boolean
  image_url: string[]
  liked_by_user_ids: string[]
  createdAt: string
  updatedAt: string
}

export interface StoryParams extends IStory {
  story_id: string
}

export interface StoryModel extends IStory {
  _id: string
}
