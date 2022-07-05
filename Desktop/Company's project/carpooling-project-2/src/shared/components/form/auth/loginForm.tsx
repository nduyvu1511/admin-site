import { EyeHideIcon, EyeShowIcon } from "@/assets"
import { ButtonSubmit } from "@/components/buttons"
import { loginSchema } from "@/core/schema"
import { FORM_LOGIN_KEY, getFromLocalStorage, setToLocalStorage } from "@/helper"
import { loginFormParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface LoginFormProps {
  onSubmit?: (data: loginFormParams) => void
  onClickResetPassword?: Function
  onClickLoginSMS?: Function
  onClickRegister?: Function
}

export const LoginForm = ({
  onSubmit,
  onClickResetPassword,
  onClickLoginSMS,
  onClickRegister,
}: LoginFormProps) => {
  const formStorage = getFromLocalStorage(FORM_LOGIN_KEY)
  const [showPw, setShowPw] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<loginFormParams>({
    resolver: yupResolver(loginSchema),
    mode: "all",
    defaultValues: {
      phone: formStorage?.phone || "",
      password: formStorage?.password || "",
    },
  })

  useEffect(() => {
    ;(document.querySelector(".form-input") as HTMLInputElement)?.focus()
  }, [])

  const onSubmitHandler = (data: loginFormParams) => {
    const { password, phone } = data
    onSubmit && onSubmit(data)
    setToLocalStorage(FORM_LOGIN_KEY, { phone, password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-item">
        <label htmlFor={"phone"} className="form-label">
          Số điện thoại <span className="">(*)</span>
        </label>

        <div className="">
          <input
            className={`form-input ${errors?.["phone"] ? "form-input-err" : ""}`}
            id={"phone"}
            type="text"
            placeholder="Số điện thoại"
            {...register("phone", {
              required: true,
            })}
          />
        </div>

        {errors.phone || dirtyFields.phone ? (
          <p className="form-err-msg">{errors.phone?.message}</p>
        ) : null}
      </div>

      <div className="form-item">
        <label htmlFor={"password"} className="form-label">
          Mật Khẩu <span className="form-label-warning">(*)</span>
        </label>
        <div className="form-item">
          <div className="relative">
            <input
              className={`form-input ${errors?.["password"] ? "form-input-err" : ""}`}
              id={"password"}
              type={showPw ? "text" : "password"}
              placeholder="Mật khẩu"
              {...register("password", {
                required: true,
              })}
            />

            <span
              onClick={() => setShowPw(!showPw)}
              className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-[10px]"
            >
              {showPw ? <EyeHideIcon /> : <EyeShowIcon />}
            </span>
          </div>
          {errors.password || dirtyFields.password ? (
            <p className="form-err-msg">{errors.password?.message}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between text-[12px] text-gray-color-4 font-normal mb-[40px]">
        <button onClick={() => onClickResetPassword && onClickResetPassword()} className="">
          Quên mật khẩu
        </button>
        <button onClick={() => onClickLoginSMS && onClickLoginSMS()} className="">
          Đăng nhập với SMS
        </button>
      </div>

      <div className="flex justify-center mb-[40px]">
        <ButtonSubmit onClick={() => handleSubmit(onSubmitHandler)} isError={!isValid} />
      </div>

      <div className="text-14 font-medium text-gray-color-4 leading-26 text-center">
        Bạn chưa có tài khoản?{" "}
        <a
          onClick={() => onClickRegister && onClickRegister()}
          className="text-primary cursor-pointer"
        >
          Đăng ký
        </a>
      </div>
    </form>
  )
}
