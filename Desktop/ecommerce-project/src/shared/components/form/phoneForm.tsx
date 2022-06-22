import { phoneNumberSchema } from "@/core/schema"
import { RootState } from "@/core/store"
import { getFromSessionStorage } from "@/helper"
import { setPhoneNumber } from "@/modules"
import { Field, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"

interface OtpFormProps {
  onSubmit: (phoneNumber: string) => void
  type: "login" | "update" | "otpValidate"
}

export const PhoneForm = ({ onSubmit, type }: OtpFormProps) => {
  const dispatch = useDispatch()
  const { userInfo: { phone = "" } = { userInfo: undefined } } = useSelector(
    (state: RootState) => state.user
  )

  return (
    <Formik
      initialValues={{
        phoneNumber:
          type === "login"
            ? getFromSessionStorage("phoneNumberInput") || ""
            : type === "otpValidate"
            ? phone || ""
            : "",
      }}
      validationSchema={phoneNumberSchema}
      onSubmit={({ phoneNumber }) => {
        sessionStorage.setItem("phoneNumberInput", phoneNumber)
        onSubmit(phoneNumber)
        dispatch(setPhoneNumber(phoneNumber))
      }}
    >
      {({ errors, touched, isValid }) => (
        <Form className="form-control form-control-auth">
          <div className="form-item">
            <Field
              className={`form-item-input ${
                errors.phoneNumber && touched.phoneNumber
                  ? "form-item-input-error"
                  : ""
              }`}
              id="phoneNumber"
              type="text"
              placeholder="Số điện thoại"
              name="phoneNumber"
            />
            {errors.phoneNumber && touched.phoneNumber ? (
              <p className="form-item-text-error">{errors.phoneNumber}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className={`btn-primary ${!isValid ? "btn-disabled" : ""}`}
          >
            Tiếp theo
          </button>
        </Form>
      )}
    </Formik>
  )
}
