import { toggleBodyOverflow } from "@/helper"
import { PayloadType } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface CommonSliceParams {
  isScreenLoading: boolean
}

const initialState: CommonSliceParams = {
  isScreenLoading: false,
}

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setScreenLoading: (state, { payload }: PayloadType<boolean>) => {
      state.isScreenLoading = payload
      try {
        if (payload) {
          toggleBodyOverflow("hidden")
        } else {
          toggleBodyOverflow("unset")
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export default commonSlice.reducer
export const { setScreenLoading } = commonSlice.actions
