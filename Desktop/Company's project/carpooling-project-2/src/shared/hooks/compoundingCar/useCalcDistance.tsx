import { LatLng } from "@/models"

interface CalcDistanceParams {
  origin: LatLng
  destination: LatLng
}

interface Res {
  calcDistance: (
    params: CalcDistanceParams,
    cb: (params: google.maps.DistanceMatrixResponse | null) => void,
    onErr?: Function
  ) => void
}

export const useCalcDistance = (): Res => {
  const calcDistance = (params: CalcDistanceParams, cb: Function, onErr?: Function) => {
    const { origin, destination } = params
    if (!window?.google) return

    var service = new google.maps.DistanceMatrixService()
    try {
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          // transitOptions: TransitOptions,
          // drivingOptions: google.maps.dri,
          // unitSystem: UnitSystem,
          avoidHighways: true,
          avoidTolls: true,
        },
        (data) => {
          cb(data)
        }
      )
    } catch (error) {
      onErr && onErr()
    }
  }

  return { calcDistance }
}
