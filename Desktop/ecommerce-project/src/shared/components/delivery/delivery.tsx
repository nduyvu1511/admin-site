import DeliveryItem from "@/components/delivery/deliveryItem"
import { RootState } from "@/core/store"
import { Delivery } from "@/models"
import { setDelivery, setMessage, setPayment } from "@/modules"
import { useDispatch, useSelector } from "react-redux"
import { useDelivery, useInputText } from "shared/hook"

interface DeliveryOrderProps {
  deliveryList: Delivery[]
}

export const DeliveryOrder = ({ deliveryList }: DeliveryOrderProps) => {
  const dispatch = useDispatch()
  const { confirmDelivery } = useDelivery()
  const { delivery, address, payment } = useSelector(
    (state: RootState) => state.order
  )
  const inputProps = useInputText("")

  // Functions
  const handleAddDelivery = (deliveryProps: Delivery) => {
    if (!address) {
      dispatch(
        setMessage({
          isOpen: true,
          title: "Bạn cần phải chọn địa chỉ giao hàng trước!",
          type: "warning",
        })
      )
      return
    }

    if (delivery?.carrier_id !== deliveryProps.carrier_id) {
      confirmDelivery({
        delivery: {
          carrier_id: deliveryProps.carrier_id,
          delivery_message: inputProps.value,
        },
        handleSuccess: () => {
          dispatch(setDelivery(deliveryProps))
          if (payment) {
            dispatch(setPayment())
          }
        },
      })
    }
  }

  return (
    <div
      className={`shipping__detail checkout-item ${
        !address ? "shipping__detail-disabled" : ""
      }`}
    >
      <h3 className="checkout-heading">Phương thức vận chuyển</h3>
      <ul className="shipping__detail-list grid grid-col-1 grid-col-md-3">
        {deliveryList.length > 0 &&
          deliveryList.map((item) => (
            <DeliveryItem
              disabled={!item.shipping_active}
              key={item.carrier_id}
              addDelivery={handleAddDelivery}
              delivery={item}
              isActive={delivery?.carrier_id === item.carrier_id}
            />
          ))}
      </ul>

      <div className="shipping__detail-input">
        <input
          {...inputProps}
          placeholder="Lời nhắn cho đơn vị vận chuyển..."
        />
      </div>
    </div>
  )
}
