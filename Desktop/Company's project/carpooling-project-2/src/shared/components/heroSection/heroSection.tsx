import { PassengerMapIcon } from "@/assets"
import React from "react"

export const HeroSection = () => {
  return (
    <div className="relative">
      <div className="">
        <PassengerMapIcon />
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-[0]">
        <h1 className="home-heading font-[700] mb-[24px]">GỌI XE ĐƯỜNG DÀI</h1>
        <p className="text-text-color text-[24px] font-[400] leading-[26px]">
          Ứng dụng gọi xe đường dài số 1 Việt Nam
        </p>
      </div>
    </div>
  )
}
