import { ImageSingleFile, ButtonSubmit } from "@/components"
import { insuranceShema } from "@/core/schema"
import { vehicleInsuranceForm } from "@/helper"
import { VehicleInsuranceParams, VehicleInsuranceRes } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

interface VehicleInsuranceFormProps {
  defaultValues?: VehicleInsuranceRes
  onSubmit: (params: VehicleInsuranceParams) => void
  view?: "modal" | "page"
}

export const VehicleInsuranceForm = ({
  onSubmit,
  defaultValues,
  view = "modal",
}: VehicleInsuranceFormProps) => {
  const {
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
    register,
  } = useForm<VehicleInsuranceParams>({
    resolver: yupResolver(insuranceShema),
    mode: "all",
    defaultValues: {
      back_insurance_image_url: defaultValues?.back_insurance_image_url?.id,
      date_of_expiry: defaultValues?.date_of_expiry,
      date_of_issue: defaultValues?.date_of_issue,
      identity_number: defaultValues?.identity_number,
      front_insurance_image_url: defaultValues?.front_insurance_image_url?.id,
    },
  })

  const [frontImage, setFrontImage] = useState<string>()
  const [backImage, setBackImage] = useState<string>()

  const onSubmitHandler = (data: VehicleInsuranceParams) => {
    onSubmit &&
      onSubmit({
        ...data,
        back_insurance_image_url: Number(data.back_insurance_image_url),
        front_insurance_image_url: Number(data.front_insurance_image_url),
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {vehicleInsuranceForm.map((field) => (
        <div key={field.name} className="form-item">
          <label className="form-label">
            {field.placeholder}{" "}
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
                    isError={!!errors?.[field.name]?.message}
                    getImage={(file) => {
                      onChange(file.attachment_id)
                      field.name === "front_insurance_image_url"
                        ? setFrontImage(file.attachment_url)
                        : setBackImage(file.attachment_url)
                    }}
                    image={
                      field.name === "front_insurance_image_url"
                        ? frontImage || defaultValues?.front_insurance_image_url?.url
                        : backImage || defaultValues?.back_insurance_image_url?.url
                    }
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
                    field.name === "date_of_expiry"
                      ? defaultValues?.date_of_expiry
                      : field.name === "date_of_issue"
                      ? defaultValues?.date_of_issue
                      : undefined
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
              placeholder={field.placeholder}
              {...register(field.name, {
                required: true,
              })}
              defaultValue={
                field.name === "identity_number" ? defaultValues?.identity_number : undefined
              }
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
