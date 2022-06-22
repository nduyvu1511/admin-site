import express from "express"
import PostController from "../app/controllers/post.controller"
import { verifyToken } from "../app/middlewares/token.middleware"
import { getUser } from "../app/middlewares/user.middleware"

const router = express.Router()

router.post("/add", verifyToken, PostController.createPost)
router.post("/like", verifyToken, PostController.likePost)
router.post("/unlike", verifyToken, PostController.unlikePost)
router.post("/delete", verifyToken, PostController.deletePost)
router.post("/update", verifyToken, PostController.updatePost)
router.get("/:post_id", verifyToken, getUser, PostController.getPostDetail)
router.post("/toggle_comment_status", verifyToken, PostController.toggleComment)
router.get("/", verifyToken, getUser, PostController.getPostList)

export default router
