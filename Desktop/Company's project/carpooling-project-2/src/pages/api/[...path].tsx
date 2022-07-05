import Cookies from "cookies"
import httpProxy, { ProxyResCallback } from "http-proxy"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  result: { success: boolean; message: string; validate_token: boolean; data: any }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

const proxy = httpProxy.createProxyServer()

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
 
  return new Promise((resolve) => {
    const cookies = new Cookies(req, res)
    const token = cookies.get("access_token")

    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
    // don't send cookies to API server
    req.url = `${process.env.NEXT_PUBLIC_API_URL}${req.url?.replace("/api", "")}`
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
