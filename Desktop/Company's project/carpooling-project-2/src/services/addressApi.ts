import axiosClient from "."

const addressApi = {
  getAddress: () => {
    return axiosClient.post("/api/address_controller/get_address_data", {
      params: {},
    })
  },

  getProvinces: () => {
    return axiosClient.post("/api/address_information_controller/get_list_state", {})
  },

  getDistricts: (list_int: number[]) => {
    return axiosClient.post("/api/address_information_controller/get_list_district", {
      params: {
        state_ids: list_int,
      },
    })
  },

  getWards: (list_int: number[]) => {
    return axiosClient.post("/api/address_information_controller/get_list_ward", {
      params: {
        district_ids: list_int,
      },
    })
  },

  getAddressData: () => {
    return axiosClient.post("/api/address_controller/get_address_data", {
      params: {},
    })
  },
}

export { addressApi }
