import { HeaderLogin, HeaderMobile, OTP } from "@/components"
import { LoginLayout } from "@/layout/login"

const LoginWithOTP = () => {
  return (
    <>
      <HeaderMobile centerChild={<p>Đăng nhập</p>} />
      <HeaderLogin title="Đăng nhập" />

      <OTP view="page" type="login" />
    </>
  )
}

LoginWithOTP.Layout = LoginLayout

export default LoginWithOTP
