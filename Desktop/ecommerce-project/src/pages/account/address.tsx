import { Address } from "@/components"
import { AccountContainer } from "@/container"
import { MainAuthLayout } from "@/layout"
import { setOpenModalAddressForm } from "@/modules"
import { RiMapPinAddLine } from "react-icons/ri"
import { useDispatch } from "react-redux"

const UserAddress = () => {
  const dispatch = useDispatch()

  return (
    <AccountContainer
      headerMobileTitle="Địa chỉ"
      breadcrumbList={[
        { path: "/account", name: "Tài khoản" },
        { name: "Địa chỉ", path: "" },
      ]}
      heading="Địa chỉ"
    >
      <div
        onClick={() => dispatch(setOpenModalAddressForm(true))}
        className="btn-reset user__address-btn-add"
      >
        <RiMapPinAddLine />
        Thêm địa chỉ
      </div>
      <Address />
    </AccountContainer>
  )
}

UserAddress.Layout = MainAuthLayout

export default UserAddress
