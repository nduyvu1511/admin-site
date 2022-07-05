import { OtpSecondsRemains } from "@/components/auth"
import { useState } from "react"
import OtpInput from "react-otp-input"

interface PhoneFormProps {
  phoneNumber: string
  onSubmit: (otpCode: string) => void
  reGenerateRecaptcha?: Function
}

export const OtpForm = ({ phoneNumber, onSubmit, reGenerateRecaptcha }: PhoneFormProps) => {
  const [otpVal, setOtpVal] = useState<string>("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (otpVal?.length < 6) return
        onSubmit && onSubmit(otpVal)
      }}
      className="form-control"
    >
      <div className="form-control-otp">
        <label className="form-label text-center flex justify-center mb-[40px]" htmlFor="otpInput">
          Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến{" "}
          <b className="ml-[4px]">{phoneNumber}</b>
        </label>

        <div className="my-otp-input flex-center mb-[40px]">
          <OtpInput
            shouldAutoFocus
            value={otpVal}
            onChange={(otp: string) => setOtpVal(otp)}
            numInputs={6}
            isInputNum
          />
        </div>
      </div>

      <div className="mb-[40px]">
        <OtpSecondsRemains />
      </div>

      <div className="flex-center">
        <button
          type="submit"
          className={`btn-primary otp-btn-login ${otpVal.length === 6 ? "" : "btn-disabled"}`}
        >
          Xác nhận
        </button>
      </div>
    </form>
  )
}
