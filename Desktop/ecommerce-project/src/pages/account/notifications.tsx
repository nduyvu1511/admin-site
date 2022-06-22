import { Notification } from "@/components"
import { AccountContainer } from "@/container"
import { MainAuthLayout } from "@/layout"
import React from "react"

const Notifications = () => {
  return (
    <AccountContainer
      headerMobileTitle="Thông báo"
      breadcrumbList={[
        { path: "/", name: "Tài khoản" },
        { path: "/", name: "Thông báo" },
      ]}
      heading="Thông báo"
    >
      <div className="notification-container">
        <Notification />
      </div>
    </AccountContainer>
  )
}

Notifications.Layout = MainAuthLayout

export default Notifications
