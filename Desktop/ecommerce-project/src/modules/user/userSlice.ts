import { setToLocalStorage } from "@/helper"
import { ShippingAddress, UserEdit, UserInfo, UserSlice } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

const initialState: UserSlice = {
  token: "",
  addressDefault: undefined,
  userInfo: {} as UserInfo,
  fcmToken: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = ""
      state.userInfo = {} as UserInfo
      state.fcmToken = ""
      state.addressDefault = undefined
      location.reload()
    },

    setToken: (state, { payload }: { payload: string }) => {
      state.token = payload
    },

    setUserInfo: (state, { payload }: { payload: UserInfo | undefined }) => {
      state.userInfo = payload
      setToLocalStorage("partner_id", payload?.id + "")
    },

    editUserInfo: (state, { payload }: { payload: UserEdit }) => {
      if (state.userInfo) {
        state.userInfo.name = payload.name
        state.userInfo.email = payload.email
        state.userInfo.sex = payload.sex

        if (payload?.image) {
          state.userInfo.avatar = payload.image
        }
      }
    },

    setAddressDefault: (
      state,
      { payload }: { payload: ShippingAddress | undefined }
    ) => {
      state.addressDefault = payload
    },

    setFCMToken: (state, { payload }: { payload: string }) => {
      state.fcmToken = payload
    },
  },
})

export const {
  logOut,
  setToken,
  setUserInfo,
  setAddressDefault,
  editUserInfo,
  setFCMToken,
} = userSlice.actions

export default userSlice.reducer
