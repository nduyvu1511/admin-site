// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from "cookies"
import httpProxy, { ProxyResCallback } from "http-proxy"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  result: { success: boolean; message: string; validate_token: boolean; data: any }
}

export const config = {
  api: {
    bodyParser: true,
  },
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(404).json({
      result: {
        message: "method not supported",
        data: [],
        success: false,
        validate_token: false,
      },
    })
  }

  if (!req.body?.params?.token) {
    return res.status(400).json({
      result: {
        message: "Missing token in params",
        data: [],
        success: false,
        validate_token: false,
      },
    })
  }
  return new Promise((resolve) => {
    // don't send cookies to API server
    const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== "development" })
    cookies.set("access_token", req.body.params.token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(new Date().setDate(new Date().getDate() + 3)),
    })
    ;(res as NextApiResponse<Data>).status(200).json({
      result: {
        message: "Add token successfully",
        data: [],
        success: true,
        validate_token: true,
      },
    })

    proxy.once("proxyRes", () => {
      resolve(true)
    })
    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    })
  })
}
