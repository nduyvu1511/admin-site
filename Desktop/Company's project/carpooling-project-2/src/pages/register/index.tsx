import { OTP } from "@/components"
import { ScreenContainer } from "@/container"
import { useAuth } from "@/hooks"
import { userApi } from "@/services"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const Register = () => {
  const { loginWithPhoneNumber } = useAuth()
  const dispatch = useDispatch()
  const [firebaseToken, setFireBaseToken] = useState<string>()

  const handleRegister = async (firebase_access_token: string) => {
    try {
      const res: any = await userApi.register({ firebase_access_token })
      if (!res?.result?.success) {
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra, vui lòng thử lại!", "error"))
        return
      }
      const token = res?.result?.data?.token
      console.log("token back is: ", token)
    } catch (error) {}
  }

  return (
    <ScreenContainer heading="Đăng ký">
      <div className="content-container">
        <OTP
          onVerifyOTP={(token) => {
            handleRegister(token)
          }}
        />
        {/* <_Register onSuccess={() => {}} /> */}
      </div>
    </ScreenContainer>
  )
}

export default Register
