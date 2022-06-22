import { RootState } from "@/core/store"
import { UpdateUserPropsHook, UserInfo } from "@/models"
import {
  editUserInfo,
  setMessage,
  setUserInfo,
  setOpenScreenLoading,
} from "@/modules"
import userApi from "@/services/userApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface UserRes {
  data: UserInfo
  isValidating: boolean
  error: any
  updateUser: (user: UpdateUserPropsHook) => void
}

const useUser = (): UserRes => {
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const { data, error, isValidating, mutate } = useSWR(
    "user_info_edit",
    token
      ? () =>
          userApi.getUserInfo({ token }).then((res: any) => {
            const user = res?.result?.data || {}
            if (res?.result?.success) return user
          })
      : null,
    {
      revalidateOnFocus: false,
    }
  )

  const updateUser = (user: UpdateUserPropsHook) => {
    if (!token) return

    dispatch(setOpenScreenLoading(true))

    userApi
      .updateUser({ ...user, token })
      .then((res: any) => {
        if (res?.result?.success) {
          const newUser = {
            email: user.email,
            name: user.name_customs,
            sex: user.sex,
            image: user.image
              ? res?.result?.data?.find((item: any) => item.image_url)
                  ?.image_url?.[0] || ""
              : "",
          }

          dispatch(editUserInfo(newUser))
          mutate({ ...data, newUser }, true)

          dispatch(setOpenScreenLoading(false))
          dispatch(
            setMessage({
              title: "Chỉnh sửa thông tin thành công!",
            })
          )
        } else {
          dispatch(
            setMessage({
              title: res?.result?.message || "",
              type: "danger",
            })
          )
          dispatch(setOpenScreenLoading(false))
        }
      })
      .catch(() => {
        dispatch(setOpenScreenLoading(false))
      })
  }
  return {
    data,
    error,
    isValidating,
    updateUser,
  }
}

export { useUser }
