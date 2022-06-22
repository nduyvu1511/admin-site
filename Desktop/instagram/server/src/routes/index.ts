import authRouter from "./auth"
import uploadRouter from "./upload"
import userRouter from "./user"
import postRouter from "./post"
import commentRouter from "./comment"
import storyRouter from "./story"

const route = (app: any) => {
  app.use("/api/auth", authRouter)
  app.use("/api/user", userRouter)
  app.use("/api/upload", uploadRouter)
  app.use("/api/post", postRouter)
  app.use("/api/comment", commentRouter)
  app.use("/api/story", storyRouter)
}

export default route
