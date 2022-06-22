import { RootState } from "@/core/store"
import { ShippingAddress } from "@/models"
import { useSelector } from "react-redux"
import { InputCheckbox } from "../inputs"

interface IAddressItem {
  isActive?: boolean
  address: ShippingAddress
  onCheck?: (address: ShippingAddress) => void
  readOnly?: boolean
}

export const AddressOrderItem = ({
  isActive,
  address,
  onCheck,
  readOnly = false,
}: IAddressItem) => {
  const { addressDefault } = useSelector((state: RootState) => state.user)

  const handleCheck = () => {
    onCheck && onCheck(address)
  }

  return (
    <li className="address__order__item">
      {!readOnly ? (
        <div className="address__order__item-input">
          <InputCheckbox
            type="radio"
            isChecked={isActive || false}
            onCheck={handleCheck}
          />
        </div>
      ) : null}

      <div
        onClick={handleCheck}
        className={`address__order__item-content ${
          !readOnly ? "cursor-pointer" : ""
        }`}
      >
        <div className="address__order__item-info">
          <p className="address__order__item-info-name">{address.name} </p>
          <p className="address__order__item-info-phone">{address.phone}</p>
        </div>
        <p className="address__order__item-content-address">
          {address.full_adress}

          {(addressDefault?.id || 0) === address.id && !readOnly ? (
            <span className="address__order__item-content-default">
              (Mặc định)
            </span>
          ) : null}
        </p>
      </div>
    </li>
  )
}
