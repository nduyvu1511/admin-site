import { phoneNumberSchema } from "@/core/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { ReactNode, useEffect } from "react"
import { useForm } from "react-hook-form"

interface OtpFormProps {
  onSubmit: (phoneNumber: string) => void
  phone?: string
  children?: ReactNode
}

export const PhoneForm = ({ onSubmit, phone, children }: OtpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<{ phone: string }>({
    resolver: yupResolver(phoneNumberSchema),
    mode: "all",
    defaultValues: {
      phone: phone || "",
    },
  })

  useEffect(() => {
    ;(document.querySelector(".form-input") as HTMLInputElement)?.focus()
  }, [])

  const onSubmitHandler = ({ phone }: { phone: string }) => {
    onSubmit && onSubmit(phone)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={`form-item ${!children ? "mb-[40px]" : ""}`}>
        <label htmlFor={"phone"} className="form-label">
          Số điện thoại (*)
        </label>

        <div className="form-item-inner">
          <div className="form-item-wrapper">
            <input
              className={`form-input ${errors?.["phone"] ? "form-input-err" : ""}`}
              id="phone"
              type="phone"
              {...register("phone", {
                required: true,
              })}
              placeholder="+84"
            />
          </div>
          {errors?.["phone"] || dirtyFields?.["phone"] ? (
            <p className="form-err-msg">{errors?.["phone"]?.message}</p>
          ) : null}
        </div>
      </div>

      {children || null}

      <div className="flex justify-center">
        <button type="submit" className={`btn-primary ${isValid ? "" : "btn-disabled"}`}>
          Xác nhận
        </button>
      </div>
    </form>
  )
}
