import { HeaderLogin, HeaderMobile, LoginForm } from "@/components"
import { LoginLayout } from "@/layout/login"

const Login = () => {
  return (
    <>
      <HeaderLogin title="Đăng nhập" />

      <HeaderMobile centerChild={<p>Đăng nhập</p>} />
      <LoginForm view="page" />
    </>
  )
}

Login.Layout = LoginLayout

export default Login
