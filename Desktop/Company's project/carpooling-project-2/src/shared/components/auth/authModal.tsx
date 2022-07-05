import { LoginForm, Modal, OTP, Register, ResetPassword, UserInfoForm } from "@/components"
import { useAuth, useProfile } from "@/hooks"
import { loginFormParams, UpdateUserInfoParams, UserInfoFormParams } from "@/models"
import { setProfile } from "@/modules"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

interface AuthModalProps {
  onClose: Function
}

const AuthModal = ({ onClose }: AuthModalProps) => {
  const dispatch = useDispatch()
  const { updateUserInfo } = useProfile()
  const { loginWithPassword, getUserInfo, loginWithPhoneNumber } = useAuth()
  const [modalType, setModalType] = useState<
    "login" | "resetPassword" | "sms" | "register" | "updateProfile"
  >("login")

  const handleGetUserInfo = () => {
    getUserInfo((userInfo) => {
      dispatch(setProfile(userInfo))
      // dispatch(notify("Đăng nhập thành công", "success"))
      onClose()
    })
  }

  const handleLoginWithPassword = (params: loginFormParams) => {
    loginWithPassword(params, () => {
      handleGetUserInfo()
    })
  }

  const handleLoginWithOTP = (firebaseToken: string) => {
    loginWithPhoneNumber({
      firebaseToken,
      onSuccess: () => {
        handleGetUserInfo()
      },
    })
  }

  const handleUpdateUserInfo = async (params: UserInfoFormParams) => {
    updateUserInfo({
      params: params as UpdateUserInfoParams,
      onSuccess: (userInfo) => {
        dispatch(setProfile(userInfo))
        dispatch(notify("Cập nhật thông tin thành công!", "success"))
        onClose()
      },
    })
  }

  const getModalHeading = (): string => {
    if (modalType === "login") return "Đăng nhập"
    if (modalType === "register") return "Đăng ký"
    if (modalType === "resetPassword") return "Quên mật khẩu"
    if (modalType === "sms") return "Đăng nhập bằng SMS"
    if (modalType === "updateProfile") return "Cập nhật thông tin"
    return "Đăng nhập"
  }

  return (
    <Modal heading={getModalHeading()} onClose={() => onClose()}>
      <div className="px-24 pt-[24px] pb-[40px] h-full overflow-auto scrollbar-hide">
        {modalType === "login" ? (
          <LoginForm
            onSubmit={(data) => handleLoginWithPassword(data)}
            onClickResetPassword={() => setModalType("resetPassword")}
            onClickLoginSMS={() => setModalType("sms")}
            onClickRegister={() => setModalType("register")}
          />
        ) : null}

        {modalType === "resetPassword" ? (
          <ResetPassword onSuccess={() => setModalType("login")} />
        ) : null}

        {modalType === "sms" ? (
          <OTP
            type="login"
            onVerifyOTP={(token) => {
              handleLoginWithOTP(token)
            }}
          />
        ) : null}

        {modalType === "register" ? (
          <Register onSuccess={() => setModalType("updateProfile")} />
        ) : null}

        {modalType === "updateProfile" ? (
          <UserInfoForm onSubmit={(data) => handleUpdateUserInfo(data)} />
        ) : null}
      </div>
    </Modal>
  )
}

export { AuthModal }
