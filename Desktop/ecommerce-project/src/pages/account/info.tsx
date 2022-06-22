import { avatar } from "@/assets"
import { AccountContainer } from "@/container"
import { inputs } from "@/container/account/data"
import { userInfoSchema } from "@/core/schema"
import { isObjectHasValue } from "@/helper"
import { MainAuthLayout } from "@/layout"
import { API_URL } from "@/services"
import { Field, Form, Formik } from "formik"
import Image from "next/image"
import { ChangeEvent } from "react"
import { useAttachment, useUser } from "shared/hook"

interface UserForm {
  phone: string
  email: string
  name: string
  sex?: "male" | "female" | ""
}

const UserInfo = () => {
  const language = "vni"
  const { data: userInfo, updateUser } = useUser()
  const { getBase64Images } = useAttachment({ limit: 1 })

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files) return

    getBase64Images(e.target.files, (images) => {
      if (!images?.[0]) return
      updateUser({
        name_customs: userInfo.name,
        sex: userInfo.sex || "",
        email: userInfo.email,
        image: images?.[0].replace(/^data:image\/\w+;base64,/, ""),
      })
    })
  }

  const handleEditUser = (user: UserForm) => {
    updateUser({
      email: user?.email || "",
      name_customs: user?.name || "",
      sex: user?.sex || "",
    })
  }

  return (
    <AccountContainer
      headerMobileTitle="Thông tin"
      breadcrumbList={[
        { path: "/account", name: "Tài khoản" },
        { path: "/", name: "Hồ sơ" },
      ]}
      heading="Thông tin người dùng"
    >
      <div className="user__info-container">
        <div className="user__info-form">
          {isObjectHasValue(userInfo) && (
            <Formik
              initialValues={{
                phone: userInfo?.phone || "",
                email: userInfo.email,
                name: userInfo.name,
                sex: userInfo?.sex || "",
              }}
              validationSchema={userInfoSchema}
              onSubmit={handleEditUser}
            >
              {({ errors, touched, isValid }) => (
                <Form className="form-control">
                  {inputs.map((input) => (
                    <div
                      key={input.id}
                      className={`${
                        input.id === "sex"
                          ? "form-item-inline-radio"
                          : "form-item-inline"
                      }`}
                    >
                      <label htmlFor={input.id}>
                        {language === "vni" ? input.vniTitle : input.engTitle}
                      </label>

                      <div className="form-item-inline-wrapper">
                        {input.type === "text" ? (
                          <Field
                            className={`form-item-input ${
                              errors[input.id] && touched[input.id]
                                ? "form-item-input-error"
                                : ""
                            }`}
                            id={input.id}
                            readOnly={userInfo.phone && input.id === "phone"}
                            type="text"
                            placeholder={
                              language === "vni"
                                ? input.vniTitle
                                : input.engTitle
                            }
                            name={input.id}
                          />
                        ) : (
                          <div className="form-item-radio">
                            <label>
                              <Field
                                type="radio"
                                name={input.id}
                                value="male"
                              />
                              {language === "vni" ? "Nam" : "Male"}
                            </label>
                            <label>
                              <Field
                                type="radio"
                                name={input.id}
                                value="female"
                              />
                              {language === "vni" ? "Nữ" : "Female"}
                            </label>
                          </div>
                        )}

                        {errors[input.id] && touched[input.id] ? (
                          <p className="form-item-text-error">
                            {errors[input.id]}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  <button type="submit" className="btn-primary">
                    {language === "vni" ? "Cập nhật" : "Update"}
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>

        <div className="user__info-avatar">
          <div className="user__info-avatar-wrapper">
            <input
              onChange={handleChangeAvatar}
              type="file"
              name=""
              hidden
              id="user-info-avatar"
            />
            <label htmlFor="user-info-avatar">
              <div className="image-container">
                <Image
                  src={
                    userInfo?.avatar ? `${API_URL}${userInfo.avatar}` : avatar
                  }
                  quality={10}
                  layout="fill"
                  className="image"
                  alt=""
                />
              </div>
            </label>

            <label
              htmlFor="user-info-avatar"
              className="btn-primary-outline user__info-avatar-btn"
            >
              Chọn ảnh
            </label>
          </div>
        </div>
      </div>
    </AccountContainer>
  )
}

UserInfo.Layout = MainAuthLayout

export default UserInfo
