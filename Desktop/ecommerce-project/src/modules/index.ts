import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice"
import messageSlice from "./chat/messageSlice"
import channelSlice from "./chat/channelSlice"
import commonSlice from "./common/commonSlice"
import compareSlice from "./compare/compareSlice"
import localeSlice from "./locale/localeSlice"
import orderSlice from "./order/orderSlice"
import productSlice from "./product/productSlice"
import searchSlice from "./search/searchSlice"
import userSlice from "./user/userSlice"
import chatModalSlice from "./chat/modalSlice"

const rootReducer = combineReducers({
  compare: compareSlice,
  common: commonSlice,
  user: userSlice,
  order: orderSlice,
  product: productSlice,
  auth: authSlice,
  search: searchSlice,
  locale: localeSlice,
  channel: channelSlice,
  message: messageSlice,
  chatModal: chatModalSlice,
})

export default rootReducer

export * from "./auth/authSlice"
export * from "./common/commonSlice"
export * from "./compare/compareSlice"
export * from "./locale/localeSlice"
export * from "./order/orderSlice"
export * from "./product/productSlice"
export * from "./search/searchSlice"
export * from "./user/userSlice"
export * from "./chat"
