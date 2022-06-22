import { RootState } from "@/core/store"
import { productListToObjectIdQuantity } from "@/helper"
import { CreateOrderDraftProps } from "@/models"
import {
  setMessage,
  setOrderDone,
  setOrderDraft,
  setOpenScreenLoading,
} from "@/modules"
import orderApi from "@/services/orderApi"
import userApi from "@/services/userApi"
import { useDispatch, useSelector } from "react-redux"
import { useCartOrder } from "./useCartOrder"

interface UpdateOrderHook {
  partner_shipping_id?: number | null
  payment_term_id?: number | null
  handleSuccess?: Function
}

interface ProductSWR {
  createOrderDraft: (props?: CreateOrderDraftProps) => void
  createOrderDone: (props: Function) => void
  updateOrderDraft: (props: UpdateOrderHook) => void
}

const useOrder = (): ProductSWR => {
  const dispatch = useDispatch()

  const { token, userInfo: { id: customer_id = 0 } = { userInfo: undefined } } =
    useSelector((state: RootState) => state.user)
  const { orderDraft, productList, payment, note, delivery } = useSelector(
    (state: RootState) => state.order
  )
  const { deleteCartItem } = useCartOrder(false)

  const createOrderDraft = async (orderDraftProps?: CreateOrderDraftProps) => {
    const {
      handleSuccess,
      handleError,
      showLoading = false,
    } = orderDraftProps || {}
    if (!productList || !token || !customer_id || orderDraft) return

    showLoading && dispatch(setOpenScreenLoading(true))

    try {
      const res: any = await orderApi.createOrderDraft({
        api_version: "2.1",
        customer_id,
        token,
        note,
        list_products: [
          {
            products: productListToObjectIdQuantity(productList),
          },
        ],
      })
      showLoading && dispatch(setOpenScreenLoading(false))

      if (res?.result?.success) {
        const order = res.result.data.sale_order_id?.[0]
        dispatch(setOrderDraft(order))
        handleSuccess && handleSuccess()
        return order
      } else {
        handleError && handleError()
        dispatch(
          setMessage({
            type: "danger",
            title:
              res.result.message ||
              "Đơn hàng vừa tạo có lỗi, vui lòng thử lại!",
          })
        )
      }
    } catch (error) {
      showLoading && dispatch(setOpenScreenLoading(false))
    }
  }

  const createOrderDone = async (handleSuccess: Function) => {
    if (!token || !productList || !delivery || !payment || !orderDraft) return
    dispatch(setOpenScreenLoading(true))

    try {
      const res: any = await orderApi.createOrderDone({
        order_id: [orderDraft.order_id],
        token,
      })
      // Disabled loading status
      dispatch(setOpenScreenLoading(false))

      const result = res?.result
      if (result?.success) {
        const sale_order_id = result?.data?.sale_order_id?.[0]?.sale_order_id

        if (sale_order_id) {
          const res: any = await userApi.getDetailOrderHistory({
            sale_order_id,
            token,
          })
          if (res?.result?.success) {
            dispatch(setOrderDone(res.result?.data?.info_booking))
            deleteCartItem(productList)
            handleSuccess()
          }
        }
      } else {
        dispatch(
          setMessage({
            title: result?.message || "",
            type: "danger",
          })
        )
      }
    } catch (error) {
      dispatch(setOpenScreenLoading(false))
    }
  }

  const updateOrderDraft = async (props: UpdateOrderHook) => {
    const { handleSuccess, partner_shipping_id, payment_term_id } = props
    if (!orderDraft || !token || (!partner_shipping_id && !payment_term_id))
      return

    dispatch(setOpenScreenLoading(true))

    try {
      const res: any = await orderApi.updateOrderDraft({
        order_id: [orderDraft.order_id],
        partner_shipping_id: partner_shipping_id || null,
        token,
        payment_term_id: payment_term_id || null,
      })
      dispatch(setOpenScreenLoading(false))

      if (res?.result === true) {
        handleSuccess && handleSuccess()
      } else {
        dispatch(
          setMessage({
            title:
              res?.result?.message ||
              "Vui lòng chọn phương thức vận chuyển khác",
            type: "danger",
          })
        )
      }
    } catch (error) {
      dispatch(setOpenScreenLoading(false))
    }
  }

  return {
    createOrderDraft,
    createOrderDone,
    updateOrderDraft,
  }
}

export { useOrder }
