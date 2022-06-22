import { RootState } from "@/core/store"
import { isObjectHasValue } from "@/helper"
import { OrderHistory, OrderHistoryDetail } from "@/models"
import userApi from "@/services/userApi"
import { useSelector } from "react-redux"
import useSWR from "swr"

interface OrderHistorySWR {
  data: {
    sales_summary: { total_sale: number; total_amount: number }
    list_booking: OrderHistory[]
  }
  error: any
  isValidating: boolean
  getDetailOrderHistory: (
    id: number,
    cb?: (orderDetail: OrderHistoryDetail) => void
  ) => void
  changePage: (offset: number, cb?: Function) => void
}

const fetcher = async (token: string, limit = 12, offset = 0) => {
  const res: any = await userApi.getOrderListHistory({
    token,
    limit,
    offset: offset * limit,
  })
  return isObjectHasValue(res?.result?.data)
    ? res.result.data
    : {
        sales_summary: { total_sale: 0, total_amount: 0 },
        list_booking: [],
      }
}

const useOrderHistory = (limit = 12): OrderHistorySWR => {
  const { token } = useSelector((state: RootState) => state.user)

  const { data, isValidating, error, mutate } = useSWR(
    "order-history_list",
    token ? () => fetcher(token, limit, 0) : null,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  )

  const getDetailOrderHistory = async (
    sale_order_id: number,
    cb?: (order: OrderHistoryDetail) => void
  ) => {
    if (!token) return
    try {
      const res: any = await userApi.getDetailOrderHistory({
        sale_order_id,
        token,
      })

      if (res?.result?.success) cb && cb(res.result?.data?.info_booking)
    } catch (error) {
      console.log(error)
    }
  }

  const changePage = async (offset: number, cb?: Function) => {
    const orderList = await fetcher(token, limit, offset)
    cb && cb()
    mutate(orderList, false)
  }

  return {
    data,
    error,
    isValidating,
    getDetailOrderHistory,
    changePage,
  }
}

export { useOrderHistory }
