import Link from "next/link"
import React from "react"
import { InputCheckbox } from "../common"

interface InputPolicyProps {
  isError?: boolean
  onChange: () => void
  value?: boolean
  onBlur: any
}

const InputPolicy = ({ onBlur, onChange, isError, value }: InputPolicyProps) => {
  console.log(value)
  return (
    <div className={`flex cursor-default items-center ${isError ? "" : ""}`}>
      <p className="mr-[14px]">
        <InputCheckbox
          isChecked={!!value}
          onCheck={() => {
            onChange()
            onBlur()
          }}
          type="square"
        />
      </p>
      <span
        className={`text-[13px] leading-[18px] select-none flex-1 ${
          isError ? "form-label-policy-text-error" : ""
        }`}
        onClick={() => {
          onChange()
          onBlur()
        }}
      >
        Tôi đã đồng ý với Exxe về{" "}
        <Link href="/">
          <a className="text-active">Điều khoản dịch vụ</a>
        </Link>{" "}
        &{" "}
        <Link href="/">
          <a className="text-active">Chính sách bảo mật.</a>
        </Link>
      </span>
    </div>
  )
}

export { InputPolicy }
