import Cookies from "cookies"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  result: { success: boolean; message: string; validate_token: boolean; data: any }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(404).json({
      result: {
        message: "method not supported",
        success: false,
        data: [],
        validate_token: false,
      },
    })
  }

  const cookies = new Cookies(req, res)
  cookies.set("access_token")

  res.status(200).json({
    result: {
      message: "logout successfully",
      success: true,
      data: [],
      validate_token: true,
    },
  })
}
