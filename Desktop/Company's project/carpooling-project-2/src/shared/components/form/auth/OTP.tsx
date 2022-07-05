import { OtpForm, PhoneForm } from "@/components"
import { authentication } from "@/core/config"
import { useAuth } from "@/hooks"
import { setScreenLoading } from "@/modules"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { ReactNode, useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

declare global {
  interface Window {
    recaptchaVerifier: any
    confirmationResult: any
  }
}

interface LoginOtpProps {
  onVerifyOTP: (token: string) => void
  type?: "register" | "login" | "resetPassword"
  children?: ReactNode
}

export const OTP = ({ onVerifyOTP, type, children }: LoginOtpProps) => {
  const dispatch = useDispatch()
  const { OTPVerifier, checkPhoneExist } = useAuth()
  const [expandForm, setExpandForm] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>("")

  const generateRecaptcha = () => {
    return new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      authentication
    )
  }

  // Generate OTP input
  const generateOTPCode = async (phoneNumber: string) => {
    if (!phoneNumber) return

    dispatch(setScreenLoading(true))
    const verify = generateRecaptcha()

    try {
      const confirmationResult = await signInWithPhoneNumber(
        authentication,
        `+84${phoneNumber.slice(1)}`,
        verify
      )
      dispatch(setScreenLoading(false))
      setPhone(phoneNumber)
      window.confirmationResult = confirmationResult

      setExpandForm(true)
    } catch (error) {
      dispatch(setScreenLoading(false))
      generateRecaptcha()
    }
  }

  // Validate OTP
  const handleVerifyOTP = async (otpInput: string) => {
    OTPVerifier({
      otpInput,
      handleSuccess: (token) => {
        onVerifyOTP(token)
      },
    })
  }

  const handleGenerateOTPCode = (phone: string) => {
    if (type === undefined) {
      generateOTPCode(phone)
      return
    }

    checkPhoneExist(
      phone,
      type,
      () => {
        generateOTPCode(phone)
      },
      () => {
        type === "register"
          ? dispatch(notify("SĐT đã tồn tại, vui lòng thử đăng nhập!", "warning"))
          : dispatch(notify("Không tìm thấy SĐT, vui lòng thử lại", "warning"))
      }
    )
  }

  return (
    <>
      {!expandForm ? (
        <PhoneForm onSubmit={(phone) => handleGenerateOTPCode(phone)}>{children}</PhoneForm>
      ) : (
        <div className="otp__form">
          <OtpForm
            reGenerateRecaptcha={() => generateOTPCode(phone || "")}
            phoneNumber={phone || ""}
            onSubmit={(val) => handleVerifyOTP(val)}
          />
        </div>
      )}

      <div id="recaptcha-container"></div>
    </>
  )
}
