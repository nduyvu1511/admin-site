import { GetPriceUnitParams } from "@/models"
import axiosClient from "."

const vehicleApi = {
  getCarTypes: () => {
    return axiosClient.post("/api/address_controller/get_car_data", {
      params: {},
    })
  },

  getCarBrands: () => {
    return axiosClient.post("/api/address_controller/get_car_brand_data", {
      params: {},
    })
  },

  getCarPriceUnit: (params: GetPriceUnitParams) => {
    return axiosClient.post("/api/address_controller/get_price_unit", {
      params,
    })
  },

  getCarUtilities: () => {
    return axiosClient.post("/api/address_controller/get_extra_utility", {
      params: {},
    })
  },

  getCarQualityStandards: () => {
    return axiosClient.post("/api/address_controller/get_quality_car_standard", {
      params: {},
    })
  },

  getPickUpStations: (province_id: number) => {
    return axiosClient.post("/api/address_controller/get_pick_up_station", {
      params: {
        province_id,
      },
    })
  },
}

export { vehicleApi }
