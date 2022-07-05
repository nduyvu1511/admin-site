import { setToSessionStorage } from "@/helper"
import { CarIdType, CompoundingType, ProvinceId } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface CompoundingSlice {
  currentTwoWayCompoundingCarCustomer: number | undefined
  currentOneWayCompoundingCarCustomer: number | undefined
  currentCarpoolingCompoundingCarCustomer: number | undefined
  vehicleTypes: CarIdType[]
  provinces: ProvinceId[]
}

let initialState: CompoundingSlice = {
  currentCarpoolingCompoundingCarCustomer: undefined,
  currentOneWayCompoundingCarCustomer: undefined,
  currentTwoWayCompoundingCarCustomer: undefined,
  provinces: [],
  vehicleTypes: [],
}

try {
  // initialState.currentCarpoolingCompoundingCarCustomer = getFromSessionStorage(
  //   "currentCarpoolingCompoundingCarCustomer"
  // )
  // initialState.currentOneWayCompoundingCarCustomer = getFromSessionStorage(
  //   "currentOneWayCompoundingCarCustomer"
  // )
  // initialState.currentTwoWayCompoundingCarCustomer = getFromSessionStorage(
  //   "currentTwoWayCompoundingCarCustomer"
  // )
  // initialState.vehicleTypes =
  //   getFromSessionStorage("compounding_vehicleTypes") || []
  // initialState.provinces = getFromSessionStorage("compounding_provinces") || []
} catch (error) {}

const compoundingCarDataSlice = createSlice({
  name: "compounding",
  initialState,
  reducers: {
    setCurrentCompoundingCarCustomer: (
      state,
      { payload }: { payload: { key: CompoundingType; value: number | undefined } }
    ) => {
      const { key, value } = payload
      if (key === "compounding") {
        state.currentCarpoolingCompoundingCarCustomer = value
        setToSessionStorage("currentCarpoolingCompoundingCarCustomer", value)
        return
      }
      if (key === "one_way") {
        state.currentOneWayCompoundingCarCustomer = value
        setToSessionStorage("currentOneWayCompoundingCarCustomer", value)
        return
      }
      if (key === "two_way") {
        state.currentTwoWayCompoundingCarCustomer = value
        setToSessionStorage("currentTwoWayCompoundingCarCustomer", value)
        return
      }
    },

    setVehicleTypes: (state, { payload }: { payload: CarIdType[] }) => {
      state.vehicleTypes = payload
      // setToSessionStorage("compounding_vehicleTypes", payload)
    },

    setProvinces: (state, { payload }: { payload: ProvinceId[] }) => {
      state.provinces = payload
      // setToSessionStorage("compounding_provinces", payload)
    },

    clearAllCurrentCompoundingCarId: (state) => {
      state.currentCarpoolingCompoundingCarCustomer = undefined
      state.currentOneWayCompoundingCarCustomer = undefined
      state.currentTwoWayCompoundingCarCustomer = undefined
    },
  },
})

export default compoundingCarDataSlice.reducer
export const {
  setCurrentCompoundingCarCustomer,
  clearAllCurrentCompoundingCarId,
  setProvinces,
  setVehicleTypes,
} = compoundingCarDataSlice.actions
