import axios from "axios"

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN_URL,
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

axiosClient.interceptors.request.use(async (config) => {
  return config
})

try {
  axiosClient.interceptors.response.use(
    (response) => {
      if (response?.data) {
        // const {
        //   result: { success, message, data, validate_token },
        // } = response.data

        // if (!validate_token) {
        //   // axiosClient.post("/api/logout")
        //   return
        // }

        return response.data
      }
      return response
    },
    (err) => {
      if (err.response.status === 403) {
        axiosClient.post("/api/logout")
      }
      throw err
    }
  )
} catch (error) {
  console.log(error)
}

export default axiosClient
export * from "./addressApi"
export * from "./compoundingCarApi"
export * from "./ratingApi"
export * from "./userApi"
export * from "./vehicleApi"
