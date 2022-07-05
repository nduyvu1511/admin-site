import { ResetPasswordParams } from "@/models"
import { setScreenLoading } from "@/modules"
import { userApi } from "@/services"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import useSWR, { KeyedMutator } from "swr"

interface ChangePasswordProps {
  handleSuccess: Function
  password: string
  re_password: string
  old_password: string
}

interface CreatePasswordProps {
  handleSuccess: Function
  password: string
  re_password: string
}

interface DoResetPasswordParams {
  params: ResetPasswordParams
  onSuccess: Function
  onError?: Function
}

interface UsePasswordRes {
  data: boolean
  isValidating: boolean
  createPassword: (props: CreatePasswordProps) => void
  changePassword: (props: ChangePasswordProps) => void
  resetPassword: (props: DoResetPasswordParams) => void
  mutate: KeyedMutator<any>
}

export const usePassword = (shouldFetch = false): UsePasswordRes => {
  const dispatch = useDispatch()

  const { data, isValidating, mutate } = useSWR(
    "check_password",
    shouldFetch
      ? () =>
          userApi.checkHasPassword().then((res: any) => {
            if (res?.result?.success) {
              return res?.result?.data?.has_password || false
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
    const { password, handleSuccess, re_password } = props
    if (!password || !re_password) return
    dispatch(setScreenLoading(true))

    try {
      const res: any = await userApi.createNewPassword({
        password,
        re_password,
      })
      dispatch(setScreenLoading(false))

      if (res?.result?.success) {
        handleSuccess()
        dispatch(notify("Tạo mật khẩu thành công!", "success"))
      } else {
        dispatch(notify(res?.result?.message || "Tạo mật khẩu không thành công", "error"))
      }
    } catch (error) {
      dispatch(setScreenLoading(false))
    }
  }

  const resetPassword = async (props: DoResetPasswordParams) => {
    const { params, onSuccess, onError } = props
    dispatch(setScreenLoading(true))

    try {
      const res: any = await userApi.resetPassword(params)
      dispatch(setScreenLoading(false))

      if (res?.result?.success) {
        onSuccess()
        dispatch(notify("Lấy lại mật khẩu thành công!", "success"))
      } else {
        onError && onError()
        dispatch(notify(res?.result?.message || "Lấy lại mật khẩu không thành công", "error"))
      }
    } catch (error) {
      dispatch(setScreenLoading(false))
    }
  }

  const changePassword = async (props: ChangePasswordProps) => {
    const { password, handleSuccess, re_password, old_password } = props
    if (!password || !re_password) return
    dispatch(setScreenLoading(true))

    try {
      const res: any = await userApi.changePassword({
        password,
        re_password,
        old_password,
      })
      dispatch(setScreenLoading(false))

      if (res?.result?.success) {
        handleSuccess()

        dispatch(notify("Đổi mật khẩu thành công!", "success"))
      } else {
        dispatch(notify(res?.result?.message || "Đổi mật khẩu không thành công", "error"))
      }
    } catch (error) {
      dispatch(setScreenLoading(false))
    }
  }

  return {
    createPassword,
    data,
    isValidating,
    mutate,
    changePassword,
    resetPassword,
  }
}
