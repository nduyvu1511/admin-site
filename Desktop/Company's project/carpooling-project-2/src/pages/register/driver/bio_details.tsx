import { ImageFileLoading, InputLoading, TextareaLoading, UserInfoForm } from "@/components"
import { ScreenContainer } from "@/container"
import { useProfile } from "@/hooks"
import { UserInfoFormParams } from "@/models"
import { setProfile } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const BioDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { data: userInfo, isValidating, createUserInfo } = useProfile(true)

  const onSubmitHandler = (data: UserInfoFormParams) => {
    createUserInfo({
      params: {
        ...data,
        car_account_type: "car_driver",
      },
      onSuccess: (userInfo) => {
        dispatch(setProfile(userInfo))
        setTimeout(() => {
          router.push(
            `/register/driver${router.query?.type === "register" ? "?type=register" : ""}`
          )
        }, 0)
      },
      onError: () => {
        dispatch(notify("Có lỗi xảy ra, vui lòng thử lại", "error"))
      },
    })
  }

  return (
    <ScreenContainer heading="Thông tin người dùng">
      <div className="content-container">
        {!isValidating ? (
          <UserInfoForm onSubmit={onSubmitHandler} defaultValues={userInfo} />
        ) : (
          <>
            <ImageFileLoading />
            <InputLoading />
            <InputLoading />
            <InputLoading />
            <TextareaLoading />
          </>
        )}
      </div>
    </ScreenContainer>
  )
}

export default BioDetail
