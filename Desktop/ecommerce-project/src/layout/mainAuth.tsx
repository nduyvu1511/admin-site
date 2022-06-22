import { LayoutProps } from "@/models"
import { clearOrderData, logOut, setToken, setUserInfo } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "shared/hook"
import { RootState } from "../core"
import { MainLayout } from "./main"

export const MainAuthLayout = ({ children }: LayoutProps) => {
  const { token } = useSelector((state: RootState) => state.user)
  const router = useRouter()
  const { getUserInfo } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {
      router.push("/login")
    } else {
      getUserInfo(
        token,
        () => {},
        () => {
          dispatch(logOut())
          dispatch(clearOrderData())
          router.push("/login")
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return <MainLayout>{children}</MainLayout>
}
