/* eslint-disable @next/next/no-img-element */
import { companyIcon } from "@/assets"
import { formatMoneyVND } from "@/helper"
import { Delivery } from "@/models"
import { API_URL } from "@/services"
import { InputCheckbox } from "../inputs"

interface DeliveryItemProps {
  delivery: Delivery
  addDelivery: (delivery: Delivery) => void
  isActive: boolean
  disabled?: boolean
}

const DeliveryItem = (props: DeliveryItemProps) => {
  const { addDelivery, delivery, isActive, disabled = false } = props

  return (
    <li
      onClick={() => addDelivery && addDelivery(delivery)}
      key={delivery.carrier_id}
      className={`shipping__detail-list-item ${
        isActive ? "shipping__detail-list-item-active" : ""
      } ${disabled ? "shipping__detail-list-item-disabled" : ""}`}
    >
      <div className="shipping__detail-wrapper">
        <div className="shipping__detail-wrapper-image">
          <img
            src={
              delivery.shipping_icon
                ? `${API_URL}${delivery.shipping_icon}`
                : companyIcon
            }
            alt=""
          />
        </div>
        <div className="shipping__detail-wrapper-content">
          <h3>{delivery.carrier_name}</h3>
          <p>{formatMoneyVND(delivery.shipping_fee)}</p>
        </div>

        <div className="shipping__detail-wrapper-option">
          <InputCheckbox
            type="radio"
            isChecked={isActive}
            onCheck={() => addDelivery && addDelivery(delivery)}
          />
        </div>
      </div>
    </li>
  )
}

export default DeliveryItem
