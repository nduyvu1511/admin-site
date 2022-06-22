import mongoose from "mongoose"

const Channel = new mongoose.Schema(
  {
    user_id: { type: String, ref: "User", required: true },
    channel_name: { type: String, required: true, minlength: 1 },
    channel_image: { type: String, required: true },
    partner_ids: [
      {
        type: String,
        required: true,
        minlength: 2,
        unique: true,
        ref: "Users",
      },
      {
        _id: false,
      },
    ],
    messages: [
      {
        user_id: {
          type: String,
          required: true,
          unique: true,
          ref: "Users",
        },
        message: { type: String, required: true, minlength: 1 },
      },
      {
        _id: false,
      },
    ],
  },

  { timestamps: true }
)

export default mongoose.model("Channel", Channel)

interface IChannel {
  user_id: string
  post_id: string
  parent_id: string
  content: string
  liked_by_user_ids: string[]
  createdAt: string
  updatedAt: string
}
