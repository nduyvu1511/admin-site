import { UserInfo } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface profileSlice {
  userInfo: UserInfo | undefined
}

const initialState: profileSlice = {
  userInfo: undefined,
}

const profileSlice = createSlice({
  name: "user_info",
  initialState,
  reducers: {
    setProfile: (state, { payload }: { payload: UserInfo | undefined }) => {
      state.userInfo = payload
    },
  },
})

export const { setProfile } = profileSlice.actions

export default profileSlice.reducer
