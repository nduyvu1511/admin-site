import {
  ApplyPromotion,
  CancelPromotion,
  ConfirmDelivery,
  GetDeliveryListProps,
  GetPriceOfDeliveryProps,
  OrderDone,
  OrderDraftPost,
  Token,
  UpdateOrderDraft,
} from "@/models"
import axiosClient from "."

const orderApi = {
  createOrderDraft: (order: OrderDraftPost) => {
    return axiosClient.post("/api/v2.0/order/order_draft", {
      params: order,
    })
  },

  getDeliveryList: (params: GetDeliveryListProps) => {
    return axiosClient.post("/delivery_carrier/get_available_carrier", {
      params: params,
    })
  },

  getDetailDelivery: (params: GetPriceOfDeliveryProps) => {
    return axiosClient.post("/delivery_carrier/update_delivery_price", {
      params: params,
    })
  },

  confirmDelivery: (params: ConfirmDelivery) => {
    return axiosClient.post("/delivery_carrier/confirm_delivery_carrier", {
      params: params,
    })
  },

  getPaymentList: (params: Token) => {
    return axiosClient.post("/vnpay_controller/get_payment_method_in_app", {
      params: params,
    })
  },

  createOrderDone: (params: OrderDone) => {
    return axiosClient.post("/api/v2.0/order/order_done", { params: params })
  },

  applyPromotion: (params: ApplyPromotion) => {
    return axiosClient.post("/promotion_api/apply_promotion", {
      params: params,
    })
  },

  cancelPromotion: (params: CancelPromotion) => {
    return axiosClient.post("/promotion_api/cancel_promotion", {
      params: params,
    })
  },

  updateOrderDraft: (params: UpdateOrderDraft) => {
    return axiosClient.post("/api/v2.0/order/order_update", {
      params: params,
    })
  },
}

export default orderApi
