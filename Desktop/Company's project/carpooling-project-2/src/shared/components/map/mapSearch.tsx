import { RootState } from "@/core/store"
import { getProvinceName } from "@/helper"
import { useAddress, useClickOutside } from "@/hooks"
import { FromLocation } from "@/models"
import { addLocationSearchHistory } from "@/modules"
import { useRef, useState } from "react"
import { MdOutlineLocationOff } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import { LocationHistoryItem, LocationItem } from "../location"

interface MapSearchProps {
  onSelect?: (val: FromLocation) => void
}

export const MapSearch = ({ onSelect }: MapSearchProps) => {
  const { getProvinceId } = useAddress()
  const dispatch = useDispatch()
  const { searchHistoryList } = useSelector((state: RootState) => state.locationHistory)
  console.log(searchHistoryList)
  const {
    ready,
    value: searchValues,
    setValue,
    suggestions: { data: locations, loading, status },
    clearSuggestions,
  } = usePlacesAutocomplete({ requestOptions: { componentRestrictions: { country: ["vi"] } } })
  const [showSearchResult, setShowSearchResult] = useState<boolean>(true)
  const searchRef = useRef<HTMLDivElement>(null)
  useClickOutside([searchRef], () => {
    setShowSearchResult(false)
  })

  const getLocationFromSearchResult = (location: google.maps.places.AutocompletePrediction) => {
    getGeocode({ address: location.description }).then((results) => {
      const { lat, lng } = getLatLng(results?.[0])
      const locationName = getProvinceName(location?.description)
      const province_id = getProvinceId(locationName)
      if (!province_id) return

      const newLocation: FromLocation = {
        lat,
        lng,
        address: location.description,
        province_id: 0,
      }

      dispatch(addLocationSearchHistory({ ...newLocation, id: location.place_id }))
      onSelect && onSelect(newLocation)
      setShowSearchResult(false)
    })
  }

  return (
    <div ref={searchRef} className="">
      <div className="">
        <input
          type="text"
          onChange={(e) => {
            setValue(e.target.value)
            clearSuggestions()
          }}
          onFocus={() => setShowSearchResult(true)}
          className="form-input h-[40px] rounded-[4px] border-gray-color-1"
          placeholder="Tìm kiếm vị trí..."
          disabled={!ready}
        />
      </div>

      {showSearchResult ? (
        <div className="bg-white-color">
          {searchValues ? (
            <div className="location__result">
              {loading ? (
                <div className="px-12 py-12">
                  {/* {Array.from({ length: 4 }).map((_, index) => (
                    <LocationItem key={index} location={null as any} isLoading={true} />
                  ))} */}
                </div>
              ) : null}

              <ul className="location__result-list">
                {status === "OK" &&
                  locations?.length > 0 &&
                  locations.map((item, index) => (
                    <li key={index} className="location__result-list-item">
                      {/* <LocationItem
                        location={item}
                        onSelect={(val) => getLocationFromSearchResult(val)}
                      /> */}
                    </li>
                  ))}
              </ul>

              {status && status !== "OK" ? (
                <div className="px-12 py-[24px]">
                  <p className="flex items-center mb-[12px] justify-center">
                    <MdOutlineLocationOff className="mr-[8px]" />
                    Không tìm được vị trí
                  </p>
                  <p className="leading-[18px]">
                    Kiểm tra lại chính tả hoặc chọn vị trí trên bản đồ để xác định vị trí của bạn
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <ul className="location-search-history__result">
              {searchHistoryList?.length > 0 &&
                searchHistoryList.map((item, index) => (
                  <li key={index}>
                    <LocationHistoryItem
                      location={item}
                      onSelect={(location) => {
                        onSelect && onSelect(location)
                        setShowSearchResult(false)
                      }}
                    />
                  </li>
                ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}
