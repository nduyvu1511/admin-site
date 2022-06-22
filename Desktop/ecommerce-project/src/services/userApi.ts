import {
  ILogin,
  Token,
  StateId,
  DistrictId,
  AddressDelete,
  AddressAdd,
  TokenAndPartnerId,
  Auth,
  WishlistReq,
  AddComment,
  GetComment,
  DeleteComment,
  TokenAndSaleOrderId,
  UpdateUserProps,
  PhoneUpdateProps,
  ChangePasswordProps,
  ResetPassword,
} from "@/models"
import axiosClient from "."

const userApi = {
  login: (data: ILogin) => {
    return axiosClient.post("/api/v2.0/user/login", { params: data })
  },

  checkPassword: (params: Token) => {
    return axiosClient.post("/api/v2.0/user/check-password", { params })
  },

  changePassword: (data: ChangePasswordProps) => {
    return axiosClient.post("/api/v2.0/user/change-password", { params: data })
  },

  resetPassword: (data: ResetPassword) => {
    return axiosClient.post("/api/v2.0/user/reset-password", { params: data })
  },

  getUserInfo: (data: Token) => {
    return axiosClient.post("/api/v2.0/user/account/info", { params: data })
  },

  updateUser: (address: UpdateUserProps) => {
    return axiosClient.post("/api/v2.0/information_customers/update_user", {
      params: address,
    })
  },

  checkPhoneExist: (phone: string) => {
    return axiosClient.post("/api/v2.0/user/check_phone", {
      params: {
        phone,
      },
    })
  },

  getAddress: (data: StateId | DistrictId | {}) => {
    return axiosClient.post("/api/v2.0/user/adress", {
      params: data,
    })
  },

  getAddressByUser: (token: Token) => {
    return axiosClient.post("/api/v2.0/user/get_adress_by_partner", {
      params: token,
    })
  },

  deleteAddress: (data: AddressDelete) => {
    return axiosClient.post("/api/v2.0/user/adress_delete", {
      params: data,
    })
  },

  addAddress: (address: AddressAdd) => {
    return axiosClient.post("/api/v2.0/user/adress_add", { params: address })
  },

  getPromotionList: (data: TokenAndPartnerId) => {
    return axiosClient.post(
      "/api/v2.0/information_promotion/get_list_promotions_ldp",
      {
        params: data,
      }
    )
  },

  firebaseAuth: (params: Auth) => {
    return axiosClient.post("/api/v2.0/information_customers/auth", {
      params,
    })
  },

  updatePhoneNumber: (params: PhoneUpdateProps) => {
    return axiosClient.post("/api/v2.0/update_phone_by_login", {
      params,
    })
  },

  getDetailUser: (token: Token) => {
    return axiosClient.post(
      "/api/v2.0/information_customers/get_info_customer",
      {
        params: token,
      }
    )
  },

  getOrderListHistory: (params: {
    token: string
    limit?: number
    offset?: number
  }) => {
    return axiosClient.post("/api/v2.0/information_booking/booking_history", {
      params: params,
    })
  },

  getDetailOrderHistory: (params: TokenAndSaleOrderId) => {
    return axiosClient.post("/api/v2.0/information_booking/get_info_booking", {
      params: params,
    })
  },

  getWishlists: (params: Token) => {
    return axiosClient.post("/api/v2.0/get_wishlist", {
      params: params,
    })
  },

  addWishlist: (params: WishlistReq) => {
    return axiosClient.post("/api/v2.0/add_wishlist", {
      params: params,
    })
  },

  deleteWishlist: (params: WishlistReq) => {
    return axiosClient.post("/api/v2.0/delete_wishlist", {
      params: params,
    })
  },

  addReview: (params: AddComment) => {
    return axiosClient.post("/api/v2.0/add_comment_product", {
      params: params,
    })
  },

  getReviews: (params: GetComment) => {
    return axiosClient.post("/api/v2.0/get_comment_product", {
      params: params,
    })
  },

  deleteReview: (params: DeleteComment) => {
    return axiosClient.post("/api/v2.0/delete_comment_product", {
      params: params,
    })
  },

  getNotifications: (params: DeleteComment) => {
    return axiosClient.post("/api/get_notifications", {
      params: params,
    })
  },

  checkNotifications: (params: DeleteComment) => {
    return axiosClient.post("/api/get_notifications", {
      params: params,
    })
  },
}

export default userApi
