import { AddressOrderItem } from "@/components"
import { RootState } from "@/core/store"
import { ShippingAddress } from "@/models"
import {
  setAddress,
  setDelivery,
  setPayment,
  setOpenModalAddressForm,
} from "@/modules"
import Link from "next/link"
import React, { useState } from "react"
import { HiPlus } from "react-icons/hi"
import { IoLocationSharp } from "react-icons/io5"
import { MdKeyboardArrowUp } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useDelivery, useOrder } from "shared/hook"

interface AddressOrderProps {
  addressList: ShippingAddress[]
}

export const AddressOrder = ({ addressList }: AddressOrderProps) => {
  const dispatch = useDispatch()
  const { mutate } = useDelivery()
  const { updateOrderDraft } = useOrder()
  const {
    address: addressOrder,
    delivery,
    payment,
  } = useSelector((state: RootState) => state.order)
  const [isShowAddress, setShowAddress] = useState<boolean>(() => !addressOrder)

  const handleSetOrderAddress = (address: ShippingAddress) => {
    if (addressOrder?.id !== address.id) {
      updateOrderDraft({
        partner_shipping_id: address.id,
        handleSuccess: () => {
          dispatch(setAddress(address))

          if (delivery) {
            dispatch(setDelivery(undefined))
            mutate()
          }
          if (payment) {
            dispatch(setPayment(undefined))
          }
        },
      })
      setShowAddress(false)
    }
  }

  return (
    <div className="checkout__address checkout-item">
      <div className="checkout__address-top">
        <div className="checkout__address-header">
          <h3 className="checkout-heading">
            <IoLocationSharp />
            Địa chỉ nhận hàng
          </h3>

          <div className="checkout__address-header-actions">
            <button
              onClick={() => dispatch(setOpenModalAddressForm(true))}
              className="btn-primary-outline"
            >
              <HiPlus />
              Thêm địa chỉ
            </button>

            <Link href="/account/address">
              <a className="btn-primary-outline">Thiết lập địa chỉ</a>
            </Link>
          </div>
        </div>

        <div className="checkout__address-selected">
          {addressOrder ? (
            <AddressOrderItem readOnly address={addressOrder} />
          ) : (
            <p className="checkout__address--no-address">
              Vui lòng chọn địa chỉ giao hàng
            </p>
          )}

          {addressList?.length > 0 ? (
            <button
              onClick={() => setShowAddress(!isShowAddress)}
              className="btn-reset"
            >
              Thay đổi
            </button>
          ) : null}
        </div>
      </div>

      {isShowAddress && addressList?.length > 0 ? (
        <>
          <ul className="checkout__address-list">
            {addressList.map(
              (address) =>
                address.state_id && (
                  <AddressOrderItem
                    isActive={address?.id === addressOrder?.id}
                    onCheck={handleSetOrderAddress}
                    key={address.id}
                    address={address}
                  />
                )
            )}
          </ul>

          <button
            onClick={() => setShowAddress(false)}
            className="btn-primary-outline checkout__address-back-btn"
          >
            Thu gọn <MdKeyboardArrowUp />
          </button>
        </>
      ) : null}
    </div>
  )
}
