export interface locationHistory {
  longitude: number
  latitude: number
  name: string
  place_id: string
}

export interface LatlngAddress {
  address: string
  lng: number
  lat: number
}

export interface LatLng {
  lat: number
  lng: number
}

export interface LocationLatLng {
  lng: number
  lat: number
  address: string
}

export interface FromLocation extends LocationLatLng {
  province_id: number
}

export interface LocationSearchHistory extends FromLocation {
  id: string
}

export type LocationType = "from_location" | "to_location"
export interface StationRes {
  station_name: string
  station_id: number
  station_image: {
    id: number
    url: string
  }
  latitude: string
  longitude: string
  country_id: CountryId
  province_id: ProvinceId
  district_id: DistrictId
  ward_id: WardId
  street: string
}

export type GetAddressFormParams = { district_id: number } | { state_id: number }

export interface ProvinceId {
  province_name: string
  province_id: number
  province_vietnamese_name: string
  ghn_province_id: string
  picking_up_stations: any
}

export interface DistrictId {
  district_id: number
  district_name: string
  ghn_district_id: number
}

export interface WardId {
  ward_id: number
  ward_name: string
  ghn_ward_id: number
}

export type AddressTypeKey = "province" | "district" | "ward"

export interface AddressDataParams {
  ghn_province_id: number
  picking_up_stations: Array<any>
  province_id: number
  province_name: string
  province_vietnamese_name: string
}

export interface StationParams {
  station_name: string
  station_id: number
  latitude: number
  longitude: number
  country_id: {
    country_id: number
    country_name: string
    country_vietnamese_name: string
  }
  province_id: ProvinceId
  district_id: DistrictId
  ward_id: WardId
  street: string
}

export interface StationId {
  station_name: string
  station_id: number
  province_name: string
  province_id: number
  address: string
  lat: string
  lng: string
}

export interface FromLocationRidesForm {
  from_address: string
  from_latitude: string
  from_longitude: string
}

export interface FromStationPickUpParams extends StationPickUpParams {
  from_station_location?: FromLocationRidesForm
}

export interface CountryId {
  country_id: number
  country_name: string
  country_vietnamese_name: string
}

export interface CalculateDistanceBetweenTwoCoordinatesParams {
  origin: LatLng
  destination: LatLng
}

export interface StationPickUpParams {
  station_name: string
  station_id: number
  latitude: number
  longitude: number
  country_id: {
    country_id: number
    country_name: string
    country_vietnamese_name: string
  }
  province_id: ProvinceId
  district_id: DistrictId
  ward_id: WardId
  street: string
}

export interface StationId {
  station_name: string
  station_id: number
  province_name: string
  province_id: number
  address: string
  lat: string
  lng: string
}
