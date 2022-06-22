import express from "express"
import UserController from "../app/controllers/user.controller"
import { verifyToken } from "../app/middlewares/token.middleware"
import { getUser, getUsers } from "../app/middlewares/user.middleware"

const router = express.Router()

router.get("/profile", verifyToken, UserController.getProfile)
router.get("/profile_form", verifyToken, getUser, UserController.getUserForm)
router.get("/username_list", verifyToken, UserController.getUserNames)
router.get(
  "/search",
  verifyToken,
  getUser,
  UserController.searchPeople,
  getUsers
)
router.get(
  "/suggest",
  verifyToken,
  getUser,
  UserController.getSuggestPeople,
  getUsers
)
router.post("/change_avatar", verifyToken, UserController.changeAvatar)
router.post("/update", verifyToken, getUser, UserController.updateUserInfo)
router.post("/follow", verifyToken, UserController.followUser)
router.post("/unfollow", verifyToken, UserController.unfollowUser)
router.post("/block", verifyToken, UserController.blockUser)
router.post("/unblock", verifyToken, UserController.unblockUser)
router.post("/save_post", verifyToken, UserController.savePost)
router.get(
  "/following_users",
  verifyToken,
  getUser,
  UserController.getFollowingUsers,
  getUsers
)
router.get(
  "/followed_users",
  verifyToken,
  getUser,
  UserController.getFollowedUsers,
  getUsers
)
router.get(
  "/users_liked_comment",
  verifyToken,
  getUser,
  UserController.getUsersLikedComment,
  getUsers
)
router.get(
  "/users_liked_post",
  verifyToken,
  getUser,
  UserController.getUsersLikedPost,
  getUsers
)

export default router
