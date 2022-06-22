import { changePasswordSchema, createPasswordSchema } from "@/core/schema"
import { passwordFormData } from "@/helper"
import { Field, Form, Formik } from "formik"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri"

export type PasswordFormProps = {
  password: string
  newPassword: string
  reNewPassword: string
}

interface ForgotPasswordProps {
  type: "changePassword" | "createPassword"
  onSubmit: (props: PasswordFormProps) => void
}

export const PasswordForm = ({ onSubmit, type }: ForgotPasswordProps) => {
  const [inputs, setInputs] = useState<string[]>([])

  const handleToggleInputType = (name: string) => {
    if (inputs.includes(name)) {
      setInputs([...inputs].filter((item) => item !== name))
    } else {
      setInputs([...inputs, name])
    }
  }

  return (
    <Formik
      initialValues={
        type === "changePassword"
          ? {
              password: "",
              newPassword: "",
              reNewPassword: "",
            }
          : {
              newPassword: "",
              reNewPassword: "",
            }
      }
      validationSchema={
        type === "changePassword" ? changePasswordSchema : createPasswordSchema
      }
      onSubmit={(data) => onSubmit({ ...data, password: data.password || "" })}
    >
      {({ errors, touched, isValid }) => (
        <Form className="form-control">
          {passwordFormData.map(
            (input, index) =>
              (type === "createPassword" ? index > 0 : index >= 0) && (
                <div key={index} className="form-item">
                  <label htmlFor={input.name}>{input.label}</label>

                  <div className="form-item-wrapper">
                    <Field
                      className={`form-item-input ${
                        errors[input.name] && touched[input.name]
                          ? "form-item-input-error"
                          : ""
                      }`}
                      id={input.name}
                      type={inputs.includes(input.name) ? "text" : "password"}
                      name={input.name}
                    />

                    <span
                      onClick={() => handleToggleInputType(input.name)}
                      className="form-item-toggle-pw-btn"
                    >
                      {inputs?.includes(input.name) ? (
                        <RiEyeCloseLine />
                      ) : (
                        <RiEyeFill />
                      )}
                    </span>
                  </div>

                  {errors[input.name] && touched[input.name] ? (
                    <p className="form-item-text-error">{errors[input.name]}</p>
                  ) : null}
                </div>
              )
          )}

          {type === "changePassword" ? (
            <div className="form-item-forgot-pw">
              <Link href="/reset_password">
                <a>Quên mật khẩu</a>
              </Link>
            </div>
          ) : null}

          <button
            type="submit"
            className={`btn-primary ${isValid ? "" : "opacity-50"}`}
          >
            Xác nhận
          </button>
        </Form>
      )}
    </Formik>
  )
}
