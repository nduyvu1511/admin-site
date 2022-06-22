import {
  AttachmentProps,
  DeleteRatingProps,
  GetRatingByProductProps,
  GetRatingsByStarParams,
  StarString,
  UpdateRatingProps,
} from "@/models"
import axiosClient from "."

const ratingApi = {
  getRatingTags: (params: {
    product_id: number
    offset?: number
    limit?: number
  }) => {
    return axiosClient.post("/comment_controller/get_rating_tag", {
      params: params,
    })
  },

  createAttachment: (params: AttachmentProps) => {
    return axiosClient.post("/comment_controller/create_attachment", {
      params,
    })
  },

  getProductsPurchased: (params: {
    token: string
    offset?: number
    limit?: number
  }) => {
    return axiosClient.post(
      "/comment_controller/get_purchase_product_history",
      {
        params: params,
      }
    )
  },

  updateRatingProduct: (props: UpdateRatingProps) => {
    return axiosClient.post("/comment_controller/update_rating_product", {
      params: props,
    })
  },

  deleteRatingProduct: (params: DeleteRatingProps) => {
    return axiosClient.post("/comment_controller/delete_rating_product", {
      params,
    })
  },

  getRatingsByProduct: (params: GetRatingByProductProps) => {
    return axiosClient.post("/comment_controller/get_rating_by_product", {
      params,
    })
  },

  groupRatingStarCount: (product_tmpl_id: number) => {
    return axiosClient.post("/comment_controller/group_rating_star_count", {
      params: {
        product_tmpl_id,
      },
    })
  },

  getRatingByStar: (params: GetRatingsByStarParams) => {
    return axiosClient.post("/comment_controller/get_rating_by_star_rating", {
      params,
    })
  },
}

export default ratingApi
