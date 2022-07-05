import { EyeHideIcon, EyeShowIcon } from "@/assets"
import { createPasswordSchema } from "@/core/schema"
import { createNewPasswordFormFields } from "@/helper"
// import { createNewPasswordFormFields } from "@/helper"
import { CreatePasswordFormParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface ForgotPasswordProps {
  onSubmit: (props: CreatePasswordFormParams) => void
}

export const CreatePasswordForm = ({ onSubmit }: ForgotPasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<CreatePasswordFormParams>({
    resolver: yupResolver(createPasswordSchema),
    mode: "all",
  })

  const [inputs, setInputs] = useState<string[]>([])

  useEffect(() => {
    ;(document.querySelector(".form-input") as HTMLInputElement).focus()
  }, [])

  const handleToggleInputType = (name: string) => {
    if (inputs.includes(name)) {
      setInputs([...inputs].filter((item) => item !== name))
    } else {
      setInputs([...inputs, name])
    }
  }

  const onSubmitHandler = (data: CreatePasswordFormParams) => {
    onSubmit(data)
    console.log(data)
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-[40px]">
        {createNewPasswordFormFields.map((field) => (
          <div key={field.name} className="form-item">
            <label htmlFor={field.name} className="form-label">
              {field.label} <span>(*)</span>
            </label>

            <div className="relative">
              <input
                className={`form-input pr-[45px] ${errors?.[field.name] ? "form-input-err" : ""}`}
                {...register(field.name, {
                  required: true,
                })}
                id={field.name}
                type={inputs.includes(field.name) ? "text" : "password"}
                name={field.name}
                placeholder={field.label}
              />

              <span
                onClick={() => handleToggleInputType(field.name)}
                className="right-[10px] absolute-vertical cursor-pointer"
              >
                {inputs?.includes(field.name) ? <EyeHideIcon /> : <EyeShowIcon />}
              </span>
            </div>

            {errors?.[field.name] || dirtyFields?.[field.name] ? (
              <p className="form-err-msg">{errors?.[field.name]?.message}</p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="flex-center">
        <button type="submit" className={`btn-primary ${isValid ? "" : "btn-disabled"}`}>
          Xác nhận
        </button>
      </div>
    </form>
  )
}
