import {
  CartItem,
  Delivery,
  OrderDraft,
  OrderHistoryDetail,
  OrderSlice as IOrderSlice,
  Payment,
  Promotion,
  PromotionLine,
  ShippingAddress,
} from "@/models"
import { createSlice } from "@reduxjs/toolkit"

const initialState: IOrderSlice = {
  productList: undefined,
  address: undefined,
  promotionLineList: undefined,
  promotion: undefined,
  orderDraft: undefined,
  delivery: undefined,
  payment: undefined,
  orderDone: undefined,
  note: "",
}

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setPromotionLineList: (
      state,
      { payload }: { payload: PromotionLine[] | undefined }
    ) => {
      state.promotionLineList = payload
    },

    setPromotion: (state, { payload }: { payload: Promotion | undefined }) => {
      state.promotion = payload
    },

    setProductList: (
      state,
      { payload }: { payload: CartItem[] | undefined | null }
    ) => {
      state.productList = payload
    },

    // Address
    setAddress: (
      state,
      { payload }: { payload: ShippingAddress | undefined }
    ) => {
      state.address = payload
    },

    // Shipping
    setDelivery: (state, { payload }: { payload: Delivery | undefined }) => {
      if (state.delivery && payload) {
        if (payload.carrier_id === state.delivery.carrier_id) return
      }

      state.delivery = payload
    },

    // Payment
    setPayment: (state, { payload }: { payload: Payment | undefined }) => {
      if (payload?.acquirer_id === state?.payment?.acquirer_id) return

      state.payment = payload
    },

    clearOrderData: (state) => {
      state.productList = undefined
      state.address = undefined
      state.promotionLineList = undefined
      state.promotion = undefined
      state.orderDraft = undefined
      state.delivery = undefined
      state.payment = undefined
      state.orderDone = undefined
    },

    setOrderDraft: (
      state,
      { payload }: { payload: OrderDraft | undefined | null }
    ) => {
      state.orderDraft = payload
    },

    setNote: (state, { payload }: { payload: string }) => {
      state.note = payload
    },

    setOrderDone: (
      state,
      { payload }: { payload: OrderHistoryDetail | undefined }
    ) => {
      state.orderDone = payload
    },
  },
})

export default OrderSlice.reducer

export const {
  setAddress,
  setPromotionLineList,
  setDelivery,
  setOrderDraft,
  setPayment,
  setNote,
  setProductList,
  clearOrderData,
  setOrderDone,
  setPromotion,
} = OrderSlice.actions
