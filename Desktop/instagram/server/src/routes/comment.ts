import express from "express"
import commentController from "../app/controllers/comment.controller"
import { verifyToken } from "../app/middlewares/token.middleware"

const router = express.Router()

router.get("/:parent_id", verifyToken, commentController.getChildComments)
router.post("/add", verifyToken, commentController.addComment)
router.post("/update", verifyToken, commentController.updateComment)
router.post("/delete", verifyToken, commentController.deleteComment)
router.post("/like", verifyToken, commentController.likeComment)
router.post("/unlike", verifyToken, commentController.unlikeComment)

export default router
