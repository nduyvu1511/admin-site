import { toggleBodyOverflow } from "@/helper"
import { StationId } from "@/models"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { Modal } from "../../modal"
import { Station } from "../../station"

interface InputStationProps {
  label: string
  onChange: (params: StationId) => void
  isError?: boolean
  value: string
  type: "from" | "to"
  prevProvinceId?: number
  defaultValue?: StationId
}

export const InputStation = ({
  label,
  onChange,
  isError = false,
  value,
  type,
  prevProvinceId,
  defaultValue,
}: InputStationProps) => {
  const dispatch = useDispatch()
  const [showStation, setShowStation] = useState<boolean>(false)

  return (
    <>
      <div className="input__location">
        <div className="rides__form-location-input">
          <input
            onClick={() => {
              toggleBodyOverflow("hidden")
              setShowStation(true)
            }}
            readOnly
            className={`form-input ${isError ? "form-input-err" : ""}`}
            type="text"
            placeholder={label}
            value={value}
          />
        </div>
        {isError ? <p className="form-err-msg">Vui lòng nhập trường này</p> : null}
      </div>

      {showStation ? (
        <Modal
          onClose={() => {
            toggleBodyOverflow("unset")
            setShowStation(false)
          }}
          iconType="back"
          heading={type === "from" ? "Chọn trạm đến" : "Chọn trạm đi"}
        >
          <div className="py-12">
            <Station
              onChooseStation={(val) => {
                if (prevProvinceId === val.province_id) {
                  dispatch(notify("Vui lòng chọn địa điểm khác với tỉnh trước đó", "error"))
                  return
                }
                toggleBodyOverflow("unset")
                setShowStation(false)
                onChange(val)
              }}
              defaultValue={defaultValue}
            />
          </div>
        </Modal>
      ) : null}
    </>
  )
}
