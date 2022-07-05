import { ImageSingleFile } from "@/components"

import { inspectionCertificateSchema } from "@/core/schema"
import { certificatesRegistrationFormFields } from "@/helper"
import { CertificateInspectionParams, CertificateInspectionRes } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { ButtonSubmit } from "@/components"

interface RegistrationCetificateFormProps {
  defaultValues?: CertificateInspectionRes
  onSubmit: (params: CertificateInspectionParams) => void
  view?: "modal" | "page"
}

export const RegistrationCetificateForm = ({
  onSubmit,
  defaultValues,
  view = "modal",
}: RegistrationCetificateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
  } = useForm<CertificateInspectionParams>({
    resolver: yupResolver(inspectionCertificateSchema),
    mode: "all",
    defaultValues: {
      back_inspection_certificate_image_url: defaultValues?.back_inspection_certificate_image?.id,
      front_inspection_certificate_image_url: defaultValues?.front_inspection_certificate_image?.id,
      date_of_expiry: defaultValues?.date_of_expiry,
      identity_number: defaultValues?.identity_number,
    },
  })

  const [frontImage, setFrontImage] = useState<string>()
  const [backImage, setBackImage] = useState<string>()

  const onSubmitHandler = (data: CertificateInspectionParams) => {
    onSubmit &&
      onSubmit({
        ...data,
        back_inspection_certificate_image_url: Number(data.back_inspection_certificate_image_url),
        front_inspection_certificate_image_url: Number(data.front_inspection_certificate_image_url),
      })
  }
  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {certificatesRegistrationFormFields.map((field) => (
        <div key={field.name} className="form-item">
          <label htmlFor={field.name} className="form-label">
            {field.label}{" "}
            {field?.isRequired ? <span className="form-label-warning">(*)</span> : null}
          </label>

          {field.type === "file" ? (
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange } }) => (
                <div className="driver-bio__form-input">
                  <ImageSingleFile
                    id={field.name}
                    image={
                      field.name === "front_inspection_certificate_image_url"
                        ? frontImage || defaultValues?.front_inspection_certificate_image?.url
                        : backImage || defaultValues?.back_inspection_certificate_image?.url
                    }
                    isError={!!errors?.[field.name]?.message}
                    getImage={(img) => {
                      onChange(img.attachment_id)
                      field.name === "front_inspection_certificate_image_url"
                        ? setFrontImage(img.attachment_url)
                        : setBackImage(img.attachment_url)
                    }}
                  />
                </div>
              )}
              rules={{ required: true }}
            />
          ) : null}

          {field.type === "date" ? (
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange, onBlur } }) => (
                <input
                  className={`form-input ${errors?.[field.name] ? "form-input-err" : ""}`}
                  defaultValue={
                    field.name === "date_of_expiry" ? defaultValues?.date_of_expiry : undefined
                  }
                  id={field.name}
                  type="date"
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e.target.value)
                  }}
                />
              )}
              rules={{ required: true }}
            />
          ) : null}

          {field.type === "text" ? (
            <input
              className={`form-input ${errors?.[field.name] ? "form-input-err" : ""}`}
              id={field.name}
              type="text"
              defaultValue={
                field.name === "identity_number" ? defaultValues?.identity_number : undefined
              }
              placeholder={field.label}
              {...register(field.name, {
                required: true,
              })}
            />
          ) : null}

          {errors[field.name] || dirtyFields[field.name] ? (
            <p className="form-err-msg">{errors[field.name]?.message}</p>
          ) : null}
        </div>
      ))}

      {view === "modal" ? <div className="mb-[40px]"></div> : null}
      <ButtonSubmit
        className="form-upload-btn"
        title="Tiếp tục"
        view={view}
        isError={!isValid}
        onClick={() => handleSubmit(onSubmitHandler)}
      />
    </form>
  )
}
