import { Breadcrumb } from "@/components"
import { OrderStatus } from "@/components/account/status"
import { MainAuthLayoutNoFooter } from "@/layout"
import { clearOrderData } from "@/modules"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../core"

const OrderConfirmed = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { orderDone } = useSelector((state: RootState) => state.order)
  console.log("order confirm mount")

  useEffect(() => {
    return () => {
      dispatch(clearOrderData())
    }
  }, [orderDone])

  if (!orderDone) return null

  return (
    <>
      <div className="container">
        <Breadcrumb
          breadcrumbList={[{ name: "Chi Tiết đơn hàng", path: "" }]}
        />
      </div>
      {orderDone ? (
        <div className="order__confirm">
          <div className="order__confirm-link">
            <Link href="/">
              <a className="btn-primary">Trở về trang chủ</a>
            </Link>
          </div>
          <br />
          <OrderStatus type="order" order={orderDone} />
        </div>
      ) : null}
    </>
  )
}

OrderConfirmed.Layout = MainAuthLayoutNoFooter

export default OrderConfirmed
