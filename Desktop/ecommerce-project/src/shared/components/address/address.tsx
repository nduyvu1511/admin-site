import { RootState } from "@/core/store"
import { RiLoader4Line } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useUserAddress } from "shared/hook"
import { AddressItem } from "./addressItem"

export const Address = () => {
  const { addressDefault } = useSelector((state: RootState) => state.user)

  const {
    data: { shipping_adress: addressList = [] } = { data: [] },
    isValidating,
  } = useUserAddress()

  return (
    <div className="address__container">
      {isValidating && addressList?.length === 0 ? (
        <div className="loader-container">
          <RiLoader4Line className="loader" />
        </div>
      ) : null}

      <div className="user__address">
        {addressList?.length > 0 &&
          addressList.map(
            (address) =>
              address.ward_id && (
                <AddressItem
                  key={address.id}
                  isActive={address.id === (addressDefault?.id || 0)}
                  address={address}
                />
              )
          )}
      </div>
    </div>
  )
}
