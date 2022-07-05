import { ImageSingleFile, ButtonSubmit } from "@/components"
import { vehicleDetailSchema } from "@/core/schema"
import { vehicleDetailFormFields } from "@/helper"
import { useCompoundingForm, useFetchCarBrand } from "@/hooks"
import { RegistrationCertificateRes, VehicleDetailFormParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface VehicleFormProps {
  defaultValues?: RegistrationCertificateRes
  onSubmit: (params: VehicleDetailFormParams) => void
  view?: "modal" | "page"
}

export const VehicleForm = ({ onSubmit, defaultValues, view = "modal" }: VehicleFormProps) => {
  const { vehicleTypeOptions } = useCompoundingForm()
  const { data: vehicleBrandList } = useFetchCarBrand()

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
  } = useForm<VehicleDetailFormParams>({
    resolver: yupResolver(vehicleDetailSchema),
    mode: "all",
    defaultValues: {
      back_car_image_url: defaultValues?.back_car_image?.id,
      front_car_image_url: defaultValues?.front_car_image?.id,
      year_of_issue: defaultValues?.year_of_issue,
      car_id: defaultValues?.car?.car_id,
      car_name: defaultValues?.car?.name,
      license_plates: defaultValues?.license_plates,
      car_brand_id: defaultValues?.car_brand?.brand_id,
    },
  })

  const [frontImage, setFrontImage] = useState<string>("")
  const [backImage, setBackImage] = useState<string>("")

  const onSubmitHandler = (data: VehicleDetailFormParams) => {
    onSubmit &&
      onSubmit({
        ...data,
        back_car_image_url: Number(data.back_car_image_url),
        front_car_image_url: Number(data.front_car_image_url),
        car_id: Number(data.car_id),
        car_brand_id: Number(data.car_brand_id),
      })
  }

  const vehicleBrandOptions = useMemo(() => {
    return vehicleBrandList?.map((item) => ({
      label: item.brand_name,
      value: item.brand_id,
    }))
  }, [vehicleBrandList])

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      {vehicleDetailFormFields.map((field) => (
        <div key={field.name} className="form-item">
          <label htmlFor={field.name} className="form-label">
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
                    image={
                      field.name === "front_car_image_url"
                        ? frontImage || defaultValues?.front_car_image?.url
                        : backImage || defaultValues?.back_car_image?.url
                    }
                    isError={!!errors?.[field.name]?.message}
                    getImage={(img) => {
                      onChange(img.attachment_id)
                      field.name === "front_car_image_url"
                        ? setFrontImage(img.attachment_url)
                        : setBackImage(img.attachment_url)
                    }}
                  />
                </div>
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
            />
          ) : null}

          {field.type === "select" ? (
            <div className="form-select">
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur } }) => (
                  <Select
                    defaultValue={
                      field.name === "car_id" && defaultValues?.car
                        ? {
                            label: defaultValues?.car?.name,
                            value: defaultValues?.car?.car_id,
                          }
                        : field.name === "car_brand_id" && defaultValues?.car_brand
                        ? {
                            label: defaultValues?.car_brand?.brand_name,
                            value: defaultValues?.car_brand?.brand_id,
                          }
                        : undefined
                    }
                    placeholder={field.placeholder}
                    options={
                      field.name === "car_id"
                        ? vehicleTypeOptions
                        : field.name === "car_brand_id"
                        ? vehicleBrandOptions
                        : undefined
                    }
                    onChange={(val) => val?.value && onChange(val.value)}
                    onBlur={onBlur}
                    id={field.name}
                    className={`${errors?.[field.name] ? "form-select-error" : ""}`}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
          ) : null}

          {field.type === "date" ? (
            <div className="form-select">
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur } }) => (
                  <Select
                    // defaultValue={field.name === 'car_brand_id' }
                    className={`${errors?.[field.name] ? "form-select-error" : ""}`}
                    placeholder={field.placeholder}
                    options={field.options}
                    onChange={(val) => val?.value && onChange(val.value)}
                    onBlur={onBlur}
                    id={field.name}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
          ) : null}

          {errors[field.name] || dirtyFields[field.name] ? (
            <p className="form-err-msg">{errors[field.name]?.message}</p>
          ) : null}
        </div>
      ))}
      {view === "modal" ? <div className="mb-[80px]"></div> : null}
      <div className="fixed bottom-0 right-0 left-0">
        <ButtonSubmit
          className="form-upload-btn"
          title="Tiếp tục"
          view={view}
          isError={!isValid}
          onClick={() => handleSubmit(onSubmitHandler)}
        />
      </div>
    </form>
  )
}
