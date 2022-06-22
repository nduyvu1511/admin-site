import mongoose from "mongoose"
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
  URL_REGEX,
} from "../../helpers/constant"
import {
  validateEmail,
  validateNoSpace,
  validatePassword,
  validatePhoneNumber,
  validateUrl,
} from "../../helpers/functions"

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user_name: {
      type: String,
      required: true,
      unique: true,
      validate: [validateNoSpace, "username must not contains space"],
    },
    avatar: {
      type: String,
      required: false,
      validate: [validateUrl, "Invalid avatar url"],
      match: [URL_REGEX, "please fill a valid image url"],
    },
    phone: {
      type: String,
      required: false,
      unique: true,
      validate: [validatePhoneNumber, "Phone number is invalid!"],
      match: [PHONE_NUMBER_REGEX, "please fill a valid phone number"],
    },
    description: { type: String, required: false, default: "" },
    email: {
      type: String,
      required: false,
      unique: true,
      validate: [validateEmail, "Email address is invalid!"],
      match: [EMAIL_REGEX, "please fill a valid email address"],
    },
    website_link: { type: String, required: false, default: "" },
    password: {
      type: String,
      required: false,
      validate: [
        validatePassword,
        "Minimum eight characters, at least one letter, one number and one special character:",
      ],
      match: [PASSWORD_REGEX, "please fill a valid password"],
    },
    date_of_birth: {
      type: String,
      required: false,
      default: "",
    },
    following_user_ids: [
      {
        type: String,
        ref: "User",
        unique: true,
        required: false,
      },
      {
        _id: false,
        default: [],
      },
    ],
    followed_by_user_ids: [
      {
        type: String,
        ref: "User",
        unique: true,
        required: false,
      },
      {
        _id: false,
        default: [],
      },
    ],
    block_user_ids: [
      {
        type: String,
        ref: "User",
        unique: true,
        required: false,
      },
      {
        _id: false,
        default: [],
      },
    ],
    saved_post_ids: [
      {
        type: String,
        ref: "Post",
        unique: true,
        required: false,
      },
      {
        _id: false,
        default: [],
      },
    ],
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "UNKNOWN", ""],
      required: false,
      default: "",
    },
  },
  { timestamps: true }
)

export default mongoose.model("User", User)

export interface UserProfileForm {
  name: string
  user_name: string
  avatar: string
  phone: string
  description: string
  email: string
  website_link: string
  date_of_birth: string
  gender: "MALE" | "FEMALE" | "UNKNOWN" | ""
}

interface IUser extends UserProfileForm {
  password: string
  following_user_ids: string[]
  followed_by_user_ids: string[]
  block_user_ids: string[]
  saved_post_ids: string[]
  createdAt: string
  updatedAt: string
}

export interface UserModel extends IUser {
  _id: string
}

export interface UserParams extends IUser {
  user_id: string
}

export interface LoginFirebaseParams {
  type: "facebook" | "google"
  email: string
  phone: string
}

export interface ChangePasswordParams {
  curent_password: string
  new_password: string
  confirm_password: string
}

export interface UpdateUserParams {
  name: string
  user_name: string
  website_link: string
  description: string
  email: string
  gender: "MALE" | "FEMALE" | "UNKNOWN" | ""
  phone: string
}
