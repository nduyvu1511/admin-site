/* eslint-disable react-hooks/exhaustive-deps */
import { DeliveryOrder, Payment } from "@/components"
import { AddressOrder } from "@/components/address/addressOrder"
import { OrderContainer } from "@/container"
import { MainAuthLayoutNoFooter } from "@/layout"
import { setAddress, setPayment } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDelivery, useOrder, usePayment, useUserAddress } from "shared/hook"
import { RootState } from "../core"

const Checkout = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data: deliveryList = [] } = useDelivery()
  const { data: paymentList = [] } = usePayment()
  const { data: { shipping_adress: addressList = [] } = { data: [] } } =
    useUserAddress()
  const {
    productList,
    address: addressOrder,
    orderDraft,
    orderDone,
  } = useSelector((state: RootState) => state.order)
  const { addressDefault } = useSelector((state: RootState) => state.user)
  const { updateOrderDraft } = useOrder()

  useEffect(() => {
    if (addressOrder) {
      updateOrderDraft({
        partner_shipping_id: addressOrder.id,
      })
    } else {
      if (addressDefault) {
        updateOrderDraft({
          partner_shipping_id: addressDefault.id,
        })
        dispatch(setAddress(addressDefault))
      }
    }

    return () => {
      dispatch(setPayment(undefined))
    }
  }, [])

  useEffect(() => {
    if (!productList || (!orderDraft && !orderDone)) {
      router.push("/cart")
    }
  }, [productList, orderDraft])

  return (
    <OrderContainer isShowPromotion={false} headerTitle="Thanh toán">
      <section className="checkout-container">
        <AddressOrder addressList={addressList} />

        <DeliveryOrder deliveryList={deliveryList} />

        <Payment paymentList={paymentList} />
      </section>
    </OrderContainer>
  )
}

Checkout.Layout = MainAuthLayoutNoFooter

export default Checkout
