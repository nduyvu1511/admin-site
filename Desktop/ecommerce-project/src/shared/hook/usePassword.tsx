import { RootState } from "@/core/store"
import { ResetPassword } from "@/models"
import { setMessage, setOpenScreenLoading } from "@/modules"
import userApi from "@/services/userApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR, { KeyedMutator } from "swr"

interface ChangePasswordProps {
  handleSuccess: Function
  password: string
  re_password: string
  old_password: string
}

interface CreatePasswordProps extends ResetPassword {
  handleSuccess: Function
}

interface UsePasswordRes {
  data: boolean
  isValidating: boolean
  createPassword: (props: CreatePasswordProps) => void
  changePassword: (props: ChangePasswordProps) => void
  mutate: KeyedMutator<any>
}

export const usePassword = (shouldFetch = false): UsePasswordRes => {
  const dispatch = useDispatch()
  const { token, userInfo: { phone = "" } = { userInfo: undefined } } =
    useSelector((state: RootState) => state.user)

  const { data, isValidating, mutate } = useSWR(
    "check_password",
    shouldFetch && token
      ? () =>
          userApi.checkPassword({ token }).then((res: any) => {
            if (res?.result?.success) {
              return res.result.data.has_pass
            }
            return false
          })
      : null,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  const createPassword = async (props: CreatePasswordProps) => {
    const { password, handleSuccess, re_password, phone, token } = props
    if (!token || !password || !re_password || !phone) return
    dispatch(setOpenScreenLoading(true))

    try {
      const res: any = await userApi.resetPassword({
        password,
        re_password,
        token,
        phone,
      })
      dispatch(setOpenScreenLoading(false))

      if (res?.result?.success) {
        handleSuccess()
        dispatch(setMessage({ title: "Tạo mật khẩu thành công!" }))
      } else {
        dispatch(
          setMessage({
            title: res?.result?.message || "Tạo mật khẩu không thành công",
            type: "danger",
          })
        )
      }
    } catch (error) {
      dispatch(setOpenScreenLoading(false))
    }
  }

  const changePassword = async (props: ChangePasswordProps) => {
    const { password, handleSuccess, re_password, old_password } = props
    if (!token || !password || !re_password || !phone) return
    dispatch(setOpenScreenLoading(true))

    try {
      const res: any = await userApi.changePassword({
        password,
        re_password,
        old_password,
        token,
      })
      dispatch(setOpenScreenLoading(false))

      if (res?.result?.success) {
        handleSuccess()
        dispatch(setMessage({ title: "Đổi mật khẩu thành công" }))
      } else {
        dispatch(
          setMessage({
            title: res?.result?.message || "Đổi mật khẩu không thành công",
            type: "danger",
          })
        )
      }
    } catch (error) {
      dispatch(setOpenScreenLoading(false))
    }
  }

  return {
    createPassword,
    data,
    isValidating,
    mutate,
    changePassword,
  }
}
