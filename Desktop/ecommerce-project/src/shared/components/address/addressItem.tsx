import { RootState } from "@/core/store"
import { ShippingAddress } from "@/models"
import {
  setAddress,
  setAddressDefault,
  setAddressForm,
  setOpenModalAddressForm,
} from "@/modules"
import { useRef, useState } from "react"
import { AiFillStar } from "react-icons/ai"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useClickOutside, useUserAddress } from "shared/hook"

interface IAddressItem {
  isActive?: boolean
  address: ShippingAddress
}

export const AddressItem = ({ isActive, address }: IAddressItem) => {
  const language = "vni"
  const { deleteAddress } = useUserAddress(false)
  const dispatch = useDispatch()
  const optionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useClickOutside([optionRef, buttonRef], () => setOpenOption(false))

  const {
    token,
    userInfo: { id: partner_id = 0 } = { userInfo: undefined },
    addressDefault,
  } = useSelector((state: RootState) => state.user)
  const { address: addressOrder } = useSelector(
    (state: RootState) => state.order
  )

  const [openOption, setOpenOption] = useState<boolean>(false)

  // Function
  const handleChangeDefault = () => {
    if (addressDefault?.id === address.id) {
      dispatch(setAddressDefault(undefined))
      if (addressOrder?.id === addressDefault.id) {
        dispatch(setAddress(undefined))
      }
    } else {
      dispatch(setAddressDefault(address))
      if (addressOrder?.id !== address.id) {
        dispatch(setAddress(address))
      }
    }
    setOpenOption(false)
  }

  const handleDeleteAddress = () => {
    if (!token || !partner_id) return

    deleteAddress({ partner_id, token, adress_id: address.id }).then(() => {
      setOpenOption(false)
    })
  }

  const handleUpdateAddress = () => {
    if (!address) return
    dispatch(setOpenModalAddressForm(true))
    dispatch(setAddressForm(address))
  }

  return (
    <div className={`address__item ${isActive ? "address__item-active" : ""}`}>
      {isActive ? (
        <span className="address__item-active-label">
          <AiFillStar />
        </span>
      ) : null}

      <div className="address__item-option-wrapper">
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation()
            setOpenOption(!openOption)
          }}
          className="btn-reset address__item-btn"
        >
          <HiOutlineDotsVertical />
        </button>

        {openOption ? (
          <div ref={optionRef} className="address__item-option">
            <p onClick={handleDeleteAddress}>
              {language === "vni" ? "Xóa địa chỉ này" : "Delete this Address"}
            </p>
            <p onClick={handleChangeDefault}>
              {addressDefault && addressDefault.id === address.id
                ? "Xóa khỏi mặc định"
                : "Đặt làm mặc định"}
            </p>

            <p onClick={handleUpdateAddress}>
              {language === "vni" ? "Sửa địa chỉ này" : "Edit this Address"}
            </p>
          </div>
        ) : null}
      </div>

      <ul className="address__item-list">
        <li className="address__item-list-item">
          <p className="address__item-list-item-text address__item-list-item-text-name">
            {address.name}
          </p>
        </li>

        <li className="address__item-list-item">
          <p className="address__item-list-item-title">
            {language === "vni" ? "Địa chỉ: " : "Address:"}
          </p>
          <p className="address__item-list-item-text">{address.full_adress}</p>
        </li>

        <li className="address__item-list-item">
          <p className="address__item-list-item-title">
            {language === "vni" ? "Điện thoại: " : "Phone number:"}
          </p>
          <p className="address__item-list-item-text">{address.phone}</p>
        </li>
      </ul>
    </div>
  )
}
