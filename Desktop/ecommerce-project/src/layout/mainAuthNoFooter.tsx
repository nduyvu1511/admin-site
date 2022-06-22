import { LayoutProps } from "@/models"
import { setToken, setUserInfo } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "shared/hook"
import { RootState } from "../core"
import { MainNoFooter } from "./noFooter"

export const MainAuthLayoutNoFooter = ({ children }: LayoutProps) => {
  const { token } = useSelector((state: RootState) => state.user)
  const router = useRouter()
  const dispatch = useDispatch()
  const { getUserInfo } = useAuth()

  useEffect(() => {
    if (!token) {
      router.push("/login")
    } else {
      getUserInfo(
        token,
        () => {},
        () => {
          dispatch(setToken(""))
          dispatch(setUserInfo(undefined))
          router.push("/login")
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return <MainNoFooter>{children}</MainNoFooter>
}
