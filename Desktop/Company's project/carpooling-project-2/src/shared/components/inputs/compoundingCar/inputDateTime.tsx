import { subtractDateTimeToNumberOfHour } from "@/helper"
import moment from "moment"
import React from "react"
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css"

interface InputDateTimeProps {
  isError?: boolean
  showLabel?: boolean
  onChange: (params: string) => void
  value?: string
  subtractHoursToSeven?: boolean
}

export const InputDateTime = ({
  showLabel = true,
  onChange,
  value,
  isError,
  subtractHoursToSeven,
}: InputDateTimeProps) => {
  const yesterday = moment().subtract(1, "day")
  const disablePastDt = (current: any) => {
    return current.isAfter(yesterday)
  }

  return (
    <div className="">
      {showLabel ? (
        <label htmlFor={"expected_going_on_date"} className="form-label">
          Ngày khởi hành (*)
        </label>
      ) : null}
      <div className={`form-date ${isError ? "form-date-err" : ""}`}>
        <Datetime
          inputProps={{ placeholder: "Chọn ngày đi" }}
          initialValue={value ? moment(value) : undefined}
          locale="vi"
          isValidDate={disablePastDt}
          onChange={(e: any) => {
            const dateTime = moment(new Date(e._d)).format("YYYY-MM-DD HH:MM:SS")
            onChange(subtractHoursToSeven ? subtractDateTimeToNumberOfHour(dateTime, 7) : dateTime)
          }}
        />
      </div>

      {isError ? <p className="form-err-msg">Vui lòng nhập trường này</p> : null}
    </div>
  )
}
