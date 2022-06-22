import { RootState } from "@/core/store"
import { Delivery } from "@/models"
import { setMessage, setOpenScreenLoading } from "@/modules"
import orderApi from "@/services/orderApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR, { KeyedMutator } from "swr"

interface GetDeliveryDetailProps {
  carrier_id: number
  handleSuccess: Function
}

interface ConfirmDeliveryProps {
  delivery: {
    carrier_id: number
    delivery_message?: string
  }
  handleSuccess: Function
}

interface DeliverySWR {
  data: Delivery[]
  error: any
  isValidating: boolean
  getDeliveryDetail: (props: GetDeliveryDetailProps) => void
  confirmDelivery: (props: ConfirmDeliveryProps) => void
  mutate: KeyedMutator<any>
}

const useDelivery = (): DeliverySWR => {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user)
  const { orderDraft, productList } = useSelector(
    (state: RootState) => state.order
  )

  const { data, error, isValidating, mutate } = useSWR(
    "delivery",
    token && productList && orderDraft
      ? () =>
          orderApi
            .getDeliveryList({ sale_id: orderDraft.order_id, token })
            .then((res: any) => {
              if (res?.result?.success) {
                return res.result.data
              } else {
                dispatch(
                  setMessage({
                    title: res.result.message,
                    type: "danger",
                  })
                )
              }
            })
      : null,
    {
      revalidateOnFocus: false,
    }
  )

  const confirmDelivery = async ({
    handleSuccess,
    delivery,
  }: ConfirmDeliveryProps) => {
    if (!orderDraft || !token) return

    dispatch(setOpenScreenLoading(true))

    try {
      const res: any = await orderApi.confirmDelivery({
        sale_carrier: [
          {
            carrier_id: delivery.carrier_id,
            sale_id: orderDraft.order_id,
          },
        ],
        payment_type: "2",
        required_note: "KHONGCHOXEMHANG",
        token,
        delivery_message: delivery.delivery_message || "",
      })

      dispatch(setOpenScreenLoading(false))

      if (res?.result?.success) {
        handleSuccess()
      } else {
        dispatch(
          setMessage({
            title:
              res.error?.data?.message ||
              "Vui lòng chọn phương thức vận chuyển khác",
            type: "danger",
          })
        )
      }
    } catch (error) {
      dispatch(setOpenScreenLoading(false))
    }
  }

  const getDeliveryDetail = async (props: GetDeliveryDetailProps) => {
    const { carrier_id, handleSuccess } = props

    if (!orderDraft || !token || !carrier_id) return

    const res: any = await orderApi.getDetailDelivery({
      carrier_id,
      sale_id: orderDraft?.order_id,
      token,
    })

    const result = res.result

    if (result?.success) {
      handleSuccess({ ...result.data, carrier_id })
    } else {
      dispatch(
        setMessage({
          title: result.message || res.error?.data?.message || "",
          type: "danger",
        })
      )
    }
  }

  return {
    data,
    error,
    isValidating,
    getDeliveryDetail,
    confirmDelivery,
    mutate,
  }
}

export { useDelivery }
