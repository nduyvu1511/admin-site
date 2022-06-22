import express from "express"
import StoryController from "../app/controllers/story.controller"
import { verifyToken } from "../app/middlewares/token.middleware"
import { getUser } from "../app/middlewares/user.middleware"

const router = express.Router()

router.get(
  "/users_has_story",
  verifyToken,
  getUser,
  StoryController.getUsersHasStory
)
router.get("/", verifyToken, StoryController.getStoriesByUser)
router.post("/add", verifyToken, StoryController.createStory)
router.post("/update", verifyToken, StoryController.updateStory)
router.post("/delete", verifyToken, StoryController.deleteStory)

export default router
