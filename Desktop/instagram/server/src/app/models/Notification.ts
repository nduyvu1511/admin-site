import mongoose from "mongoose"

const Notification = new mongoose.Schema(
  {
    user_id: { type: String, ref: "User", required: true },
    partner_id: { type: String, ref: "User", required: true },
    message: { type: String, required: true, minlength: 1 },
    type: {
      type: String,
      required: true,
      enum: ["TAG", "MENTION", "LIKE", "FOLLOW"],
    },
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

  { timestamps: true, _id: false }
)

interface INotification {
  user_id: string
  partner_id: string
  message: string
  type: string
  post_id: string
  parent_id: string
  content: string
  liked_by_user_ids: string[]
  createdAt: string
  updatedAt: string
}

export interface NotificationModel extends INotification {
  _id: string
}

export interface NotificationParams extends INotification {
  notification_id: string
}

export default mongoose.model("Notification", Notification)
