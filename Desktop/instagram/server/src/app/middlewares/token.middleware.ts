import jwt from "jsonwebtoken"
import * as express from "express"

const verifyToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers["authorization"]?.split("Bearer ")[1]

  if (!token) {
    return res.json({ message: "No token provided!", success: false })
  }

  try {
    const authUser = jwt.verify(token, process.env.JWT_SECRET as string)
    req.locals = authUser
    return next()
  } catch (error) {
    return res.status(401).send({
      message: "Unauthorized Token!",
    })
  }
}

export { verifyToken }
