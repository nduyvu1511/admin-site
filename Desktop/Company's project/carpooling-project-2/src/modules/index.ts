import { combineReducers } from "@reduxjs/toolkit"
import { reducer as notificationsReducer } from "reapop"
import commonSlice from "./common/commonSlice"
import compoundingCarDataSlice from "./compoundingCar/compoundingCarDataSlice"
import locationHistorySlice from "./location/locationHistorySlice"
import profileSlice from "./user/profileSlice"

const rootReducer = combineReducers({
  notifications: notificationsReducer(),
  common: commonSlice,
  userInfo: profileSlice,
  compoundingCarData: compoundingCarDataSlice,
  locationHistory: locationHistorySlice,
})

export default rootReducer
export * from "./common"
export * from "./user"
export * from "./compoundingCar"
export * from "./location"
