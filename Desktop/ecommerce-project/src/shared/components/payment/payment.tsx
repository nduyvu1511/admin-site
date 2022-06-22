/* eslint-disable @next/next/no-img-element */
import { companyIcon } from "@/assets"
import { InputCheckbox } from "@/components"
import { RootState } from "@/core/store"
import { Payment as IPayment } from "@/models"
import { setMessage, setPayment } from "@/modules"
import { API_URL } from "@/services"
import { useDispatch, useSelector } from "react-redux"
import { useOrder } from "shared/hook"

interface PaymentProps {
  paymentList: IPayment[]
}

export const Payment = ({ paymentList }: PaymentProps) => {
  const dispatch = useDispatch()
  const { payment, address, delivery } = useSelector(
    (state: RootState) => state.order
  )
  const { updateOrderDraft } = useOrder()

  // Functions
  const handleAddPayment = (paymentProps: IPayment) => {
    if (!delivery) {
      dispatch(
        setMessage({
          title: "Bạn cần phải chọn phương thức vận chuyển trước!",
          type: "warning",
        })
      )
      return
    }

    if (paymentProps?.acquirer_id !== payment?.acquirer_id) {
      updateOrderDraft({
        partner_shipping_id: address?.id,
        payment_term_id: paymentProps.acquirer_id,
        handleSuccess: () => {
          dispatch(setPayment(paymentProps))
        },
      })
    }
  }

  return (
    <div
      className={`payment__order checkout-item ${
        !address || !delivery ? "payment__order-disabled" : ""
      }`}
    >
      <h3 className="checkout-heading">Phương thức thanh toán</h3>
      <ul className="payment__order__list grid grid-col-1">
        {paymentList.length > 0 &&
          paymentList.map(
            (item) =>
              item.state === "enabled" && (
                <li
                  key={item.acquirer_id}
                  onClick={() => handleAddPayment(item)}
                  className={`payment__order__list-item ${
                    payment?.acquirer_id === item.acquirer_id
                      ? "payment__order__list-item-active"
                      : ""
                  }`}
                >
                  <div className="payment__order__list-item-content">
                    <img
                      src={
                        item?.image_url
                          ? `${API_URL}${item?.image_url || ""}`
                          : companyIcon
                      }
                      alt=""
                    />
                    <p>{item.name}</p>
                  </div>
                  <InputCheckbox
                    type="radio"
                    isChecked={payment?.acquirer_id === item.acquirer_id}
                    onCheck={() => handleAddPayment(item)}
                  />
                </li>
              )
          )}
      </ul>
    </div>
  )
}
