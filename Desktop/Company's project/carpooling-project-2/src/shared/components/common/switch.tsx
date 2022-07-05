import React, { useState } from "react"

export const Switch = () => {
  const [status, setStatus] = useState<boolean>(false)

  return (
    <button className="relative border border-solid border-gray-color-2 h-[58px] w-[280px] rounded-[30px] flex items-center p-[4px]">
      <span
        className={`absolute transition-all duration-300 h-[90%] ${
          status ? "left-[4px]" : "left-[136px]"
        } top-1/2 transform -translate-y-1/2 w-[50%] bg-gray-color-4 rounded-[30px]`}
      ></span>
      <span
        onClick={() => setStatus(true)}
        className={`flex-1 transition-all duration-300 ${
          status ? "text-white-color" : "text-text-color"
        } z-10 text-[16px] font-semibold`}
      >
        Khách hàng
      </span>
      <span
        onClick={() => setStatus(false)}
        className={`flex-1 z-10 text-[16px] transition-all duration-300 font-semibold ${
          !status ? "text-white-color" : "text-text-color"
        }`}
      >
        Tài xế
      </span>
    </button>
  )
}
