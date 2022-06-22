import { cartEmptyIcon } from "@/assets"
import { RootState } from "@/core/store"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useSelector } from "react-redux"
import { useNotification } from "shared/hook/useNotification"
import { notifications } from "./data"

export const Notification = () => {
  const { token } = useSelector((state: RootState) => state.user)
  const { data: notification } = useNotification()

  return (
    <div className="notification">
      {!token ? (
        <div className="notification__empty">
          {cartEmptyIcon}
          {token ? (
            <p>Bạn chưa có thông báo nào</p>
          ) : (
            <>
              <p>Bạn cần đăng nhập để xem thông báo</p>

              <Link href="/login">
                <a className="btn-primary notification__empty-btn">Đăng nhập</a>
              </Link>
            </>
          )}
        </div>
      ) : (
        <ul className="notification__list">
          {notifications.map((noti) => (
            <li className="notification__list-item" key={noti.id}>
              <div className="notification__list-item-img">
                <div className="image-container">
                  <Image
                    className="image"
                    src={noti.image}
                    layout="fill"
                    alt=""
                  />
                </div>
              </div>
              <div className="notification__list-item-content">
                <p className="notification__list-item-content-name">
                  {noti.name}
                </p>
                <p className="notification__list-item-content-title">
                  {noti.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
