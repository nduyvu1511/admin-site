import { FromLocation } from "@/models"
import { useState } from "react"
import { Map } from "../../map"
import { Modal } from "../../modal"

interface InputLocationProps {
  label: string
  onChange: (params: FromLocation) => void
  isError?: boolean
  value: string
  onBlur?: Function
  type: "from" | "to"
  prevProvinceId?: number
  defaultLocation?: FromLocation
}

export const InputLocation = ({
  label,
  onChange,
  isError = false,
  value,
  onBlur,
  type,
  prevProvinceId,
  defaultLocation,
}: InputLocationProps) => {
  const [showMap, setShowMap] = useState<boolean>(false)

  return (
    <>
      <div className="input__location">
        <div className="rides__form-location-input">
          <input
            onClick={() => setShowMap(true)}
            readOnly
            className={`form-input ${isError ? "form-input-err" : ""}`}
            type="text"
            placeholder={label}
            value={value}
          />
        </div>
        {isError ? <p className="form-err-msg">Vui lòng nhập trường này</p> : null}
      </div>

      {showMap ? (
        <Modal
          iconType="back"
          heading={type === "from" ? "Chọn điểm đến" : "Chọn điểm đi"}
          onClose={() => setShowMap(false)}
        >
          <Map
            defaultLocation={defaultLocation}
            prevProvinceId={prevProvinceId}
            onChooseLocation={(location) => {
              onChange({ ...location })
              setShowMap(false)
            }}
          />
        </Modal>
      ) : null}
    </>
  )
}

export default InputLocation
