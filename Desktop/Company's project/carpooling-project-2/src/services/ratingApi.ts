import { CreateRatingParams, DeleteRatingParams, RatingRangePost } from "@/models"
import axiosClient from "."

const ratingApi = {
  getRatingTags: (rating_number?: RatingRangePost) => {
    return axiosClient.post("/rating_controller/get_quick_rating_tag", {
      params: { rating_number },
    })
  },

  createRating: (params: CreateRatingParams) => {
    return axiosClient.post("/rating_controller/create_rating", {
      params,
    })
  },

  updateRating: (params: CreateRatingParams) => {
    return axiosClient.post("/rating_controller/update_rating", {
      params,
    })
  },

  deleteRating: (params: DeleteRatingParams) => {
    return axiosClient.post("/rating_controller/delete_rating", {
      params,
    })
  },

  getRatingListByCustomer: (token: string) => {
    return axiosClient.post("/rating_controller/get_list_rating_by_customer", {
      params: {
        token,
      },
    })
  },

  getRatingListByDriver: (token: string) => {
    return axiosClient.post("/rating_controller/get_list_rating_by_car_driver", {
      params: {
        token,
      },
    })
  },

  reportRating: (params: DeleteRatingParams) => {
    return axiosClient.post("/rating_controller/report_rating", {
      params,
    })
  },
}
export { ratingApi }
