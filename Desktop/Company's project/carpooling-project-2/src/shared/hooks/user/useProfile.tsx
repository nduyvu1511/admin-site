import { CreateUserFormParams, UseParams, UserInfo } from "@/models"
import { setScreenLoading, setProfile } from "@/modules"
import { userApi } from "@/services"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"
import { useAuth } from "../auth"

interface UserRes {
  data: UserInfo | undefined
  isValidating: boolean
  createUserInfo: (para: UseParams<CreateUserFormParams, UserInfo>) => void
  updateUserInfo: (para: UseParams<CreateUserFormParams, UserInfo>) => void
}

const useProfile = (shouldFetch = false): UserRes => {
  const dispatch = useDispatch()
  const { logout } = useAuth()

  const { data, isValidating } = useSWR<UserInfo>(
    "get_user_info",
    shouldFetch
      ? () =>
          userApi.getUserInfo().then((res: any) => {
            const userInfo = res?.result?.data
            if (!res?.result?.validate_token) {
              logout()
            } else {
              dispatch(setProfile(userInfo))
            }
            return userInfo
          })
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 10000,
      revalidateOnFocus: false,
    }
  )

  const createUserInfo = async (para: UseParams<CreateUserFormParams, UserInfo>) => {
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.createUserInfo({
        ...params,
      })
      dispatch(setScreenLoading(false))
      if (!res?.result?.success) {
        onError && onError()
        dispatch(notify(res?.result?.message, "error"))
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
      dispatch(setScreenLoading(false))
    }
  }

  const updateUserInfo = async (para: UseParams<CreateUserFormParams, UserInfo>) => {
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.updateUserInfo(params)
      dispatch(setScreenLoading(false))
      if (!res?.result?.success) {
        onError && onError()
        dispatch(notify(res?.result?.message, "error"))
        return
      }
      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
      dispatch(setScreenLoading(false))
    }
  }

  return { data, isValidating, createUserInfo, updateUserInfo }
}

export { useProfile }
