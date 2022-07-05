/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonSubmit } from "@/components/buttons"
import { oneWayCompoundingCarSchema } from "@/core/schema"
import {
  formatMoneyVND,
  ONE_WAY_CAR_ID,
  ONE_WAY_DISTANCE,
  ONE_WAY_EXPECTED_GOING_ON_DATE,
  ONE_WAY_FROM_LOCATION,
  ONE_WAY_IS_CHECKED_POLICY,
  ONE_WAY_NOTE,
  ONE_WAY_PRICE,
  ONE_WAY_TO_LOCATION,
  setToLocalStorage,
} from "@/helper"
import { useCompoundingForm } from "@/hooks"
import { CreateOneWayCompoundingCar, CreateOneWayCompoundingCarForm } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { InputCarType, InputDateTime, InputLocation, InputPolicy } from "../../inputs"

interface OneWayCompoundingFormProps {
  onSubmit: (params: CreateOneWayCompoundingCar) => void
  defaultValues?: CreateOneWayCompoundingCarForm
  mode?: "create" | "update"
  view?: "modal" | "page"
}

export const OneWayCompoundingForm = ({
  onSubmit,
  defaultValues,
  mode = "create",
  view = "modal",
}: OneWayCompoundingFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<CreateOneWayCompoundingCarForm>({
    resolver: yupResolver(oneWayCompoundingCarSchema),
    mode: "all",
    defaultValues,
  })
  const { vehicleTypeOptions, calcPriceFromProvinceIds, calculateDistanceBetweenTwoCoordinates } =
    useCompoundingForm()
  const [distance, setDistance] = useState<number>(getValues("distance"))
  const [price, setPrice] = useState<number>(getValues("price") || 0)
  // Get Distance
  const calcDistance = () => {
    const fromLocation = getValues("from_location")
    const toLocation = getValues("to_location")
    if (!fromLocation?.province_id || !toLocation?.province_id) return

    calculateDistanceBetweenTwoCoordinates({
      params: {
        origin: { lat: +fromLocation.lat, lng: +fromLocation.lng },
        destination: { lat: +toLocation.lat, lng: +toLocation.lng },
      },
      onSuccess: (distance) => {
        setDistance(distance)
        setToLocalStorage(ONE_WAY_DISTANCE, distance)
        setValue("distance", distance)
      },
    })
  }

  const calcPrice = async () => {
    const fromLocation = getValues("from_location")
    const toLocation = getValues("to_location")
    const carId = getValues("car_id")
    if (!fromLocation?.province_id || !toLocation?.province_id || !carId?.value) return

    calcPriceFromProvinceIds({
      params: {
        car_id: +carId.value,
        from_province_id: fromLocation.province_id,
        to_province_id: toLocation.province_id,
      },
      onSuccess: (data) => {
        setValue("price", data)
        setToLocalStorage(ONE_WAY_PRICE, data)
        setPrice(data)
      },
    })
  }

  const onSubmitHandler = (data: CreateOneWayCompoundingCarForm) => {
    const params: CreateOneWayCompoundingCar = {
      car_id: Number(data.car_id.value),
      compounding_type: "one_way",
      distance: data.distance,
      expected_going_on_date: data.expected_going_on_date,
      from_address: data.from_location.address,
      from_latitude: data.from_location.lat + "",
      from_longitude: data.from_location.lng + "",
      to_address: data.to_location.address,
      to_latitude: data.to_location.lat + "",
      to_longitude: data.to_location.lng + "",
      from_province_id: data.from_location.province_id,
      to_province_id: data.to_location.province_id,
      note: data?.note || "",
    }

    onSubmit(params)
  }

  const handleTogglePolicy = (): boolean | undefined => {
    const isChecked = getValues("is_checked_policy")
    if (!isChecked) {
      clearErrors("is_checked_policy")
      setToLocalStorage(ONE_WAY_IS_CHECKED_POLICY, true)
      return true
    }
    setToLocalStorage(ONE_WAY_IS_CHECKED_POLICY, undefined)
    return
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmitHandler(data)
      })}
      className="rides__form"
    >
      <div className="rides__form-location">
        <div className="form-item">
          <label className="form-label">Điểm đi (*)</label>

          <Controller
            control={control}
            name={"from_location"}
            render={({ field: { onChange, onBlur } }) => (
              <InputLocation
                defaultLocation={getValues("from_location")}
                isError={!!errors?.from_location?.province_id}
                type="from"
                onBlur={onBlur}
                value={
                  getValues("from_location")?.address || defaultValues?.from_location?.address || ""
                }
                label="Điểm đi"
                onChange={(location) => {
                  setToLocalStorage(ONE_WAY_FROM_LOCATION, location)
                  onChange(location)
                  calcDistance()
                  calcPrice()
                }}
                prevProvinceId={getValues("to_location.province_id")}
              />
            )}
            rules={{ required: true }}
          />
        </div>

        <div className="form-item">
          <label className="form-label">Điểm đón (*)</label>

          <Controller
            control={control}
            name={"to_location"}
            render={({ field: { onChange, onBlur } }) => (
              <InputLocation
                isError={!!errors?.to_location?.province_id}
                type="to"
                onBlur={onBlur}
                value={
                  getValues("to_location")?.address || defaultValues?.to_location?.address || ""
                }
                label="Điểm đến"
                onChange={(location) => {
                  setToLocalStorage(ONE_WAY_TO_LOCATION, location)
                  onChange(location)
                  calcDistance()
                  calcPrice()
                }}
                prevProvinceId={getValues("from_location.province_id")}
                defaultLocation={getValues("to_location")}
              />
            )}
            rules={{ required: true }}
          />
        </div>

        <div className="">
          {price ? <p className="">Giá: {formatMoneyVND(price)}</p> : null}
          {distance ? <p className="">Quãng đường: {distance.toFixed(2)}km</p> : null}
        </div>
      </div>

      <div className="form-item">
        <Controller
          control={control}
          name={"car_id"}
          render={({ field: { onChange, onBlur } }) => (
            <InputCarType
              value={getValues("car_id") || defaultValues?.car_id}
              isError={!!errors?.car_id?.value}
              label=""
              onBlur={onBlur}
              onChange={(option) => {
                setToLocalStorage(ONE_WAY_CAR_ID, option)
                onChange(option)
                calcPrice()
              }}
              options={vehicleTypeOptions}
            />
          )}
          rules={{ required: true }}
        />
      </div>

      <div className="form-item">
        <Controller
          control={control}
          name={"expected_going_on_date"}
          render={({ field: { onChange, onBlur } }) => (
            <InputDateTime
              value={defaultValues?.expected_going_on_date || ""}
              onChange={(val) => {
                setToLocalStorage(ONE_WAY_EXPECTED_GOING_ON_DATE, val)
                onChange(val)
              }}
              subtractHoursToSeven
              isError={!!errors?.expected_going_on_date}
            />
          )}
          rules={{ required: true }}
        />
      </div>

      <div className="form-item">
        <label htmlFor="note" className="form-label">
          Ghi chú cho chuyến đi
        </label>

        <textarea
          {...register}
          className="form-textarea"
          name="note"
          id="note"
          cols={10}
          placeholder="Ghi chú thêm cho chuyến đi..."
          defaultValue={defaultValues?.note}
          onChange={(e) => {
            setToLocalStorage(ONE_WAY_NOTE, e.target.value)
            setValue("note", e.target.value)
            calcPrice()
          }}
        ></textarea>
      </div>

      {mode === "create" ? (
        <div className="mb-[40px]">
          <Controller
            control={control}
            name={"is_checked_policy"}
            render={({ field: { onChange, onBlur } }) => (
              <InputPolicy
                onChange={() => onChange(handleTogglePolicy())}
                isError={!!errors?.is_checked_policy}
                onBlur={onBlur}
                value={getValues("is_checked_policy")}
              />
            )}
            rules={{ required: true }}
          />
        </div>
      ) : null}

      <ButtonSubmit
        view="modal"
        title={mode === "create" ? "Tiếp tục" : "Lưu"}
        isError={!isValid}
      />
    </form>
  )
}
