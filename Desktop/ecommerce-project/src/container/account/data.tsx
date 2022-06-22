import { BiHomeAlt } from "react-icons/bi"
import { FiShoppingBag } from "react-icons/fi"
import { HiOutlineClipboardList } from "react-icons/hi"
import { MdOutlineInfo, MdOutlineLocationOn } from "react-icons/md"
import {
  RiCoupon3Line,
  RiLockPasswordLine,
  RiNotification2Line,
} from "react-icons/ri"

interface UserInfoField {
  id: "name" | "email" | "sex" | "phone"
  vniTitle: string
  engTitle: string
  type: "text" | "radio" | "dropdown"
}

export const inputs: UserInfoField[] = [
  {
    id: "name",
    vniTitle: "Tên Đăng Nhập",
    engTitle: "User name",
    type: "text",
  },
  {
    id: "email",
    vniTitle: "Email",
    engTitle: "Email",
    type: "text",
  },
  {
    id: "phone",
    vniTitle: "Số Điện Thoại",
    engTitle: "Phone Number",
    type: "text",
  },
  {
    id: "sex",
    vniTitle: "Giới Tính",
    engTitle: "Gender",
    type: "radio",
  },
]

export const accountHeaderOptionList = [
  {
    path: "/account/",
    vniTitle: "Tài khoản của tôi",
    engTitle: "General",
  },

  {
    path: "/account/purchase",
    vniTitle: "Đơn mua",
    engTitle: "General",
  },

  {
    path: "",
    vniTitle: "Đăng xuất",
    engTitle: "Logout",
  },
]

export const accountOptionList = [
  {
    path: "/account",
    vniTitle: "Tổng quan",
    engTitle: "General",
    icon: <BiHomeAlt />,
  },
  {
    path: "/account/info",
    vniTitle: "Hồ sơ",
    engTitle: "Information",
    icon: <MdOutlineInfo />,
  },
  {
    path: "/account/password",
    vniTitle: "Đổi mật khẩu",
    engTitle: "Change password",
    icon: <RiLockPasswordLine />,
  },
  {
    path: "/account/notifications",
    vniTitle: "Thông báo",
    engTitle: "Notification",
    icon: <RiNotification2Line />,
  },
  {
    path: "/account/address",
    vniTitle: "Địa chỉ",
    engTitle: "Address",
    icon: <MdOutlineLocationOn />,
  },
  {
    path: "/account/order-history",
    vniTitle: "Đơn mua",
    engTitle: "My Order",
    icon: <FiShoppingBag />,
  },
  {
    path: "/account/purchase",
    vniTitle: "Sản phẩm mua",
    engTitle: "My purchase",
    icon: <HiOutlineClipboardList />,
  },
  {
    path: "/account/vouchers",
    vniTitle: "Kho voucher",
    engTitle: "My vouchers",
    icon: <RiCoupon3Line />,
  },
]
