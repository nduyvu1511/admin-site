import { useAddress } from "@/hooks"
import { StationId, StationRes } from "@/models"
import { vehicleApi } from "@/services"
import { useEffect, useState } from "react"
import { RiLoader4Line } from "react-icons/ri"
import Select from "react-select"

interface StationProps {
  defaultValue?: StationId
  onChooseStation?: (params: StationId) => void
  onSelectStation?: (params: StationId) => void
}

export const Station = ({ defaultValue, onChooseStation, onSelectStation }: StationProps) => {
  const { provinceOptions } = useAddress()

  const [stations, setStations] = useState<StationRes[]>([])
  const [station, setStation] = useState<StationId | undefined>(defaultValue)
  const [stationLoading, setStationLoading] = useState<boolean>(false)

  const confirmStationLocation = () => {
    if (!station?.station_id) {
      console.log("Missing station")
      return
    }

    onChooseStation && onChooseStation(station)
  }

  useEffect(() => {
    if (!defaultValue?.province_id) return
    fetchStations(defaultValue.province_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchStations = (province_id: number) => {
    vehicleApi
      .getPickUpStations(province_id)
      .then((res: any) => {
        setStationLoading(false)
        setStations(res?.result?.data || [])
      })
      .catch((err) => {
        setStationLoading(false)
        console.log(err)
      })
  }

  return (
    <div className="location__station">
      <div className="location__station-form px-24">
        <div className="form-item location-select">
          <div className="form-select">
            <Select
              defaultValue={
                defaultValue?.province_id
                  ? {
                      label: defaultValue.province_name,
                      value: defaultValue.province_id,
                    }
                  : undefined
              }
              placeholder="Chọn tỉnh"
              onChange={(val) => {
                if (!val?.value) return
                setStationLoading(true)
                fetchStations(val.value)
              }}
              options={provinceOptions as any}
            />
          </div>
        </div>
      </div>

      <div className="location__station-result px-24">
        {stationLoading ? (
          <div className="location__station-loading">
            <RiLoader4Line className="loader" />
          </div>
        ) : null}

        {!stationLoading && !stations?.length ? (
          <div className="location__station-no-result">
            {!station?.station_id ? "Không tìm thấy trạm nào" : ""}
          </div>
        ) : null}

        {!stationLoading && stations?.length > 0 ? (
          <ul className="location__station-result-list py-12">
            {stations.map((item, index) => (
              <li key={index}>
                <ItemSelect
                  onCheck={() => {
                    const station = {
                      address: `${item.station_name}, ${item.street}, ${item.district_id.district_name}, ${item.province_id.province_name}`,
                      lat: item.latitude,
                      lng: item.longitude,
                      province_id: item.province_id.province_id,
                      province_name: item.province_id.province_name,
                      station_id: item.station_id,
                      station_name: item.station_name,
                    }

                    onSelectStation && onSelectStation(station)
                    setStation(station)
                  }}
                  isChecked={station?.station_id === item.station_id}
                  title={item.station_name}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="location__station-footer">
        {!stationLoading && station?.station_id ? (
          <>
            <button
              onClick={confirmStationLocation}
              className="btn-primary location__station-footer-confirm"
            >
              Xác nhận điểm đón
            </button>
          </>
        ) : null}
      </div>
    </div>
  )
}
