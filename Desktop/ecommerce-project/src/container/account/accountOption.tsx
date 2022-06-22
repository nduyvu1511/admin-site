/* eslint-disable @next/next/no-img-element */
import { avatar } from "@/assets"
import { RootState } from "@/core/store"
import { clearOrderData, logOut, setOpenModalAccountOption } from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { FiEdit2 } from "react-icons/fi"
import { IoLogOutOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { accountOptionList } from "./data"

export const AccountOption = () => {
  const language = "vni"
  const dispatch = useDispatch()
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.user)

  return (
    <>
      <header className="account__left-header">
        <div className="account__left-header-avatar image-container">
          <Link href="/account/info" passHref>
            <div
              onClick={() => dispatch(setOpenModalAccountOption(false))}
              className="image-container cursor-pointer"
            >
              <Image
                src={userInfo?.avatar ? `${API_URL}${userInfo.avatar}` : avatar}
                quality={30}
                layout="fill"
                className="image"
                alt=""
              />
            </div>
          </Link>
        </div>
        <div className="account__left-header-info">
          <p className="account__left-header-info-title">Tài khoản của</p>
          <p className="account__left-header-info-name">
            {userInfo?.name || ""}
          </p>
        </div>
        {/* <Link href="/account/info">
          <a
            onClick={() => dispatch(setOpenModalAccountOption(false))}
            className="account__left-header-edit"
          >
            {language === "vni" ? "Sửa hồ sơ" : "Edit info"} <FiEdit2 />
          </a>
        </Link> */}
      </header>

      <div className="account__left-body">
        <ul className="account__left-body-list">
          {accountOptionList.map((item) => (
            <li
              onClick={() => {
                router.push(item.path)
                dispatch(setOpenModalAccountOption(false))
              }}
              key={item.path}
              className={`account__left-body-list-item ${
                item.path === router.pathname
                  ? "account__left-body-list-item-active"
                  : ""
              }`}
            >
              <h3 className="account__left-body-list-item-heading">
                {item.icon}
                {language === "vni" ? item.vniTitle : item.engTitle}
              </h3>
            </li>
          ))}

          <li
            onClick={() => {
              dispatch(clearOrderData())
              dispatch(logOut())
            }}
            className="account__left-body-list-item account__left-body-list-item-logout"
          >
            <h3 className="account__left-body-list-item-heading">
              <IoLogOutOutline />
              Đăng xuất
            </h3>
          </li>
        </ul>
      </div>
    </>
  )
}
