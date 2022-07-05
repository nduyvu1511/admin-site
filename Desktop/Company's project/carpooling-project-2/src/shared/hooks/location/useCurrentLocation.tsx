import { setScreenLoading } from "@/modules"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { LatLng } from "use-places-autocomplete"

interface Res {
  getCurrentLocation: (params: (params: LatLng) => void) => void
}

interface Props {
  showLoading?: boolean
}

const useCurrentLocation = ({ showLoading = false }: Props): Res => {
  const dispatch = useDispatch()

  const getCurrentLocation = (cb: (params: LatLng) => void) => {
    showLoading && dispatch(setScreenLoading(true))
    if (!navigator?.geolocation) return
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        showLoading && dispatch(setScreenLoading(false))
        cb({ lat: latitude, lng: longitude })
      },
      () => {
        showLoading && dispatch(setScreenLoading(false))
        dispatch(notify("Không thể lấy vị trí hiện tại, vui lòng cấp quyền để tiếp tục", "error"))
      }
    )
  }

  return { getCurrentLocation }
}

export { useCurrentLocation }
