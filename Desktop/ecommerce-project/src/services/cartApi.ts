import { Token } from "@/models"
import axiosClient from "."

export interface AddToCartProps {
  token: string
  product_id: number
  uom_id: number
  product_qty: number
  offer_pricelist: number | false
}

export interface DeleteCartProps {
  token: string
  stored_product_ids: number[]
}

export interface UpdateCartProps {
  product_qty: number
  stored_product_id: number
  token: string
}

const cartApi = {
  getCartList: (params: Token) => {
    return axiosClient.post(
      "/stored_product_controller/list_stored_product_in_bag",
      {
        params,
      }
    )
  },

  addToCart: (params: AddToCartProps) => {
    return axiosClient.post(
      "/stored_product_controller/create_stored_product_into_bag",
      {
        params,
      }
    )
  },

  updateCartItem: (params: UpdateCartProps) => {
    return axiosClient.post(
      "/stored_product_controller/update_stored_product_in_bag",
      {
        params,
      }
    )
  },

  deleteFromCart: (params: DeleteCartProps) => {
    return axiosClient.post(
      "/stored_product_controller/delete_stored_product_in_bag",
      {
        params,
      }
    )
  },
}

export default cartApi
